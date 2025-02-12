import { Select } from "antd";
import Card from "../../../utilities/card/Card";
import { useState } from "react";
import Table from "../../../utilities/table/Table";
import CustomModal from "../../../utilities/modal/CustomModal";

const ControlDePlazasPresupuestales = () => {
    const [centroDeTrabajoId, setCentroDeTrabajoId] = useState(null);
    const [estatusId, setEstatusId] = useState(null);


    const [centrosDeTrabajo, setCentrosDeTrabajo] = useState([]);
    const [estatus, setEstatus] = useState([]);

    const [cppData, setCppData] = useState([
        {
            "plaza": "2ADMINISTRATIVO",
            "centroDeTrabajo": "32EBH0027L",
            "estatus": "Autorizada"
        },
        {
            "plaza": "2MAESTRO Y EDUC ",
            "centroDeTrabajo": "32EBH0027L",
            "estatus": "Ocupada"
        },
        {
            "plaza": "2INTENDENTE",
            "centroDeTrabajo": "32EBH0027L",
            "estatus": "Cancelada"
        },
        {
            "plaza": "2MAESTRO Y EDUC ",
            "centroDeTrabajo": "32EJN0005T",
            "estatus": "Abierta"
        }
    ]);
    const [rowModalData, setRowModalData] = useState([
        {
            "plaza": "2MAESTRO Y EDUC",
            "descripcion": "Maestro 4 horas",
            "centroDeTrabajo": "32EBH0027L",
            "regla": "30 alumnos para un maestro",
            "cumpleRegla": "Si",
            "empleado": "Hernesto Mercado"
        }]);

    const [openModal, setOpenModal] = useState(false);

    const handleBuscar = () => { }

    const columns = [
        {
            header: "Plaza",
            accessorKey: "plaza",
            filterFn: "includesString",
        },
        {
            header: "Centro de trabajo",
            accessorKey: "centroDeTrabajo",
            filterFn: "includesString",
        },
        {
            header: "Estatus",
            accessorKey: "estatus",
            filterFn: "includesString",
        }
    ];
    const modalColumns = [
        {
            header: "Plaza",
            accessorKey: "plaza",
            filterFn: "includesString",
        },
        {
            header: "Descripción",
            accessorKey: "descripcion",
            filterFn: "includesString",
        },
        {
            header: "Centro de trabajo",
            accessorKey: "centroDeTrabajo",
            filterFn: "includesString",
        },
        {
            header: "Regla",
            accessorKey: "regla",
            filterFn: "includesString",
        },
        {
            header: "Cumple regla",
            accessorKey: "cumpleRegla",
            filterFn: "includesString",
        },
        {
            header: "Empleado",
            accessorKey: "empleado",
            filterFn: "includesString",
        }

    ];
    const handleRowClick = () => {

        openCloseModal();
    }
    const openCloseModal = () => setOpenModal(!openModal);
    const selectedRowModal =
        <div >
            <Table
                tableDesign={"control-de-plazas-presupuestales-modal"}
                data={rowModalData}
                columns={modalColumns}
            />
        </div>
    return (
        <>
            <Card title="Inventario de plazas">
                <div className="d-flex justify-content-between mb-3">
                    <p></p>
                    <div>
                        <Select
                            style={{
                                width: 200,
                            }}
                            placeholder="Centro de trabajo"
                            options={centrosDeTrabajo}
                            value={centroDeTrabajoId}
                            onChange={(value) => setCentroDeTrabajoId(value)}
                            className="mx-1"
                        />
                        <Select
                            style={{
                                width: 200,
                            }}
                            placeholder="Estatus"
                            options={estatus}
                            value={estatusId}
                            onChange={(value) => setEstatusId(value)}
                            className="mx-1"
                        />
                        <button
                            className="btn btn-custom-primary"
                            onClick={handleBuscar}
                        >
                            Buscar
                        </button>
                    </div>
                </div>
                <Table
                    tableDesign={"control-de-plazas-presupuestales"}
                    data={cppData}
                    columns={columns}
                    rowClick={handleRowClick}
                />
            </Card>
            <CustomModal
                open={openModal}
                close={openCloseModal}
                title="Detalle plaza"
                children={selectedRowModal}
                width="80%"
            />

        </>
    )
}

export default ControlDePlazasPresupuestales;