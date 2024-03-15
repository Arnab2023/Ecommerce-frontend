/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import SearchBar from "../../components/Search Bar/SearchBar";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import "./style.css";
import { NavLink } from "react-router-dom";

function Categories() {
  const [data, setData] = useState();
  const [err, setErr] = useState();
  const [content, setContent] = useState();
  const [noProd, setNoProd] = useState();
  const handleFetchCategories = async () => {
    await axios
      .get("https://ecommerce-back-end-orpin.vercel.app/api/category/all")
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        setErr(err);
      });
  };

  useEffect(() => {
    handleFetchCategories();
  }, []);

  useEffect(() => {
    if (data) {
      const categories = data.data;
      if (categories.length === 0) {
        setNoProd(<div className="no-prod">No Categories Found...</div>);
        setContent();
      } else {
        setContent(
          categories.map((c) => {
            return (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.description}</td>
                <td>
                  <img src={c.image} alt={c._id} />
                </td>
                <td>{c.no_of_products}</td>
              </tr>
            );
          })
        );
        setNoProd();
      }
    } else if (err) {
      setNoProd(
        <div className="no-prod">reload!! error fetching resources...</div>
      );
      setContent();
    } else {
      setNoProd(<div className="no-prod">Loading Categories...</div>);
      setContent();
    }
  }, [data, err]);

  return (
    <div className="container-prod">
      <SearchBar />
      <NavLink to="/add-category">
        <button>Add Category</button>
      </NavLink>
      <div className="products">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Descripiton</th>
              <th>Image</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
        {noProd}
      </div>
    </div>
  );
}

export default Categories;
