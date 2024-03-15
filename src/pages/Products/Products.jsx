/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./style.css";
import SearchBar from "../../components/Search Bar/SearchBar";
import Sidebar from "../../components/Sidebar/Sidebar";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import UserStatus from "../../components/User Status/UserStatus";
import { data } from "../../data/Data";
import { filterData } from "../../helpers/datafilter";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import loader from "../../assets/loader.gif";
import CategoryTableName from "../../components/CategoryTableName/CategoryTableName";
import { NavLink } from "react-router-dom";

function Products() {
  const [pData, setPData] = useState([]);
  const [stock, setStock] = useState(null);
  const [cat, setCat] = useState(null);
  const [brand, setBrand] = useState(null);
  const [odata, setOdata] = useState([]);

  const [pagination, setPagination] = useState(1);
  const [count, setCount] = useState(1);

  //------------------------------------datafecth-------------------------//

  useEffect(() => {
    const fetchfnc = async () => {
      try {
        const { data } = await axios.get(
          "https://ecommerce-back-end-orpin.vercel.app/api/products/all"
        );
        console.log("getData", data);
        setOdata(data);
        setPData(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchfnc();
  }, []);

  //  ---------------------filter function ---------------------------------//
  const handleChange = (e, p) => {
    setPagination(p);
  };

  //----------------------------- useEffect pagenation---------------------//

  useEffect(() => {
    setCount(Math.ceil(pData.length / 10));
  }, [pData]);

  //  -----------------------------slice  tdata  useeffect------------------//

  useEffect(() => {}, [pagination]);

  //--------------------------------get unique data function----------------//

  const getUniqueData = (objectdata, field) => {
    console.log(objectdata);
    let uniqueData = objectdata.map((obj) => obj[field]);
    let x = new Set(uniqueData);
    return [...x];
  };

  //------------------------------------filter function--------------------//

  useEffect(() => {
    if (brand !== null || cat !== null || stock !== null) {
      let filterList = [];
      if (brand !== null) {
        if (brand === "all") {
          // do nothing
        } else {
          filterList.push({
            field: "brand",
            value: `${brand}`,
            operator: (a, b) => a === b,
          });
        }
      }
      if (cat !== null) {
        if (cat === "all") {
          // do nothing
        } else {
          filterList.push({
            field: "categoryId",
            value: `${cat}`,
            operator: (a, b) => a === b,
          });
        }
      }

      if (stock !== null) {
        if (stock === "all") {
          // do nothing
        } else {
          filterList.push({
            field: "quantity",
            value: `${stock}`,
            operator:
              stock === "in stock"
                ? (a, b) => {
                    return a > 0;
                  }
                : (a, b) => {
                    return a === 0;
                  },
          });
        }
      }

      console.log(filterList);
      let newData = filterData(odata, filterList);
      setPData(newData);
    }
  }, [cat, brand, stock]);

  //--------------------------------------------- return statement-------------------------------//

  return (
    <div className="container-prod">
      <SearchBar />
      <NavLink to="/addproduct">
        <button>Add Product</button>
      </NavLink>

      {/* --------------------------Filters---------------------------------- */}
      {pData.length > 0 ? (
        <>
          {" "}
          <div className="filter">
            <select
              name="filter-search"
              id="filter"
              value={stock}
              onChange={(e) => {
                setStock(e.target.value);
              }}
            >
              <option value="all">Stock Details</option>

              <option value="in stock">In Stock</option>
              <option value="out of stock"> Out of Stock</option>
            </select>

            <select
              name="filter-search"
              id="filter"
              value={cat}
              onChange={(e) => {
                setCat(e.target.value);
              }}
            >
              <option value="all">Category</option>
              {odata &&
                getUniqueData(odata, "categoryId")?.map((x) => (
                  <option key={x.id} value={x}>
                    <CategoryTableName id={x} />
                  </option>
                ))}
            </select>

            <select
              name="filter-search"
              id="filter"
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            >
              <option value="all">Brand</option>
              {odata &&
                getUniqueData(odata, "brand").map((x) => (
                  <option key={x.id} value={x}>
                    {x}
                  </option>
                ))}
            </select>
          </div>
          {/* --------------------------Products---------------------------------- */}
          <div className="products">
            <table>
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>BRAND</th>
                  <th>CATEGORY</th>
                  <th>STOCK</th>
                  <th>PRICE</th>
                  <th>QTY</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {pData
                    ?.slice((pagination - 1) * 10, (pagination - 1) * 10 + 10)
                    ?.map((item) => (
                      <tr key={item.id}>
                        <td className="prod-name">
                          <div className="image">
                            <img
                              className="prod-img"
                              src={item.image
                                .replace(/_/g, "/")
                                .replace(/-/g, "+")}
                              alt=""
                            />
                          </div>

                          <span className="prod-text">{item.name}</span>
                        </td>
                        <td>{item.brand}</td>
                        <td>
                          <CategoryTableName id={item.categoryId} />
                        </td>
                        <td>
                          <UserStatus
                            status={item.stock_qty > 0 ? "instock" : "outstock"}
                          />
                        </td>
                        <td>Rs {item.retailPrice}</td>
                        <td>{item.stock_qty}</td>
                      </tr>
                    ))}
                </>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="loader">
          <img src={loader} alt="" />{" "}
        </div>
      )}

      <Pagination
        className="pagination"
        count={count}
        color="primary"
        onChange={handleChange}
      ></Pagination>
    </div>
  );
}

export default Products;
