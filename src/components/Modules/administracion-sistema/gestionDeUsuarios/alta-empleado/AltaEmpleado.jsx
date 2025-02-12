import React, { useEffect, useState } from "react";
import Card from "../../../../utilities/card/Card";
import "./altaEmpleado.css";
import useGetRequest from "../../../../../hooks/useGetRequest";
import usePostRequest from "../../../../../hooks/usePostRequest";
import Swal from "sweetalert2"

const AltaEmpleado = () => {
  const [rfc, setRFC] = useState("");
  const [rfcError, setRFCError] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [empleado, setEmpleado] = useState({
    numeroEmpleado: "",
    cedula: "",
    anioEgreso: "",
    nivelAcademico: "",
    escuelaEgreso: "",
    area: "",
    actInact: "",
    folioCredencial: "",
    email: "",
    telefono: "",
  });
  const [errores, setErrores] = useState({});
  const { getData, loading, error, response } = useGetRequest();
  const { postData, response: responseEmpleado, loading: loadingEmpleado, error: errorEmpleado } = usePostRequest();

  // Expresión regular para validar el formato del RFC
  const rfcRegex =
    /^([A-ZÑ&]{3,4})(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([A-Z\d]{2})([A\d])$/;

  const telefonoRegex = /^\d{10}$/;

  const validarRFC = (rfc) => {
    if (!rfcRegex.test(rfc)) {
      return "El RFC no tiene un formato válido.";
    }
    return ""; // Retorna una cadena vacía si es válido
  };

  // Maneja el envío del formulario de RFC
  const handleSubmitRFC = async (e) => {
    e.preventDefault();
    setMostrarFormulario(false);
    const mensajeError = validarRFC(rfc);
    setRFCError(mensajeError);

    if (mensajeError) return; // No continuar si hay errores en el RFC

    setMostrarFormulario(true);

    // Lógica adicional para manejar el RFC válido
    await getData(
      `${import.meta.env.VITE_BACKEND_URL
      }/recursos_humanos/persona/obtenerPersonaPorRfc/${rfc}`
    );
  };

  // Maneja el envío del formulario de alta de empleados
  const handleSubmitEmpleado = async (e) => {
    e.preventDefault();

    const newErrores = {};
    Object.keys(empleado).forEach((key) => {
      if (!empleado[key]) {
        newErrores[key] = "Este campo es obligatorio.";
      }
    });

    if (empleado.telefono && !telefonoRegex.test(empleado.telefono)) {
      newErrores.telefono =
        "Número de teléfono no válido. Debe tener 10 dígitos.";
    }

    if (Object.keys(newErrores).length > 0) {
      setErrores(newErrores);
      return;
    }

    // Agrega idPersona al objeto empleado si está disponible
    const empleadoConIdPersona = {
      ...empleado,
      idPersona: response?.idPersona || "", // Asegúrate de manejar si no hay idPersona
    };

    //console.log("Formulario de alta de empleado válido:", empleadoConIdPersona);

    await postData(
      `${import.meta.env.VITE_BACKEND_URL
      }/recursos_humanos/empleado/agregarNuevoEmpleado`,
      empleadoConIdPersona
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmpleado((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: "" })); // Limpiar el error al escribir
  };

  useEffect(() => {
    if (!loadingEmpleado) {
      if (responseEmpleado) {
        Swal.fire({
          title: `${responseEmpleado.mensaje}`,
          icon: "success",
          confirmButtonText: "Aceptar"
        })
        setEmpleado({
          numeroEmpleado: "",
          cedula: "",
          anioEgreso: "",
          nivelAcademico: "",
          escuelaEgreso: "",
          area: "",
          actInact: "",
          folioCredencial: "",
          email: "",
          telefono: "",
        })
      } else if (errorEmpleado) {
        console.log(errorEmpleado)
        Swal.fire({
          title: "Hubo un error al agregar el empleado",
          icon: "error",
          confirmButtonText: "Cerrar"
        })

      }
    }
  }, [loadingEmpleado, responseEmpleado, errorEmpleado])

  return (
    <>
      <Card title="Datos generales">
        <div className="row">
          <div className="col-sm-12 col-md-3 p-3 right-line">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <form onSubmit={handleSubmitRFC} className="form-empleado">
                <input
                  type="text"
                  placeholder="Ingrese el RFC"
                  value={rfc}
                  onChange={(e) => setRFC(e.target.value.toUpperCase())} // Convierte a mayúsculas
                  className={rfcError ? "input-error" : ""}
                />
                {rfcError && <p className="error-text">{rfcError}</p>}
                <div className="text-center">
                  <button className="btn btn-custom-primary w-100">
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm-12 col-md-9">
            <h2>Datos Generales</h2>
            <p>RFC: {response?.rfc}</p>
            <p>Nombre: {response?.nombre}</p>
            <p>Tipo de persona: {response?.tipoPersona}</p>
          </div>
        </div>
      </Card>
      {mostrarFormulario &&
        <Card title="Alta de empleados" >
          <form id="form-alta-empleado" onSubmit={handleSubmitEmpleado} className="form-alta-empleado">
            <div className="row">
              <div className="col-sm-12 col-md-6 mb-3">
                <label className="d-block" htmlFor="numeroEmpleado">
                  Numero de empleado<span>*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  name="numeroEmpleado"
                  placeholder="Ingrese el numero de empleado"
                  className={`d-block w-100 ${errores.numeroEmpleado ? "input-error" : ""
                    }`}
                  value={empleado.numeroEmpleado}
                  onChange={handleInputChange}
                />
                {errores.numeroEmpleado && (
                  <p className="error-text">{errores.numeroEmpleado}</p>
                )}
              </div>
              <div className="col-sm-12 col-md-6 mb-3">
                <label className="d-block" htmlFor="cedula">
                  Cedula<span>*</span>
                </label>
                <input
                  type="text"
                  name="cedula"
                  className={`d-block w-100 ${errores.cedula ? "input-error" : ""
                    }`}
                  placeholder="Ingresa la cedula"
                  value={empleado.cedula}
                  onChange={handleInputChange}
                />
                {errores.cedula && <p className="error-text">{errores.cedula}</p>}
              </div>
              <div className="col-sm-12 col-md-6 mb-3">
                <label className="d-block" htmlFor="anioEgreso">
                  Año de egreso<span>*</span>
                </label>
                <input
                  type="number"
                  name="anioEgreso"
                  min="1900"
                  max={new Date().getFullYear()}
                  placeholder="Ingrese el año de egreso"
                  className={`d-block w-100 ${errores.anioEgreso ? "input-error" : ""
                    }`}
                  value={empleado.anioEgreso}
                  //onChange={handleInputChange}
                  onChange={(e) => {
                    const newValue = e.target.value.slice(0, 4);
                    setEmpleado((prev) => ({
                      ...prev,
                      anioEgreso: newValue,
                    }));
                  }}
                />
                {errores.anioEgreso && (
                  <p className="error-text">{errores.anioEgreso}</p>
                )}
              </div>
              <div className="col-sm-12 col-md-6 mb-3">
                <label className="d-block" htmlFor="nivelAcademico">
                  Nivel academico<span>*</span>
                </label>
                <input
                  type="text"
                  name="nivelAcademico"
                  className={`d-block w-100 ${errores.nivelAcademico ? "input-error" : ""
                    }`}
                  placeholder="Ingresa el nivel academico"
                  value={empleado.nivelAcademico}
                  onChange={handleInputChange}
                />
                {errores.nivelAcademico && (
                  <p className="error-text">{errores.nivelAcademico}</p>
                )}
              </div>
              <div className="col-sm-12 col-md-6 mb-3">
                <label className="d-block" htmlFor="escuelaEgreso">
                  Escuela de egreso<span>*</span>
                </label>
                <input
                  type="text"
                  name="escuelaEgreso"
                  className={`d-block w-100 ${errores.escuelaEgreso ? "input-error" : ""
                    }`}
                  placeholder="Ingresa la escuela de egreso"
                  value={empleado.escuelaEgreso}
                  onChange={handleInputChange}
                />
                {errores.escuelaEgreso && (
                  <p className="error-text">{errores.escuelaEgreso}</p>
                )}
              </div>
              <div className="col-sm-12 col-md-6 mb-3">
                <label className="d-block" htmlFor="area">
                  Area<span>*</span>
                </label>
                <input
                  type="number"
                  name="area"
                  min="1"
                  className={`d-block w-100 ${errores.area ? "input-error" : ""}`}
                  placeholder="Ingresa el area"
                  value={empleado.area}
                  onChange={handleInputChange}
                />
                {errores.area && <p className="error-text">{errores.area}</p>}
              </div>
              <div className="col-sm-12 col-md-6 mb-3">
                <label className="d-block" htmlFor="actInact">
                  Activo<span>*</span>
                </label>
                <select name="actInact" className={`d-block w-100 ${errores.actInact ? "input-error" : ""
                  }`}
                  value={empleado.actInact}
                  onChange={handleInputChange}
                >
                  <option value="A">Activo</option>
                  <option value="I">Inactivo</option>
                </select>

                {errores.actInact && (
                  <p className="error-text">{errores.actInact}</p>
                )}
              </div>
              <div className="col-sm-12 col-md-6 mb-3">
                <label className="d-block" htmlFor="folioCredencial">
                  Folio de credencial<span>*</span>
                </label>
                <input
                  type="number"
                  name="folioCredencial"
                  min="1"
                  className={`d-block w-100 ${errores.folioCredencial ? "input-error" : ""
                    }`}
                  placeholder="Ingresa el folio de credencial"
                  value={empleado.folioCredencial}
                  onChange={handleInputChange}
                />
                {errores.folioCredencial && (
                  <p className="error-text">{errores.folioCredencial}</p>
                )}
              </div>
              <div className="col-sm-12 col-md-6 mb-3">
                <label className="d-block" htmlFor="email">
                  Correo electrónico<span>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className={`d-block w-100 ${errores.email ? "input-error" : ""
                    }`}
                  placeholder="Ingresa el correo electrónico"
                  value={empleado.email}
                  onChange={handleInputChange}
                />
                {errores.email && <p className="error-text">{errores.email}</p>}
              </div>
              <div className="col-sm-12 col-md-6 mb-3">
                <label className="d-block" htmlFor="telefono">
                  Teléfono<span>*</span>
                </label>
                <input
                  type="text"
                  name="telefono"
                  min="1"
                  maxLength="10"
                  className={`d-block w-100 ${errores.telefono ? "input-error" : ""
                    }`}
                  placeholder="Ingresa el teléfono"
                  value={empleado.telefono}
                  //onChange={handleInputChange}
                  onChange={(e) => {
                    setEmpleado((prev) => ({
                      ...prev,
                      telefono: e.target.value ? e.target.value : "",
                    }));
                  }}
                />
                {errores.telefono && (
                  <p className="error-text">{errores.telefono}</p>
                )}
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary">Enviar</button>
            </div>
          </form>
        </Card>
      }
    </>
  );
};

export default AltaEmpleado;
