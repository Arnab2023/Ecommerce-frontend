import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import SearchBar from "../../components/Search Bar/SearchBar";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState();
  const [err, setErr] = useState();
  const [content, setContent] = useState();
  const [noProd, setnoProd] = useState();

  useEffect(() => {
    const handlegetSubscriber = async () => {
      await axios
        .get("https://ecommerce-back-end-orpin.vercel.app/api/subscribers/all")
        .then((res) => {
          console.log(res);
          setUsers(res.data);
        })
        .catch((err) => {
          setErr(err);
        });
    };
    handlegetSubscriber();
  }, []);

  useEffect(() => {
    if (users) {
      if (users.length !== 0) {
        setContent(
          users.map((d) => {
            return (
              <tr key={d._id}>
                <td>{d.name}</td>
                <td>{d.address}</td>
                <td>
                  {d.email} <br />
                  {d.phone}
                </td>
                <td>{JSON.parse(d.orders).length}</td>
              </tr>
            );
          })
        );
        setnoProd();
      } else {
        setContent();
        setnoProd(<div className="no-prod">No Products Found!!</div>);
      }
    } else if (err) {
      setContent();
      setnoProd(<div className="no-prod">error! reload required!!</div>);
    } else {
      setContent();
      setnoProd(<div className="no-prod">Loading Users...</div>);
    }
    console.log(users);
  }, [users, err]);

  return (
    <div className="container-prod">
      <SearchBar />
      <NavLink to="/add-users">
        <button>Add Users</button>
      </NavLink>
      <div className="products">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Contacts</th>
              <th>Orders</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
        {noProd}
      </div>
    </div>
  );
};

export default Users;
