import React from "react";
import "../theme.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="bg-red-500 d-flex justify-content-center align-items-center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="d-flex flex-column mb-5 align-items-center gap-2">
        <img style={{width: "18rem"}} src={"/logo-sez.png"}/>
        <h3 style={{fontWeight: "200"}} className="text-white mt-4">404 - Págnia no encontrada</h3>
        <Link className="text-white text-decoration-underline" to={"/"}>Regresar a Inicio</Link>
      </div>
    </div>
  );
};

export default NotFound;
