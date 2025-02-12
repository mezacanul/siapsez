import React, { useState, useEffect } from "react";
import { Form, Button, Badge } from "react-bootstrap";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import Card from "../../utilities/card/Card";
// import { permisosService } from "./services/permisosService";
import { permisosService } from "../administracion-empleado/services/permisosService";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

const HistorialLaboral = () => {
  const [permisos, setPermisos] = useState([]);
  const [tipoFiltro, setTipoFiltro] = useState("todos");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const empleadoId = useSelector((state) => state.user.empleadoId);

  useEffect(() => {
    cargarPermisos();
  }, [empleadoId]);

  const cargarPermisos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await permisosService.obtenerPermisos();
      setPermisos(data);
    } catch (err) {
      setError("Error al cargar los permisos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const aplicarFiltros = async () => {
    try {
      setLoading(true);
      setError(null);
      const filtros = {
        tipo: tipoFiltro !== "todos" ? tipoFiltro : null,
        fechaInicio,
        fechaFin,
      };
      const data = await permisosService.filtrarPermisos(filtros);
      setPermisos(data);
    } catch (err) {
      setError("Error al filtrar los permisos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const exportarPDF = async () => {
    try {
      await permisosService.exportarPDF(permisos);
    } catch (err) {
      setError("Error al exportar PDF");
      console.error(err);
    }
  };

  const exportarExcel = async () => {
    try {
      await permisosService.exportarExcel(permisos);
    } catch (err) {
      setError("Error al exportar Excel");
      console.error(err);
    }
  };

  return (
    <div>
      {/* <div className="mb-4">
        <Form.Control
          className="w-25"
          placeholder="Ingresa R.F.C."
          type="text"
          aria-describedby="buscar"
        />
      </div> */}

      {/* Buscar empleado por RFC  */}
      <div className="row g-3 mb-4 align-items-center">
        <div className="col-md-2 me-2">
          <Form.Control
            placeholder="Ingresa R.F.C."
            type="text"
            aria-describedby="buscar"
          />
        </div>

        <Button
          variant="outline-success"
          onClick={exportarExcel}
          disabled={loading}
          className="px-4"
          style={{ width: "initial" }}
        >
          <FaSearch />
        </Button>
      </div>

      <Card title="Historial Laboral">
        <div className="mb-4">
          {/* Resultado Resumen Empleado  */}
          <div className="row g-3 mb-4 px-2 pt-3 align-items-center">
            <img
              style={{ width: "8rem", borderRadius: "50%" }}
              src={"/hombre.jpg"}
            />
            <div className="col-md-3">
              <h2 className="mb-2">Nombre Apellido</h2>
              <p>
                <b>Actual: </b> Escuela De Educacion Primaria
              </p>
            </div>
          </div>

          {/* Buscar en los resultados */}
          <div className="row g-3 mb-4">
            <div className="col-md-2">
              <Form.Control
                placeholder="Buscar"
                type="text"
                aria-describedby="buscar"
              />
            </div>

            <div className="col-md-3 d-flex gap-2">
              <Button
                variant="outline-success"
                onClick={exportarExcel}
                disabled={loading}
                className="px-4"
              >
                <FaFileExcel className="me-2" />
                Excel
              </Button>
              <Button
                variant="outline-danger"
                onClick={exportarPDF}
                disabled={loading}
                className="px-4"
              >
                <FaFilePdf className="me-2" />
                PDF
              </Button>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {/* Tabla de Historial Laboral  */}
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Puesto Ocupado</th>
                  <th>Institución</th>
                  <th>Fecha Inicio</th>
                  <th>Fecha Fin</th>
                  <th>Salario Incial</th>
                  <th>Salario Final</th>
                  <th>Motivo del cambio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td>Maestro(a)</td>
                    <td>Escuela Secundaria Técnica</td>
                    <td>01/01/2010</td>
                    <td>01/01/2020</td>
                    <td>$15,000.00 MXN</td>
                    <td>$25,000.00 MXN</td>
                    <td>Ascenso</td>
                </tr>
                <tr>
                    <td>Maestro(a)</td>
                    <td>Escuela Secundaria Técnica</td>
                    <td>01/01/2010</td>
                    <td>01/01/2020</td>
                    <td>$15,000.00 MXN</td>
                    <td>$25,000.00 MXN</td>
                    <td>Ascenso</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HistorialLaboral;
