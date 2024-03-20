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
    <>
      <div
        {...getRootProps()}
        style={{
          position: "relative",
          border: "2px dashed #cccccc",
          width: "180px",
          height: "180px",
          borderRadius: "4px",
          padding: "5px",
          textAlign: "center",
          cursor: "pointer",
          background: isDragActive ? "#fafafa" : "#ffffff",
        }}
      >
        <input {...getInputProps()} />
        {selectedFile ? (
          <>
            <button
              onClick={() => {
                setSelectedFile(null);
              }}
              className="delbtn"
            >
              <DeleteOutlineIcon />
            </button>
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Selected"
              style={{
                zIndex: "-1",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </>
        ) : (
          <p className="drop-text">
            Drag and drop an image here, or click to select one
          </p>
        )}
      </div>
    </>
  );
};

export default Dropzone;
