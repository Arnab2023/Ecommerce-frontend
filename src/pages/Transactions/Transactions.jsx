/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import SearchBar from "../../components/Search Bar/SearchBar";
import Sidebar from "../../components/Sidebar/Sidebar";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import "./style.css";
import UserStatus from "../../components/User Status/UserStatus";
import { data } from "../../data/Data";
import Pagination from "@mui/material/Pagination";
import { filterData } from "../../helpers/datafilter";
import { useNavigate } from "react-router-dom";

function Transactions() {
  const [search, setSearch] = useState("");
  const [payment, setPayment] = useState(null);
  const [mode, setMode] = useState(null);
  const [tdata, setTdata] = useState(data);
  const [pagination, setPagination] = useState(1);

  const [count, setCount] = useState();

  const handleChange = (e, p) => {
    setPagination(p);
  };

  const navigate = useNavigate();

  // useEffect pagenation

  useEffect(() => {
    setCount(Math.ceil(tdata.length / 10));
  }, [tdata]);

  //  slice  tdata  useeffect

  useEffect(() => {}, [pagination]);

  // get unique data function

  const getUniqueData = (objectdata, field) => {
    let uniqueData = objectdata.map((obj) => obj[field]);
    let x = new Set(uniqueData);
    return [...x];
  };

  // filter function

  useEffect(() => {
    if (payment !== null || mode !== null) {
      let filterList = [];
      if (payment !== null) {
        if (payment === "all") {
          // do nothing
        } else {
          filterList.push({
            field: "payment",
            value: `${payment}`,
            operator: (a, b) => a === b,
          });
        }
      }
      if (mode !== null) {
        if (mode === "all") {
          // do nothing
        } else {
          filterList.push({
            field: "mode_of_payment",
            value: `${mode}`,
            operator: (a, b) => a === b,
          });
        }
      }
      console.log(filterList);
      let newData = filterData(data, filterList);
      setTdata(newData);
    }
  }, [payment, mode]);

  // return statements

  return (
    <div className="container-prod">
      <SearchBar />
      <div className="filter">
        <select
          name="filter-search"
          id="filter"
          value={payment}
          onChange={(e) => {
            setPayment(e.target.value);
          }}
        >
          <option value="all">Payment Status</option>
          <option value="Paid">Paid</option>
          <option value="Pend">Pending</option>
          <option value="Cancelled"> Cancelled</option>
          <option value="Failed">Failed</option>
        </select>

        <select
          name="filter-search"
          id="filter"
          value={mode}
          onChange={(e) => {
            setMode(e.target.value);
          }}
        >
          <option value="all">Mode of Payment</option>
          {getUniqueData(data, "mode_of_payment").map((x) => (
            <option key={x.id} value={x}>
              {x}
            </option>
          ))}
        </select>
      </div>

      <div className="transactions">
        <table>
          <tr>
            <th>ORDER ID</th>
            <th>CUSTOMER</th>
            <th>DATE</th>
            <th>PAYMENT</th>

            <th>MODE OF PAYMENT</th>
          </tr>
          <>
            {tdata
              .slice((pagination - 1) * 10, (pagination - 1) * 10 + 10)
              ?.map((item) => (
                <tr key={item.id}>
                  <td className="center">{item.id}</td>
                  <td
                    className="pname"
                    onClick={() => {
                      navigate(`/userdetails/${item.id}`);
                    }}
                  >
                    {item.name}
                  </td>
                  <td>{item.date}</td>
                  <td>
                    <UserStatus status={item.payment.toLowerCase()} />
                  </td>
                  <td className="center">{item.mode_of_payment}</td>
                </tr>
              ))}
          </>
        </table>
      </div>
      <Pagination
        className="pagination"
        count={count}
        color="primary"
        onChange={handleChange}
      ></Pagination>
    </div>
  );
}

export default Transactions;
