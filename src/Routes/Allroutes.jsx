import React from "react";
import { Route, Routes } from "react-router-dom";
import DoctorsDetails from "../Componets/DoctorsDetails";
import Home from "./Home";

const Allroutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/doctor/:id" element={<DoctorsDetails />}></Route>
      </Routes>
    </div>
  );
};

export default Allroutes;
