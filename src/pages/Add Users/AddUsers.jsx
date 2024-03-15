/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUsers = () => {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      address,
      email,
      phone,
      password,
    };
    console.log(cookies.access_token);
    const apiUrl =
      "https://ecommerce-back-end-orpin.vercel.app/api/subscribers"; //https:ecommerce-back-end-orpin.vercel.app/api/products/
    const relativeUrl = "/register";
    await axios
      .post(`${apiUrl}${relativeUrl}`, data, {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
      })
      .then((res) => {
        navigate("/users");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container-prod">
      <div className="content-container">
        <h1 className="add-heading">Add Subscriber</h1>
        <div className="addproduct">
          <form>
            <div className="form-group product-group">
              <label htmlFor="name">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control product-inp"
                type="text"
                id="name"
                name="name"
                placeholder="Enter name"
              />
            </div>
            <div className="form-group category-group">
              <label htmlFor="address">Address</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control category-inp"
                type="text"
                id="brand"
                name="brand"
                placeholder="Enter Brand Name"
              />
            </div>
            <div className="form-group buying-group">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control buying-inp"
                type="text"
                id="email"
                name="email"
                placeholder="Enter email"
              />
            </div>

            <div className="form-group retail-group">
              <label htmlFor="phone">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control retail-inp"
                type="number"
                id="phone"
                name="phone"
                placeholder="Enter phone"
              />
            </div>
            <div className="form-group retail-group">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control retail-inp"
                type="password"
                id="password"
                name="password"
                placeholder="Enter password"
              />
            </div>
          </form>
          <div className="btnadd">
            <button className="addbtn" type="submit" onClick={handleSubmit}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
