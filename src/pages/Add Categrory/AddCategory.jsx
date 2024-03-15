import "./style.css";
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Dropzone from "../../components/Dropzone/Dropzone";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function AddCategory() {
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const navigate = useNavigate();
  const [cookies] = useCookies(["access_token"]);

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("category_image", image);
    data.append("name", name);
    data.append("description", description);
    console.log(cookies.access_token);
    await axios
      .post(
        "https://ecommerce-back-end-orpin.vercel.app/api/category/secure/",
        data,
        {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/categories");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-prod">
      <div className="content-container">
        <h1 className="add-heading">Add Category</h1>
        <div className="dropzone">
          <Dropzone image={image} setImage={setImage} />
        </div>
        <div className="addproduct">
          <form>
            <div className="form-group product-group">
              <label htmlFor="name">Category Title</label>
              <input
                className="form-control product-inp"
                type="text"
                id="name"
                name="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
}

export default AddCategory;
