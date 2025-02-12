import React, { useEffect, useState } from "react";
import { Button, Form, Badge, Alert } from "react-bootstrap";
import Card from "../../utilities/card/Card"; 
import { controlAsistenciaService } from "./services/controlAsistenciaService";
import { useSelector } from "react-redux";
import ConfirmacionMasivaModal from "./ConfirmacionMasivaModal";

const SincronizarMovimientos = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [tipoMovimiento, setTipoMovimiento] = useState("TODOS");
  const [estado, setEstado] = useState("TODOS");
  const [empleadoNombre, setEmpleadoNombre] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmMasiva, setShowConfirmMasiva] = useState(false);

  const userInfo = useSelector((state) => state.user.info);
  const roles = userInfo?.roles || [];

  const esAdmin = roles.includes("admin") || roles.includes("supervisor");

  useEffect(() => {
    cargarMovimientos();
  }, []);

  const cargarMovimientos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await controlAsistenciaService.obtenerMovimientos();
      setMovimientos(data);
    } catch (err) {
      setError("Error al cargar los movimientos");
    } finally {
      setLoading(false);
    }
  };

  const filtrarMovimientos = async () => {
    try {
      setLoading(true);
      setError(null);
      const filtros = {
        tipoMovimiento: tipoMovimiento !== "TODOS" ? tipoMovimiento : null,
        estado: estado !== "TODOS" ? estado : null,
        empleadoNombre: empleadoNombre.trim() !== "" ? empleadoNombre.trim() : null,
        fechaInicio,
        fechaFin
      };
      const data = await controlAsistenciaService.filtrarMovimientos(filtros);
      setMovimientos(data);
    } catch (err) {
      setError("Error al filtrar los movimientos");
    } finally {
      setLoading(false);
    }
  };

  const forzarSincronizacion = async (idMovimiento) => {
    try {
      setLoading(true);
      setError(null);
      await controlAsistenciaService.forzarSincronizacion(idMovimiento);
      await cargarMovimientos(); 
    } catch (err) {
      setError("Error al forzar la sincronización");
    } finally {
      setLoading(false);
    }
  };

  const reintentarSincronizacion = async (idMovimiento) => {
    try {
      setLoading(true);
      setError(null);
      await controlAsistenciaService.reintentarSincronizacion(idMovimiento);
      await cargarMovimientos();
    } catch (err) {
      setError("No se pudo reintentar la sincronización");
    } finally {
      setLoading(false);
    }
  };

  const aprobarMovimiento = async (idMovimiento) => {
    try {
      setLoading(true);
      setError(null);
      await controlAsistenciaService.aprobarMovimiento(idMovimiento);
      await cargarMovimientos();
    } catch (err) {
      setError("Error al aprobar el movimiento");
    } finally {
      setLoading(false);
    }
  };

  const abrirConfirmacionMasiva = () => {
    setShowConfirmMasiva(true);
  };

  const cerrarConfirmacionMasiva = () => {
    setShowConfirmMasiva(false);
  };

  const sincronizacionMasiva = async () => {
    try {
      setLoading(true);
      setError(null);
      const idsPendientes = movimientos
        .filter((mov) => mov.estado === "PENDIENTE")
        .map((mov) => mov.id);

      await controlAsistenciaService.sincronizacionMasiva(idsPendientes);
      await cargarMovimientos();
    } catch (err) {
      setError("Ocurrió un error en la sincronización masiva");
    } finally {
      setLoading(false);
      cerrarConfirmacionMasiva();
    }
  };

  return (
    <Card title="Sincronizar Movimientos con el Control de Asistencia">
      <div className="mb-3">
        {error && <Alert variant="danger">{error}</Alert>}

        <div className="row g-3 mb-3">
          <div className="col-md-3">
            <Form.Label>Tipo de Movimiento</Form.Label>
            <Form.Select
              value={tipoMovimiento}
              onChange={(e) => setTipoMovimiento(e.target.value)}
            >
              <option value="TODOS">Todos</option>
              <option value="ALTA">Alta</option>
              <option value="BAJA">Baja</option>
              <option value="ADSCRIPCION">Cambio Adscripción</option>
            </Form.Select>
          </div>
          <div className="col-md-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="TODOS">Todos</option>
              <option value="PENDIENTE">Pendiente</option>
              <option value="EN_PROCESO">En Proceso</option>
              <option value="COMPLETADO">Completado</option>
              <option value="ERROR">Error</option>
            </Form.Select>
          </div>
          <div className="col-md-3">
            <Form.Label>Empleado</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre o ID"
              value={empleadoNombre}
              onChange={(e) => setEmpleadoNombre(e.target.value)}
            />
          </div>
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
            <Button variant="primary" onClick={filtrarMovimientos} disabled={loading}>
              Filtrar
            </Button>
          </div>
        </div>
      </div>

      {esAdmin && (
        <div className="mb-3">
          <Button variant="warning" onClick={abrirConfirmacionMasiva} disabled={loading}>
            Sincronización Masiva
          </Button>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Empleado</th>
              <th>Tipo</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                </td>
              </tr>
            ) : movimientos.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No hay movimientos
                </td>
              </tr>
            ) : (
              movimientos.map((mov) => (
                <tr key={mov.id}>
                  <td>{mov.id}</td>
                  <td>{mov.empleadoNombre}</td>
                  <td>{mov.tipoMovimiento}</td>
                  <td>{new Date(mov.fecha).toLocaleDateString()}</td>
                  <td>
                    <Badge
                      bg={
                        mov.estado === "COMPLETADO"
                          ? "success"
                          : mov.estado === "PENDIENTE"
                          ? "secondary"
                          : mov.estado === "EN_PROCESO"
                          ? "warning"
                          : "danger"
                      }
                    >
                      {mov.estado}
                    </Badge>
                  </td>
                  <td className="d-flex gap-2">
            
                    {esAdmin && mov.estado === "PENDIENTE" && (
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => aprobarMovimiento(mov.id)}
                        disabled={loading}
                      >
                        Aprobar
                      </Button>
                    )}

                    {mov.estado === "PENDIENTE" || mov.estado === "EN_PROCESO" ? (
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => forzarSincronizacion(mov.id)}
                        disabled={loading}
                      >
                        Forzar
                      </Button>
                    ) : null}

                    {mov.estado === "ERROR" && (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => reintentarSincronizacion(mov.id)}
                        disabled={loading}
                      >
                        Reintentar
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmacionMasivaModal
        show={showConfirmMasiva}
        onHide={cerrarConfirmacionMasiva}
        onConfirm={sincronizacionMasiva}
        loading={loading}
      />
    </Card>
  );
};

export default SincronizarMovimientos;
