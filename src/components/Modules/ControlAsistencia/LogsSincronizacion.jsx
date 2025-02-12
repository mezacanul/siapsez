import React, { useEffect, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import Card from "../../utilities/card/Card";
import { controlAsistenciaService } from "./services/controlAsistenciaService";

const LogsSincronizacion = () => {
  const [logs, setLogs] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarLogs();
  }, []);

  const cargarLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await controlAsistenciaService.obtenerLogs();
      setLogs(data);
    } catch (err) {
      setError("Error al cargar los logs");
    } finally {
      setLoading(false);
    }
  };

  const filtrarLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const filtros = {
        fechaInicio,
        fechaFin
      };
      const data = await controlAsistenciaService.filtrarLogs(filtros);
      setLogs(data);
    } catch (err) {
      setError("No se pudo filtrar los logs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Logs de Sincronización">
      {error && <Alert variant="danger">{error}</Alert>}

      <div className="row g-3 mb-3">
        <div className="col-md-3">
          <Form.Label>Fecha Inicio</Form.Label>
          <Form.Control
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <Form.Label>Fecha Fin</Form.Label>
          <Form.Control
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>
        <div className="col-md-3 d-flex align-items-end">
          <Button variant="primary" onClick={filtrarLogs} disabled={loading}>
            Filtrar
          </Button>
          <Button
            variant="secondary"
            className="ms-2"
            onClick={cargarLogs}
            disabled={loading}
          >
            Refrescar
          </Button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID Log</th>
              <th>Fecha</th>
              <th>ID Movimiento</th>
              <th>Acción</th>
              <th>Resultado</th>
              <th>Mensaje</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center">Cargando...</td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No hay registros
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>{new Date(log.fecha).toLocaleString()}</td>
                  <td>{log.movimientoId}</td>
                  <td>{log.accion}</td>
                  <td>{log.resultado}</td>
                  <td>{log.mensaje}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default LogsSincronizacion;
