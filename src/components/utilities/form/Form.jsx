import React, { useState } from "react";
import "./form.css";

const Form = (props) => {

  const data = props.data || {};

  return (
    <>
      <form action="">
        <div className="row">
          <div className="col-sm-12 col-md-6 mb-3">
            <label className="d-block" htmlFor="">
              Nombre<span>*</span>
            </label>
            <input
              type="text"
              className="d-block w-100"
              placeholder="Ingresa el nombre"
              defaultValue={data.nombre || ""}
            />
          </div>
          <div className="col-sm-12 col-md-6 mb-3">
            <label className="d-block" htmlFor="">
              Apellido Paterno<span>*</span>
            </label>
            <input
              type="text"
              className="d-block w-100"
              placeholder="Ingresa el apellido paterno"
              defaultValue={data.apellidoPaterno || ""}
            />
          </div>
          <div className="col-sm-12 col-md-6 mb-3">
            <label className="d-block" htmlFor="">
              Apellido Materno<span>*</span>
            </label>
            <input
              type="text"
              className="d-block w-100"
              placeholder="Ingresa el apellido materno"
              defaultValue={data.apellidoMaterno || ""}
            />
          </div>
          <div className="col-sm-12 col-md-6 mb-3">
            <label className="d-block" htmlFor="">
              Email<span>*</span>
            </label>
            <input
              type="email"
              className="d-block w-100"
              placeholder="Ingresa el email"
              defaultValue={data.email || ""}
            />
          </div>
          <div className="col-sm-12 col-md-6 mb-3">
            <label className="d-block" htmlFor="">
              RFC<span>*</span>
            </label>
            <input
              type="text"
              className="d-block w-100"
              placeholder="Ingresa el RFC"
              defaultValue={data.rfc || ""}
            />
          </div>
          <div className="col-sm-12 col-md-6 mb-3">
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-custom-primary">{props.actionText}</button>
        </div>
      </form>
    </>
  );
};

export default Form;
