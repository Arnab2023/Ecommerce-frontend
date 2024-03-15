/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./style.css";

const Dropzone = ({ image, setImage }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
    console.log(image);

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target.result;
      setImage((prev) => [...prev, file]);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      {selectedFile ? (
        <>
          <div className="delete-btn">
            <DeleteOutlineIcon
              onClick={() => {
                setSelectedFile(null);
              }}
            />
          </div>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Selected"
            className="selected-image"
          />
        </>
      ) : (
        <p className="drop-text">
          {isDragActive
            ? "Drop the image here"
            : "Drag and drop an image here, or click to select one"}
        </p>
      )}
    </div>
  );
};

export default Dropzone;
