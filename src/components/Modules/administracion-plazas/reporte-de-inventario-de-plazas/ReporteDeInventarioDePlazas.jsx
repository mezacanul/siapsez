import React, { useState } from "react";
import Card from "../../../utilities/card/Card";
import Table from "../../../utilities/table/Table";
import CustomModal from "../../../utilities/modal/CustomModal";
import { Select } from "antd";

const ReporteDeInventarioDePlazas = () => {
  const [centroDeTrabajoId, setCentroDeTrabajoId] = useState(null);
  const [estatusId, setEstatusId] = useState(null);
  const [centrosDeTrabajo, setCentrosDeTrabajo] = useState([]);
  const [estatus, setEstatus] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const handleBuscar = () => {};

  const handleRowClick = () => {
    openCloseModal();
  };

  const openCloseModal = () => setOpenModal(!openModal);

  const data = [
    {
      idPlaza: "01",
      centroTrabajo: "32DPR08510",
      tipoPlaza: "Docente",
      estadoPlaza: "Vacante",
      fechaAsignacion: "20/Nov/2024",
      estadoPresupuesto: "$ 7,500.00",
    },
    {
      idPlaza: "02",
      centroTrabajo: "32DPR0757J",
      tipoPlaza: "Docente",
      estadoPlaza: "Vacante",
      fechaAsignacion: "22/Nov/2024",
      estadoPresupuesto: "$ 7,500.00",
    },
    {
      idPlaza: "03",
      centroTrabajo: "32DPR0475B",
      tipoPlaza: "Supervisor",
      estadoPlaza: "Cancelada",
      fechaAsignacion: "25/Nov/2024",
      estadoPresupuesto: "$ 9,500.00",
    },
    {
      idPlaza: "04",
      centroTrabajo: "32DPR0487G",
      tipoPlaza: "Director",
      estadoPlaza: "Vacante",
      fechaAsignacion: "25/Nov/2024",
      estadoPresupuesto: "$ 8,500.00",
    },
    {
      idPlaza: "05",
      centroTrabajo: "32DPR1238G",
      tipoPlaza: "Docente",
      estadoPlaza: "Ocupada",
      fechaAsignacion: "15/Nov/2024",
      estadoPresupuesto: "$ 7,500.00",
    },
  ];

  // Definición de columnas de la tabla
  const columns = [
    {
      header: "ID Plaza",
      accessorKey: "idPlaza",
      filterFn: "includesString",
    },
    {
      header: "Cnetro de trabajo",
      accessorKey: "centroTrabajo",
      filterFn: "includesString",
    },
    {
      header: "Tipo de Plaza",
      accessorKey: "tipoPlaza",
      filterFn: "includesString",
    },
    {
      header: "Estado de plaza",
      accessorKey: "estadoPlaza",
      filterFn: "includesString",
    },
    {
      header: "Fecha de asignación o cancelación",
      accessorKey: "fechaAsignacion",
      filterFn: "includesString",
    },
    {
      header: "Estado de presupuesto",
      accessorKey: "estadoPresupuesto",
      filterFn: "includesString",
    },
  ];

  return (
    <>
      <Card title="Control de plazas presupuestales">
        <div className="d-flex justify-content-end mb-3">
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
          <button className="btn btn-custom-primary" onClick={handleBuscar}>
            Generar reporte
          </button>
        </div>
        <Table
          tableDesign={"centros-trabajo"}
          data={data}
          columns={columns}
          rowClick={handleRowClick}
        />
      </Card>
      <CustomModal
        open={openModal}
        close={openCloseModal}
        title="Vacante: Docente suplente de español para primaria"
        width="80%"
      >
        <div className="d-flex justify-content-between">
          <div style={{width:"50%"}}>
            <p>Sostenimiento: Dirección estatal</p>
            <p>Plaza: Docente nivel primaria</p>
            <p>Fecha de inicio de ocupación: 02 de diciembre 2024</p>
            <p>Clave CT: 32DPR0851O</p>
            <p>Titular de la vacante: Ortiz Moreno Ana Lilia</p>
            <p>Servicio educativo de la vacante: Educación Primaria</p>
            <p>Recurso presupuestal: $7,500.00</p>
            <p>Vacante: Suplente de asignatura de español</p>
            <p>Horas: 25</p>
            <p>Fecha de termino de la ocupacion: 28 de febrero de 2025</p>
            <p>CURP del titular de la vacante: OIMA650115MZCLAS01</p>
            <p>Motivo de la vacante: Permiso de maternidad</p>
            <p>Lista ordenada: En revisión</p>
            <p>ID de evaluación: 012</p>
          </div>
          <div style={{width:"50%"}} >
            <p>Requisitos:</p>
            <p>1. Los aspirantes deberán cumplir con los siguientes requisitos para participar en el proceso de selección:</p>
            <p>1.1 Acreditar estudios mínimos de licenciatura</p>
            <p>1.2 Contar con formación docente pedagógica o cubir el perfil afín al área de conocimiento del nivel, servicio o materia educativa a que aspira</p>
            <p>1.3 No ocupar plaza docente, técnico docente o de Dirección con nombramiento definitivo en el mismo nivel educativo en que desea participar. En caso de participar en un nivel educativo distinto y sea sujeto de asignación de plaza, se deberá apegar a lo dispuesto en las reglas en materia de compatibilidad de plazas, emitidas por la Unidad del Sistema para la Carrera de las Mestras y los Maestros</p>
            <p>{`1.4 No estar inhabilitado(a) para el servicio público ni tener otro impedimento legal`}</p>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default ReporteDeInventarioDePlazas;
