import { Select } from "antd";
import Card from "../../../utilities/card/Card";
import { useState } from "react";
import { Container, Grid2, Icon } from "@mui/material";
import Item from "antd/es/list/Item";
import GroupsIcon from '@mui/icons-material/Groups';
import PaymentsIcon from '@mui/icons-material/Payments';
import TimelineIcon from '@mui/icons-material/Timeline';
import Table from "../../../utilities/table/Table";
import PieChartComponent from "./PieChartComponent";
import AreaChartComponent from "./AreaChartComponent";
const ProyeccionDeEscenariosDeNomina = () => {

    const [periodoId, setPeriodoId] = useState(null);
    const [departamentoId, setDepartamentoId] = useState(null);
    const [tiposDeEmpleadoId, setTiposDeEmpleadoId] = useState(null);
    const [rangoId, setRangoId] = useState(null);
    const [anioChartId, setAnioChartId] = useState(null);

    const [periodos, setPeriodos] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [tiposDeEmpleados, setTiposDeEmpleados] = useState([]);
    const [rangosChart, setRangosChart] = useState([]);
    const [aniosChart, setAniosChart] = useState([]);

    const [empleados, setEmpleados] = useState(250);
    const [proyeccionTotal, setProyeccionTotal] = useState("$ 500,000 MXN");
    const [variacion, setVariacion] = useState(3.95);

    const handleBuscar = () => { }

    const [tableData, setTableData] = useState([
        {
            "empleado": "Oscar Cruz Hernández",
            "vacante": "Director",
            "salario": "15,000.00",
            "retenciones": "4,000.00",
            "bonos": "3,200.00",
            "total": "22,200.00"
        },
        {
            "empleado": "Luis Sanchez",
            "vacante": "Intendente",
            "salario": "10,000.00",
            "retenciones": "1,000.00",
            "bonos": "1,000.00",
            "total": "10,000.00"
        },
        {
            "empleado": "Oscar Cruz Hernández",
            "vacante": "Director",
            "salario": "15,000.00",
            "retenciones": "4,000.00",
            "bonos": "3,200.00",
            "total": "22,200.00"
        },
        {
            "empleado": "Luis Sanchez",
            "vacante": "Intendente",
            "salario": "10,000.00",
            "retenciones": "1,000.00",
            "bonos": "1,000.00",
            "total": "10,000.00"
        }]);
    const tableColumns = [
        {
            header: "Empleado",
            accessorKey: "empleado",
            filterFn: "includesString",
        },
        {
            header: "Vacante",
            accessorKey: "vacante",
            filterFn: "includesString",
        },
        {
            header: "Salario",
            accessorKey: "salario",
            filterFn: "includesString",
        },
        {
            header: "Retenciones",
            accessorKey: "retenciones",
            filterFn: "includesString",
        },
        {
            header: "Bonos",
            accessorKey: "bonos",
            filterFn: "includesString",
        },
        {
            header: "Total",
            accessorKey: "total",
            filterFn: "includesString",
        }

    ];
    return (
        <>
            <Card title="Proyección de escenarios de nómina">
                <div className="d-flex justify-content-between mb-3">
                    <p>Filtros </p>
                    <div>
                        <Select
                            style={{
                                width: 200,
                            }}
                            placeholder="Periodo"
                            options={periodos}
                            value={periodoId}
                            onChange={(value) => setPeriodoId(value)}
                            className="mx-1"
                        />
                        <Select
                            style={{
                                width: 200,
                            }}
                            placeholder="Departamento"
                            options={departamentos}
                            value={departamentoId}
                            onChange={(value) => setDepartamentoId(value)}
                            className="mx-1"
                        />
                        <Select
                            style={{
                                width: 200,
                            }}
                            placeholder="Tipo de empleado"
                            options={tiposDeEmpleados}
                            value={tiposDeEmpleadoId}
                            onChange={(value) => setTiposDeEmpleadoId(value)}
                            className="mx-1"
                        />
                        <button
                            className="btn btn-custom-primary"
                            onClick={handleBuscar}
                        >
                            Generar proyección
                        </button>
                    </div>
                </div>
            </Card>
            <Card title="Resumen general">
                <Grid2 container spacing={2} className="text-center">
                    <Grid2 size={4}>
                        <GroupsIcon sx={{ fontSize: 60 }} />
                        <h3 style={{ fontSize: "20px", color: "#000000" }}>Empleados</h3>
                        <h3 style={{ fontSize: "20px", color: "#000000" }}>{empleados}</h3>
                    </Grid2>
                    <Grid2 size={4}>
                        <PaymentsIcon sx={{ fontSize: 60 }} />
                        <h3 style={{ fontSize: "20px", color: "#000000" }}>Proyección Total</h3>
                        <h3 style={{ fontSize: "20px", color: "#000000" }}>{proyeccionTotal}</h3>
                    </Grid2>
                    <Grid2 size={4}>
                        <TimelineIcon sx={{ fontSize: 60 }} />
                        <h3 style={{ fontSize: "20px", color: "#000000" }}>Variación</h3>
                        <h3 style={{ fontSize: "20px", color: "#000000" }}>{variacion} %</h3>
                    </Grid2>
                </Grid2>
            </Card>
            <Card title="Gráficos">
                <Grid2 container spacing={1} className="text-center">
                    <Grid2 size={6} className="main-card">
                        <h3 className="mt-3" style={{ fontSize: "20px", color: "#000000" }}>Distribución de nómina</h3>
                        <PieChartComponent />
                    </Grid2>
                    <Grid2 size={6} className="main-card">

                        <div className="d-flex justify-content-end  mt-3 mb-1">
                            <div className="w-50">
                                <h3 className="ms-5 text-start" style={{ fontSize: "20px", color: "#000000" }}>Proyección</h3>
                            </div>
                            <div className="w-50">
                                <Select
                                    style={{
                                        width: 80,
                                    }}
                                    placeholder="Anual"
                                    options={rangosChart}
                                    value={rangoId}
                                    onChange={(value) => setRangoId(value)}
                                    className="mx-1"
                                />
                                <Select
                                    style={{
                                        width: 80,
                                    }}
                                    placeholder="2024"
                                    options={aniosChart}
                                    value={anioChartId}
                                    onChange={(value) => setAnioChartId(value)}
                                    className="mx-1"
                                />
                            </div>
                        </div>
                        <AreaChartComponent />
                    </Grid2>
                </Grid2>

            </Card>
            <Card title="Empleados">
                <Table
                    tableDesign={"proyeccion-de-escenarios-de-nomina"}
                    data={tableData}
                    columns={tableColumns}
                />
            </Card>
        </>
    )
}

export default ProyeccionDeEscenariosDeNomina;