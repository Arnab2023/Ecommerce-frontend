/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Routes, useNavigate } from "react-router-dom";

const CustomRouter = ({ children }) => {
  const [cookies] = useCookies(["access_token"]);
  const jwt = cookies.access_token;
  const curr = window.location.pathname;
  const navigate = useNavigate();
  console.log(jwt, curr);

  // useEffect(() => {
  //   if(!jwt){
  //     if(curr !== '/login'){
  //       navigate("/login");
  //     }
  //   }
  // }, [jwt, curr, navigate]);
  return <Routes>{children}</Routes>;
};

export default CustomRouter;
