import React, { useState, useEffect } from "react";
import { Form, Button, Badge } from "react-bootstrap";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import Card from '../../utilities/card/Card'
import { permisosService } from "./services/permisosService";
import { useSelector } from 'react-redux';

const LicenciasPermisos = () => {
    const [permisos, setPermisos] = useState([]);
    const [tipoFiltro, setTipoFiltro] = useState('todos');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const empleadoId = useSelector(state => state.user.empleadoId);

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
            setError('Error al cargar los permisos');
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
                tipo: tipoFiltro !== 'todos' ? tipoFiltro : null,
                fechaInicio,
                fechaFin
            };
            const data = await permisosService.filtrarPermisos(filtros);
            setPermisos(data);
        } catch (err) {
            setError('Error al filtrar los permisos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const exportarPDF = async () => {
        try {
            await permisosService.exportarPDF(permisos);
        } catch (err) {
            setError('Error al exportar PDF');
            console.error(err);
        }
    };
    
    const exportarExcel = async () => {
        try {
            await permisosService.exportarExcel(permisos);
        } catch (err) {
            setError('Error al exportar Excel');
            console.error(err);
        }
    };

    return (
        <Card title="Licencias y Permisos">
            <div className="mb-4">
                <div className="row g-3 mb-4">
                    <div className="col-md-3">
                        <Form.Select
                            value={tipoFiltro}
                            onChange={(e) => setTipoFiltro(e.target.value)}
                        >
                            <option value="todos">Todos los tipos</option>
                            <option value="ECONOMICO">Económico</option>
                            <option value="TEMPORAL">Temporal</option>
                            <option value="BAJA">Baja definitiva</option>
                        </Form.Select>
                    </div>
                    <div className="col-md-3">
                        <Form.Control
                            type="date"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3">
                        <Form.Control
                            type="date"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                        />
                    </div>
                    <div className="col-md-3 d-flex gap-2">
                        <Button 
                            variant="outline-primary" 
                            onClick={aplicarFiltros}
                            disabled={loading}
                        >
                            Filtrar
                        </Button>
                        <Button 
                            variant="outline-success" 
                            onClick={exportarExcel}
                            disabled={loading}
                        >
                            <FaFileExcel className="me-2" />
                            Excel
                        </Button>
                        <Button 
                            variant="outline-danger" 
                            onClick={exportarPDF}
                            disabled={loading}
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

                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Fecha Solicitud</th>
                                <th>Período</th>
                                <th>Estado</th>
                                <th>Motivo</th>
                                <th>Observaciones</th>
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
                            ) : permisos.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No se encontraron permisos
                                    </td>
                                </tr>
                            ) : (
                                permisos.map((permiso) => (
                                    <tr key={permiso.id}>
                                        <td>{permiso.tipoPermiso}</td>
                                        <td>{new Date(permiso.fechaSolicitud).toLocaleDateString()}</td>
                                        <td>
                                            {new Date(permiso.fechaInicio).toLocaleDateString()} - 
                                            {new Date(permiso.fechaFin).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <Badge 
                                                bg={
                                                    permiso.status === 'APROBADO' ? 'success' :
                                                    permiso.status === 'PENDIENTE' ? 'warning' :
                                                    'danger'
                                                }
                                            >
                                                {permiso.status}
                                            </Badge>
                                        </td>
                                        <td>{permiso.motivo}</td>
                                        <td>{permiso.observaciones}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
    );
};

export default LicenciasPermisos;