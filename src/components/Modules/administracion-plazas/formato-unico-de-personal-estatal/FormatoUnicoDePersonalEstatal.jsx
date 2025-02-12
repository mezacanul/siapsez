import React, { useState } from "react";
import Card from "../../../utilities/card/Card";
import CustomForm from "../../../utilities/form/CustomForm";
import { Tabs } from "antd";
import FormatoUnicoPersonal from "../../../utilities/pdf-templates/FormatoUnicoPersonal";
import ShadowComponent from "../../../utilities/pdf-templates/ShadowComponent";
import HojaDeFiliacion from "../../../utilities/pdf-templates/HojaDeFiliacion";
import Swal from "sweetalert2";

const FormatoUnicoDePersonalEstatal = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [formData, setFormData] = useState({});
  const [enabledTabs, setEnabledTabs] = useState(["1"]);
  const [rfc, setRfc] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [currentInfo, setCurrentInfo] = useState({});
  const [
    mostrarHojaDeFormatoUnicoPersonal,
    setMostrarHojaDeFormatoUnicoPersonal,
  ] = useState(false);

  const camposInformacionEmpleado = [
    //------------------------ Información del empleado --------------------------------------
    { type: "divider", label: "Información del empleado" },
    {
      name: "nombre",
      label: "Nombre(s)",
      type: "text",
      placeholder: "Ingresa el (los) nombre(s)",
      disabled: true,
    },
    {
      name: "apellidoPaterno",
      label: "Apellido paterno",
      type: "text",
      placeholder: "Ingresa el apellido paterno",
      disabled: true,
    },
    {
      name: "apellidoMaterno",
      label: "Apellido materno",
      type: "text",
      placeholder: "Ingresa el apellido materno",
      disabled: true,
    },
    {
      name: "numeroDeEmpleado",
      label: "Número de empleado",
      type: "number",
      placeholder: "Ingresa el número de empleado",
      disabled: true,
    },
    {
      name: "region",
      label: "Región",
      type: "text",
      placeholder: "Selecciona una región",
      required: true,
    },
    {
      name: "tipoMovimiento",
      label: "Tipo de movimiento",
      type: "text",
      placeholder: "Selecciona el tipo de movimiento",
      required: true,
    },
    {
      name: "tipoNomina",
      label: "Tipo de nómina",
      type: "text",
      placeholder: "Selecciona el tipo de nómina",
      required: true,
    },
    {
      name: "seguroSocial",
      label: "Seguro social",
      type: "number",
      placeholder: "Ingresa el número de seguro social",
      disabled: true,
    },
    {
      name: "folio",
      label: "Folio",
      type: "number",
      placeholder: "Ingresa el folio",
      required: true,
    },
    {
      name: "centroTrabajo",
      label: "Centro de trabajo",
      type: "text",
      placeholder: "Selecciona el centro de trabajo",
      disabled: true,
    },
    {
      name: "curp",
      label: "CURP",
      type: "curp",
      placeholder: "Ingresa el curp",
      disabled: true,
    },
    {
      name: "genero",
      label: "Sexo",
      type: "text",
      placeholder: "Selecciona un género",
      disabled: true,
    },
    {
      name: "antiguedad",
      label: "Antigüedad",
      type: "date",
      disabled: true,
    },
    {
      name: "nivelMaximoEstudios",
      label: "Nivel máximo de preparación",
      type: "text",
      placeholder: "Selecciona un nivel de estudios",
      disabled: true,
    },
    {
      name: "asignacionPerciboReduccionConcepto",
      label: "Concepto",
      type: "text",
      placeholder: "Ingresa el concepto",
      required: true,
    },
    {
      name: "asignacionPerciboReduccionImporte",
      label: "Importe",
      type: "number",
      placeholder: "Ingresa el importe",
      required: true,
    },
    { type: "divider", label: "Compensaciones y prestaciones" },
    {
      name: "compensacionPartida",
      label: "Partida",
      type: "text",
      placeholder: "Ingresa la partida",
    },
    {
      name: "compensacionTotal",
      label: "Total",
      type: "number",
      placeholder: "-",
    },
    {
      name: "compensacionImpuesto",
      label: "Impuesto",
      type: "number",
      placeholder: "-",
    },
    {
      name: "compensacionTotalAPagar",
      label: "Total a pagar",
      type: "number",
      placeholder: "-",
      disabled: true,
    },
    {
      name: "compensacionDesde",
      label: "Desde",
      type: "date",
    },
    {
      name: "compensacionHasta",
      label: "Hasta",
      type: "date",
    },
    {
      name: "observaciones",
      label: "Observaciones",
      type: "textarea",
      placeholder: "Ingresa las observaciones",
    },
  ];

  const camposMovimientos = [
    //------------------------ Información del empleado --------------------------------------
    { type: "divider", label: "Movimientos" },
    {
      name: "movimientoTipoMovimiento",
      label: "Tipo de movimiento",
      type: "text",
      placeholder: "Selecciona un tipo de movimiento",
      required: true,
    },
    {
      name: "movimientoclaveFederal",
      label: "Clave federal",
      type: "text",
      placeholder: "Ingresa la clave federal",
      required: true,
    },
    {
      name: "movimientoPuesto",
      label: "Puesto",
      type: "text",
      placeholder: "Selecciona un puesto",
      required: true,
    },
    {
      name: "movimientoCAT",
      label: "CAT",
      type: "text",
      placeholder: "Selecciona un CAT",
      required: true,
    },
    {
      name: "movimientoDesde",
      label: "Desde",
      type: "date",
      required: true,
    },
    {
      name: "movimientosHasta",
      label: "Hasta",
      type: "date",
      required: true,
    },
    {
      name: "moviminetosDocumentacionAnexa",
      label: "Documentación anexa",
      type: "text",
      placeholder: "Selecciona un recurso presupuestal",
      required: true,
    },
    {
      name: "movimientoTipoMovimiento2",
      label: "Tipo de movimiento",
      type: "text",
      placeholder: "Selecciona un tipo de movimiento",
      required: true,
    },
    {
      name: "movimientoMotivoMovimiento",
      label: "Motivo de movimiento",
      type: "text",
      placeholder: "Selecciona un motivo del movimiento",
      required: true,
    },
    {
      name: "movimientoCodigoPlaza",
      label: "Código de plaza",
      type: "text",
      placeholder: "Ingresa el código de plaza",
      required: true,
    },
    {
      name: "movimientoUnidad",
      label: "Unidad",
      type: "text",
      placeholder: "Ingresa una unidad",
      required: true,
    },
    {
      name: "movimientoSubi",
      label: "SUBI",
      type: "text",
      placeholder: "Ingresa el SUBI",
      required: true,
    },
    {
      name: "movimientoclaveFederal2",
      label: "Clave federal",
      type: "text",
      placeholder: "Ingresa la clave federal",
      required: true,
    },
    {
      name: "movimientoHoras",
      label: "Horas",
      type: "text",
      placeholder: "Ingresa las horas",
      required: true,
    },
    {
      name: "movimientoCodigo",
      label: "Código",
      type: "text",
      placeholder: "Ingresa el código",
      required: true,
    },
    {
      name: "movimientoDesde2",
      label: "Desde",
      type: "date",
      required: true,
    },
    {
      name: "movimientoHasta2",
      label: "Hasta",
      type: "date",
      required: true,
    },
    {
      name: "descripcionPuestpOCategoria",
      label: "Descripción del puesto o categoría",
      type: "text",
      placeholder: "Ingresa la descripción del puesto o categoría",
      required: true,
    },
    {
      name: "nuevoCentroDeTrabajo",
      label: "Nuevo centro de trabajo",
      type: "text",
      placeholder: "Ingresa el nuevo centro de trabajo",
      required: true,
    },
  ];

  const camposDeLosSustituidos = [
    //------------------------ Información del empleado --------------------------------------
    { type: "divider", label: "Datos del (los) sustituido(s)" },
    {
      name: "datosNoEemp",
      label: "Número de empleado",
      type: "text",
      placeholder: "Ingresa el número de empleado",
      required: true,
    },
    {
      name: "datosTipoDeNomina",
      label: "Tipo de nomina",
      type: "text",
      placeholder: "Selecciona un tipo de nomina",
      required: true,
    },
    {
      name: "datosRFC",
      label: "RFC",
      type: "text",
      placeholder: "Ingresa el RFC",
      required: true,
    },
    {
      name: "datosCURP",
      label: "CURP",
      type: "curp",
      placeholder: "Ingresa el curp",
      required: true,
    },
    {
      name: "datosPrimerApellido",
      label: "Apellido paterno",
      type: "text",
      placeholder: "Ingresa el apellido paterno",
      required: true,
    },
    {
      name: "datosSegundoApellido",
      label: "Apellido materno",
      type: "text",
      placeholder: "Ingresa el apellido materno",
      required: true,
    },
    {
      name: "datosNombre",
      label: "Nombre(s)",
      type: "text",
      placeholder: "Ingresa el (los) nombre(s)",
      required: true,
    },
    {
      name: "datosMotivo",
      label: "Motivo",
      type: "text",
      placeholder: "Selecciona un motivo",
      required: true,
    },
    {
      name: "datosdesde",
      label: "Desde",
      type: "date",
      required: true,
    },
    {
      name: "datosHasta",
      label: "Hasta",
      type: "date",
      required: true,
    },
  ];

  const camposDelRecurso = [
    //------------------------ Información del empleado --------------------------------------
    { type: "divider", label: "Datos del recurso" },
    {
      name: "recursoNoEmp",
      label: "Número de empleado",
      type: "text",
      placeholder: "Ingresa el número de empleado",
      required: true,
    },
    {
      name: "recursoTipoDeNomina",
      label: "Tipo de nomina",
      type: "text",
      placeholder: "Selecciona un tipo de nomina",
      required: true,
    },
    {
      name: "recursoRFC",
      label: "RFC",
      type: "text",
      placeholder: "Ingresa el RFC",
      required: true,
    },
    {
      name: "recursoCURP",
      label: "CURP",
      type: "curp",
      placeholder: "Ingresa el curp",
      required: true,
    },
    {
      name: "recursoPrimerApellido",
      label: "Apellido paterno",
      type: "text",
      placeholder: "Ingresa el apellido paterno",
      required: true,
    },
    {
      name: "recursoSegundoApellido",
      label: "Apellido materno",
      type: "text",
      placeholder: "Ingresa el apellido materno",
      required: true,
    },
    {
      name: "recursoNombre",
      label: "Nombre(s)",
      type: "text",
      placeholder: "Ingresa el (los) nombre(s)",
      required: true,
    },
    {
      name: "recursoMotivo",
      label: "Motivo",
      type: "text",
      placeholder: "Selecciona un motivo",
      required: true,
    },
    {
      name: "recursodesde",
      label: "Desde",
      type: "date",
      required: true,
    },
    {
      name: "recursoHasta",
      label: "Hasta",
      type: "date",
      required: true,
    },
  ];

  const handleFormChange = (data) => {
    // Actualiza el estado en tiempo real con los datos de cada campo
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const handleNextTab = (data) => {
    // Guarda los datos del formulario actual en el estado
    setFormData((prevData) => ({
      ...prevData,
      ...data,
      rfc: currentInfo.rfc,
      fecha: currentInfo.fecha,
    }));

    // Avanza al siguiente tab y habilita el siguiente tab
    const nextTab = (parseInt(activeTab) + 1).toString();
    setActiveTab(nextTab);
    setEnabledTabs((prevTabs) => [...prevTabs, nextTab]);
  };

  const handleChangeRfc = (e) => {
    setRfc(e.target.value);
    console.log(rfc);
  };

  const handleValidarRfc = (e) => {
    e.preventDefault();
    setMostrarFormulario(false);
    setMostrarHojaDeFormatoUnicoPersonal(false);
    setActiveTab("1");
    setEnabledTabs(["1"]);
    const mockData = {
      GHI234567MNO: {
        rfc: "GHI234567MNO",
        numeroDeEmpleado: "123456",
        nombre: "Carlos",
        apellidoPaterno: "Hernández",
        apellidoMaterno: "Martínez",
        region: "Región 3",
        tipoMovimiento: "Alta",
        tipoNomina: "Semanal",
        seguroSocial: "03215789462",
        centroTrabajo: "15EABC020X",
        curp: "HEMC920731HDFRR2",
        genero: "M",
        antiguedad: "2010-06-15",
        nivelMaximoEstudios: "Preparatoria",
        fecha: "2024-12-12",
      },
      JKL890123PQR: {
        rfc: "JKL890123PQR",
        numeroDeEmpleado: "654321",
        nombre: "Lucía",
        apellidoPaterno: "Navarro",
        apellidoMaterno: "García",
        region: "Región 4",
        tipoMovimiento: "Cambio de puesto",
        tipoNomina: "Quincenal",
        seguroSocial: "85420319786",
        centroTrabajo: "48EDEF030W",
        curp: "NAGL850520MMCRR3",
        genero: "F",
        antiguedad: "2005-09-10",
        nivelMaximoEstudios: "Licenciatura",
        fecha: "2024-12-12",
      },
      MNO456789STU: {
        rfc: "MNO456789STU",
        numeroDeEmpleado: "789012",
        nombre: "Fernando",
        apellidoPaterno: "Ortega",
        apellidoMaterno: "Ruiz",
        region: "Región 5",
        tipoMovimiento: "Reingreso",
        tipoNomina: "Mensual",
        seguroSocial: "63874592014",
        centroTrabajo: "23EHIJ040Z",
        curp: "ORRF760311HDFLL9",
        genero: "M",
        antiguedad: "1998-12-01",
        nivelMaximoEstudios: "Maestría",
        fecha: "2024-12-12",
      },
      PQR123456VWX: {
        rfc: "PQR123456VWX",
        numeroDeEmpleado: "456789",
        nombre: "Gabriela",
        apellidoPaterno: "López",
        apellidoMaterno: "Hernández",
        region: "Región 6",
        tipoMovimiento: "Transferencia",
        tipoNomina: "Quincenal",
        seguroSocial: "47920185632",
        centroTrabajo: "11EJKL050X",
        curp: "LOHG850215MGRZR5",
        genero: "F",
        antiguedad: "2000-05-22",
        nivelMaximoEstudios: "Licenciatura",
        fecha: "2024-12-12",
      },
      STU678901YZA: {
        rfc: "STU678901YZA",
        numeroDeEmpleado: "101112",
        nombre: "Raúl",
        apellidoPaterno: "García",
        apellidoMaterno: "Mendoza",
        region: "Región 7",
        tipoMovimiento: "Promoción",
        tipoNomina: "Semanal",
        seguroSocial: "14259783064",
        centroTrabajo: "56EFGH060Y",
        curp: "GAMR750218HDFPR7",
        genero: "M",
        antiguedad: "2015-03-12",
        nivelMaximoEstudios: "Doctorado",
        fecha: "2024-12-12",
      },
      YZA890123BCD: {
        rfc: "YZA890123BCD",
        numeroDeEmpleado: "202224",
        nombre: "Ana",
        apellidoPaterno: "Zamora",
        apellidoMaterno: "Fuentes",
        region: "Región 8",
        tipoMovimiento: "Alta",
        tipoNomina: "Quincenal",
        seguroSocial: "98537421059",
        centroTrabajo: "21EMNO070B",
        curp: "ZAFU880912MDFPP0",
        genero: "F",
        antiguedad: "2018-11-18",
        nivelMaximoEstudios: "Licenciatura",
        fecha: "2024-12-12",
      },
      ABC234567DEF: {
        rfc: "ABC234567DEF",
        numeroDeEmpleado: "303336",
        nombre: "Luis",
        apellidoPaterno: "Villanueva",
        apellidoMaterno: "Cruz",
        region: "Región 9",
        tipoMovimiento: "Reingreso",
        tipoNomina: "Mensual",
        seguroSocial: "75389104628",
        centroTrabajo: "35EPQR080C",
        curp: "VICL830108HDFRR8",
        genero: "M",
        antiguedad: "2001-07-19",
        nivelMaximoEstudios: "Licenciatura",
        fecha: "2024-12-12",
      },
      DEF678901GHJ: {
        rfc: "DEF678901GHJ",
        numeroDeEmpleado: "404448",
        nombre: "Paola",
        apellidoPaterno: "Romero",
        apellidoMaterno: "Santos",
        region: "Región 10",
        tipoMovimiento: "Cambio de puesto",
        tipoNomina: "Semanal",
        seguroSocial: "32658149072",
        centroTrabajo: "64ESTU090K",
        curp: "ROSP901014MDFTR2",
        genero: "F",
        antiguedad: "2016-08-25",
        nivelMaximoEstudios: "Preparatoria",
        fecha: "2024-12-12",
      },
      GHI123456KLN: {
        rfc: "GHI123456KLN",
        numeroDeEmpleado: "505560",
        nombre: "Diego",
        apellidoPaterno: "Castañeda",
        apellidoMaterno: "Blanco",
        region: "Región 11",
        tipoMovimiento: "Baja",
        tipoNomina: "Quincenal",
        seguroSocial: "48569213047",
        centroTrabajo: "76EUVW100L",
        curp: "CABD920612HDFPP4",
        genero: "M",
        antiguedad: "2003-09-17",
        nivelMaximoEstudios: "Licenciatura",
        fecha: "2024-12-12",
      },
      JKL456789MOP: {
        rfc: "JKL456789MOP",
        numeroDeEmpleado: "606672",
        nombre: "Sofía",
        apellidoPaterno: "Flores",
        apellidoMaterno: "Gómez",
        region: "Región 12",
        tipoMovimiento: "Transferencia",
        tipoNomina: "Mensual",
        seguroSocial: "73920418561",
        centroTrabajo: "87EBCD110M",
        curp: "FLGS870816MDFTR1",
        genero: "F",
        antiguedad: "1995-04-10",
        nivelMaximoEstudios: "Maestría",
        fecha: "2024-12-12",
      },
    };

    // Simula un retraso breve para dar tiempo al re-renderizado
    setTimeout(() => {
      if (mockData[rfc]) {
        setCurrentInfo(mockData[rfc]);
        setMostrarFormulario(true);
      } else {
        alert("RFC no encontrado");
      }
    }, 100); // 100ms de retraso
  };

  // Se crea el JSON y se manda a la petición para hacer la filiación
  const handleSave = () => {
    Swal.fire({
      title: "Proceso realizado correctamente",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
    setTimeout(() => {
      setMostrarHojaDeFormatoUnicoPersonal(true);
      setMostrarFormulario(false);
      setActiveTab("1");
      setEnabledTabs(["1"]);
    }, 100);
  };

  // Función que crea los campos con valores por defecto
  const crearCampos = (fields) =>
    fields.map((field) => ({
      ...field,
      defaultValue: "",
    }));

  // Función llenar los campos con la información existente
  const editarCampos = (fields, data) =>
    fields.map((field) => ({
      ...field,
      defaultValue: data[field.name],
    }));

  // Campos para el formulario de creación
  const camposCrearInformacionEmpleado = crearCampos(camposInformacionEmpleado);
  const camposCrearMovimientos = crearCampos(camposMovimientos);
  const camposCrearDeLosSustituidos = crearCampos(camposDeLosSustituidos);
  const camposCrearDelRecurso = crearCampos(camposDelRecurso);

  const camposEditar = editarCampos(camposInformacionEmpleado, currentInfo);

  // Vistas de las Tabs
  const items = [
    {
      key: "1",
      label: "Información del empleado",
      children: (
        <>
          <CustomForm
            fields={camposEditar}
            onSubmit={handleNextTab}
            onChange={handleFormChange}
            buttonText="Siguiente"
          />
        </>
      ),
      disabled: !enabledTabs.includes("1"),
    },
    {
      key: "2",
      label: "Movimientos",
      children: (
        <CustomForm
          fields={camposCrearMovimientos}
          onSubmit={handleNextTab}
          onChange={handleFormChange}
          buttonText="Siguiente"
        />
      ),
      disabled: !enabledTabs.includes("2"),
    },
    {
      key: "3",
      label: "Datos del (los) sustituido(s)",
      children: (
        <CustomForm
          fields={camposCrearDeLosSustituidos}
          onSubmit={handleNextTab}
          onChange={handleFormChange}
          buttonText="Siguiente"
        />
      ),
      disabled: !enabledTabs.includes("3"),
    },
    {
      key: "4",
      label: "Datos del recurso",
      children: (
        <CustomForm
          fields={camposCrearDelRecurso}
          onSubmit={handleSave}
          onChange={handleFormChange}
          buttonText="Guardar"
        />
      ),
      disabled: !enabledTabs.includes("4"),
    },
  ];

  return (
    <>
      <Card title="Validar RFC">
        <form onSubmit={handleValidarRfc}>
          <div className="col-sm-12 col-md-6 mb-3 d-flex">
            <div className="d-block w-100">
              <label className="d-block">RFC</label>
              <input
                type="text"
                name="validarRFC"
                className="w-100"
                placeholder={"Ingresa el RFC"}
                onChange={handleChangeRfc}
                value={rfc}
              />
            </div>
            <div className="d-flex align-items-end">
              <button
                style={{ height: "56px" }}
                className="btn btn-custom-primary mx-3"
              >
                Validar
              </button>
            </div>
          </div>
        </form>
      </Card>
      {mostrarFormulario && (
        <Card title="Formato único de personal estatal">
          <Tabs activeKey={activeTab} onChange={setActiveTab} items={items} />
        </Card>
      )}
      {mostrarHojaDeFormatoUnicoPersonal && (
        <Card title="Formato único de personal estatal">
          <div className="d-flex justify-content-center">
            <ShadowComponent>
              <FormatoUnicoPersonal data={formData} />
            </ShadowComponent>
          </div>
        </Card>
      )}
    </>
  );
};

export default FormatoUnicoDePersonalEstatal;
