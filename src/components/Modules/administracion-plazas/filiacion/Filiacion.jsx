import React, { useEffect, useRef, useState } from "react";
import CustomForm from "../../../utilities/form/CustomForm";
import Card from "../../../utilities/card/Card";
import { Tabs } from "antd";
import usePostRequest from "../../../../hooks/usePostRequest";
import Swal from "sweetalert2";
import useGetRequest from "../../../../hooks/useGetRequest";
import HojaDeFiliacion from "../../../utilities/pdf-templates/HojaDeFiliacion";
import ReactToPrint from "react-to-print";
import ShadowComponent from "../../../utilities/pdf-templates/ShadowComponent";
import "./filiacion.css"

export const Filiacion = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [enabledTabs, setEnabledTabs] = useState(["1"]);
  const [formData, setFormData] = useState({});
  const [tipoCentros, setTipoCentros] = useState([]);
  const [nivelDeEstudios, setNivelDeEstudios] = useState([]);
  const [estadosCivil, setEstadosCivil] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [rfc, setRFC] = useState("");
  const [persona, setPersona] = useState("");
  const [rfcError, setRFCError] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarHojaDeFiliacion, setMostrarHojaDeFiliacion] = useState(false);
  const componentRef = useRef();

  const estadosMexico = [
    { value: "Aguascalientes", label: "Aguascalientes" },
    { value: "Baja California", label: "Baja California" },
    { value: "Baja California Sur", label: "Baja California Sur" },
    { value: "Campeche", label: "Campeche" },
    { value: "Chiapas", label: "Chiapas" },
    { value: "Chihuahua", label: "Chihuahua" },
    { value: "Ciudad de México", label: "Ciudad de México" },
    { value: "Coahuila", label: "Coahuila" },
    { value: "Colima", label: "Colima" },
    { value: "Durango", label: "Durango" },
    { value: "Guanajuato", label: "Guanajuato" },
    { value: "Guerrero", label: "Guerrero" },
    { value: "Hidalgo", label: "Hidalgo" },
    { value: "Jalisco", label: "Jalisco" },
    { value: "Estado de México", label: "Estado de México" },
    { value: "Michoacán", label: "Michoacán" },
    { value: "Morelos", label: "Morelos" },
    { value: "Nayarit", label: "Nayarit" },
    { value: "Nuevo León", label: "Nuevo León" },
    { value: "Oaxaca", label: "Oaxaca" },
    { value: "Puebla", label: "Puebla" },
    { value: "Querétaro", label: "Querétaro" },
    { value: "Quintana Roo", label: "Quintana Roo" },
    { value: "San Luis Potosí", label: "San Luis Potosí" },
    { value: "Sinaloa", label: "Sinaloa" },
    { value: "Sonora", label: "Sonora" },
    { value: "Tabasco", label: "Tabasco" },
    { value: "Tamaulipas", label: "Tamaulipas" },
    { value: "Tlaxcala", label: "Tlaxcala" },
    { value: "Veracruz", label: "Veracruz" },
    { value: "Yucatán", label: "Yucatán" },
    { value: "Zacatecas", label: "Zacatecas" },
  ];

  const {
    getData: obtenerPersona,
    loading,
    error,
    response: responsePersonaObtenida,
  } = useGetRequest();

  const {
    postData: agregarFiliacion,
    response: responseFiliacionAgregada,
    loading: loadingFiliacionAgregada,
    error: errorFiliacionAgregada,
  } = usePostRequest();

  const {
    getData: obtenerTiposCentrosDeTrabajo,
    loading: loadingTiposCentrosDeTrabajoObtenidos,
    error: errorTiposCentrosDeTrabajoObtenidos,
    response: responseTiposCentrosDeTrabajoObtenidos,
  } = useGetRequest();

  const {
    getData: obtenerEstadosCivil,
    loading: loadingEstadosCivilObtenidos,
    error: errorEstadosCivilObtenidos,
    response: responseEstadosCivilObtenidos,
  } = useGetRequest();

  const {
    getData: obtenerNivelDeEstudios,
    loading: loadingNivelDeEstudiosObtenidos,
    error: errorNivelDeEstudiosObtenidos,
    response: responseNivelDeEstudiosObtenidos,
  } = useGetRequest();

  const {
    getData: obtenerGeneros,
    loading: loadingGenerosObtenidos,
    error: errorGenerosObtenidos,
    response: responseGenerosObtenidos,
  } = useGetRequest();

  // Expresión regular para validar el formato del RFC
  const rfcRegex =
    /^([A-ZÑ&]{3,4})(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([A-Z\d]{2})([A\d])$/;

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
    await obtenerPersona(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/recursos_humanos/persona/obtenerPersonaPorRfc/${rfc}`
    );
  };

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
    }));

    // Avanza al siguiente tab y habilita el siguiente tab
    const nextTab = (parseInt(activeTab) + 1).toString();
    setActiveTab(nextTab);
    setEnabledTabs((prevTabs) => [...prevTabs, nextTab]);
  };

  // Se crea el JSON y se manda a la petición para hacer la filiación
  const handleSave = (data) => {
    const folio = Math.floor(100000 + Math.random() * 900000);
    const separaNombreApellido = (nombreCompleto) => {
      const [nombre, ...apellidos] = nombreCompleto.split(" ");
      return { nombre, apellidos: apellidos.join(" ") };
    };

    const madre = separaNombreApellido(
      data.nombreMadre || formData.nombreMadre || ""
    );
    const padre = separaNombreApellido(
      data.nombrePadre || formData.nombrePadre || ""
    );
    const conyuge = separaNombreApellido(
      data.nombreConyuge || formData.nombreConyuge || ""
    );

    const finalData = {
      filiacionEntity: {
        estadoNom: formData.estadoNom,
        nomMunicipio: formData.nomMunicipio,
        nomLocalidad: formData.nomLocalidad,
        nombrePadre: padre.nombre,
        separaPadre: padre.apellidos,
        nombreMadre: madre.nombre,
        separaMadre: madre.apellidos,
        actaNum: formData.actaNum || "",
        actaAnio: formData.fecha ? new Date(formData.fecha).getFullYear() : 0,
        actaFoja: formData.actaFoja || "",
        actaLlibro: formData.actaLlibro || "",
        cartillaNum: formData.cartillaNum || "",
        cartillaClase: formData.cartillaClase || "",
        nombreConyuge: conyuge.nombre,
        separaConyuge: conyuge.apellidos,
        doctoMigratorio: formData.doctoMigratorio || "",
        fecha: formData.fecha,
        lugar: formData.lugar || "",
        referPari1: data.referPari1 || "",
        domiParo1: data.domiParo1 || "",
        lugarPari1: data.lugarPari1 || "",
        telPari1: data.telPari1 || "",
        referPari2: data.referPari2 || "",
        domiParo2: data.domiParo2 || "",
        lugarPari2: data.lugarPari2 || "",
        telPari2: data.telPari2 || "",
        referAmi1: formData.referAmi1 || "",
        domAmi1: formData.domAmi1 || "",
        lugarAmi1: formData.lugarAmi1 || "",
        telAmi1: formData.telAmi1 || "",
        referAmi2: formData.referAmi2 || "",
        domAmi2: formData.domAmi2 || "",
        lugarAmi2: formData.lugarAmi2 || "",
        telAmi2: formData.telAmi2 || "",
        color: formData.color || "",
        pelo: formData.pelo || "",
        frente: formData.frente || "",
        cejas: formData.cejas || "",
        ojos: formData.ojos || "",
        nariz: formData.nariz || "",
        boca: formData.boca || "",
        estatura: formData.estatura || 0,
        sePartVisible: formData.sePartVisible || "",
        documento: formData.documento || "",
        cedula: formData.cedula || "",
        centroTrabajoId: formData.centroTrabajoId || 0,
        nomEstadoDom: formData.nomEstadoDom || "",
        nomMunicipioDom: formData.nomMunicipioDom || "",
        nomLocalidadDom: formData.nomLocalidadDom || "",
        folio: folio.toString(),
        claveCobro: formData.claveCobro || "",
        fechaExpedicion: new Date().toISOString().split("T")[0],
        lugarNacimiento: formData.lugarNacimiento || "",
        numeroExterior: formData.numeroExterior || "",
        numeroInterior: formData.numeroInterior || "",
        cp: formData.cp || "",
        lugarDomicilio: formData.lugarDomicilio || "",
        poblacion: formData.poblacion || "",
      },
      empleado: {
        idPersona: responsePersonaObtenida.idPersona || 0,
        cedula: formData.cedula || "",
        anioEgreso: formData.anioEgreso || 0,
        nivelMaximoDeEstudiosId: formData.nivelMaximoDeEstudiosId || "",
        escuelaEgreso: formData.escuelaEgreso || "",
        area: formData.area || 0,
        actInact: formData.actInact || "",
        folioCredencial: formData.folioCredencial || 0,
        email: formData.email || "",
        telefono: formData.telefono || "",
        generoId: formData.generoId || 0,
        estadoCivilId: formData.estadoCivilId || "",
        curp: formData.curp || "",
        nss: formData.nss || "",
      },
    };
    setFormData(finalData);
    agregarFiliacion(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/recursos_humanos/filiacion/guardarFiliacionEmpleado`,
      finalData
    );
  };

  // Campos del formulario
  const camposAfiliado = [
    //------------------------ Datos de la identidad ------------------------------
    { type: "divider", label: "Identidad" },
    {
      name: "curp",
      label: "CURP",
      type: "curp",
      placeholder: "Ingresa el CURP",
      required: true,
    },
    {
      name: "nss",
      label: "Número de seguridad social",
      type: "number",
      placeholder: "Ingresa el número de seguridad social",
      required: true,
    },
    {
      name: "claveCobro",
      label: "Clave de cobro",
      type: "text",
      placeholder: "Ingresa la clave de cobro",
      required: true,
    },
    {
      name: "folioCredencial",
      label: "Folio de la credencial de empleado",
      type: "text",
      placeholder: "Ingresa el folio de la credencial",
      required: true,
    },
    //------------------------- Datos del domicilio ---------------------------------
    { type: "divider", label: "Domicilio" },
    {
      name: "cp",
      label: "Código Postal",
      type: "number",
      placeholder: "Ingresa el código postal",
      required: true,
    },
    {
      name: "estadoNom",
      label: "Estado",
      type: "select",
      options: estadosMexico,
      placeholder: "Selecciona un estado",
      required: true,
    },
    {
      name: "nomMunicipio",
      label: "Municipio",
      type: "text",
      placeholder: "Ingresa el nombre del municipio",
      required: true,
    },
    {
      name: "nomLocalidad",
      label: "Localidad",
      type: "text",
      placeholder: "Ingresa el nombre de la localidad",
      required: true,
    },
    {
      name: "numeroExterior",
      label: "Número exterior",
      type: "number",
      placeholder: "Ingresa el número exterior",
      required: true,
    },
    {
      name: "numeroInterior",
      label: "Número interior",
      type: "number",
      placeholder: "Ingresa el número interior",
    },
    {
      name: "lugarDomicilio",
      label: "Lugar",
      type: "text",
      placeholder: "Ingresa el lugar",
      required: true,
    },
    //-------------------------------- Educación -----------------------------
    { type: "divider", label: "Educación" },
    {
      name: "cedula",
      label: "Cedula",
      type: "text",
      placeholder: "Ingresa la cedula",
      required: true,
    },
    {
      name: "anioEgreso",
      label: "Año de egreso",
      type: "year",
      placeholder: "Ingresa el año de egreso",
      required: true,
    },
    {
      name: "nivelMaximoDeEstudiosId",
      label: "Nivel máximo de estudios",
      type: "select",
      options: nivelDeEstudios,
      placeholder: "Selecciona un nivel de estudios",
      required: true,
    },
    {
      name: "escuelaEgreso",
      label: "Escuela de egreso",
      type: "text",
      placeholder: "Ingresa la escuela de egreso",
      required: true,
    },
    {
      name: "area",
      label: "Área",
      type: "number",
      placeholder: "Ingresa el área",
      required: true,
    },
    {
      name: "actInact",
      label: "Activo",
      type: "text",
      placeholder: "Ingresa el estado de actividad",
      maxLength: 1,
      required: true,
    },
    //-------------------------- Padres ----------------------------------
    { type: "divider", label: "Padres" },
    {
      name: "nombrePadre",
      label: "Nombre del padre",
      type: "text",
      placeholder: "Ingresa el nombre del padre",
      required: true,
    },
    {
      name: "nombreMadre",
      label: "Nombre de la madre",
      type: "text",
      placeholder: "Ingresa el nombre de la madre",
      required: true,
    },
    //----------------------- Estado civil -----------------------------
    { type: "divider", label: "Estado civil" },
    {
      name: "estadoCivilId",
      label: "Estado civil",
      type: "select",
      options: estadosCivil,
      placeholder: "Selecciona un estado",
      required: true,
    },
    {
      name: "nombreConyuge",
      label: "Nombre del conyuge",
      type: "text",
      placeholder: "Ingresa el nombre del conyuge",
    },
    //------------------------- Datos del nacimiento ------------------------------
    { type: "divider", label: "Datos de nacimiento" },
    {
      name: "lugarNacimiento",
      label: "Lugar de nacimiento",
      type: "text",
      placeholder: "Ingresa el lugar de nacimiento",
      required: true,
    },
    {
      name: "poblacion",
      label: "Población",
      type: "text",
      placeholder: "Ingresa la población",
      required: true,
    },
    {
      name: "fecha",
      label: "Fecha de nacimiento",
      type: "date",
      placeholder: "Ingresa la fecha de nacimiento",
      required: true,
    },
    {
      name: "actaNum",
      label: "Número de acta",
      type: "number",
      placeholder: "Ingresa el número de la acta",
      required: true,
    },
    {
      name: "actaFoja",
      label: "FOJA",
      type: "number",
      placeholder: "Ingresa el FOJA",
      required: true,
    },
    {
      name: "actaLlibro",
      label: "Libro",
      type: "number",
      placeholder: "Ingresa el libro",
      required: true,
    },
    //--------------------Cartilla Militar------------------------------
    { type: "divider", label: "Cartilla militar (opcional)" },
    {
      name: "cartillaNum",
      label: "Cartilla SNM",
      type: "number",
      placeholder: "Ingresa el número de cartilla",
    },
    {
      name: "cartillaClase",
      label: "Clase de cartilla",
      type: "text",
      placeholder: "Ingresa la clase de la cartilla",
    },
    //--------------------- Documentación --------------------------
    { type: "divider", label: "Documentación" },
    {
      name: "documento",
      label: "Documento",
      type: "text",
      placeholder: "Ingresa el documento",
    },
    {
      name: "doctoMigratorio",
      label: "Documento migratorio",
      type: "text",
      placeholder: "Ingresa el documento migratorio",
    },
    //------------------------- Centro de trabajo ------------------------------
    { type: "divider", label: "Asignación del centro de trabajo" },
    {
      name: "lugar",
      label: "Lugar de filiación",
      type: "text",
      placeholder: "Ingresa el lugar",
      required: true,
    },
    {
      name: "centroTrabajoId",
      label: "Centro de trabajo",
      type: "select",
      options: tipoCentros,
      placeholder: "Selecciona una opción",
      required: true,
    },
    //-------------------------- Características de la pesona -------------------------
    { type: "divider", label: "Características de la persona" },
    {
      name: "generoId",
      label: "Género",
      type: "select",
      options: generos,
      placeholder: "Selecciona un género",
      required: true,
    },
    {
      name: "color",
      label: "Pigmentación",
      type: "text",
      placeholder: "Ingresa la pigmentación",
      required: true,
    },
    {
      name: "pelo",
      label: "Pelo",
      type: "text",
      placeholder: "Ingresa las características del pelo",
      required: true,
    },
    {
      name: "cejas",
      label: "Cejas",
      type: "text",
      placeholder: "Ingresa las características de las cejas",
      required: true,
    },
    {
      name: "frente",
      label: "Frente",
      type: "text",
      placeholder: "Ingresa las características de la frente",
      required: true,
    },
    {
      name: "ojos",
      label: "Ojos",
      type: "text",
      placeholder: "Ingresa las características de los ojos",
      required: true,
    },
    {
      name: "boca",
      label: "Boca",
      type: "text",
      placeholder: "Ingresa las características de la boca",
      required: true,
    },
    {
      name: "nariz",
      label: "Nariz",
      type: "text",
      placeholder: "Ingresa las características de la nariz",
      required: true,
    },
    {
      name: "estatura",
      label: "Estatura",
      type: "number",
      placeholder: "Ingresa la estatura",
      required: true,
      decimal: true
    },
    {
      name: "sePartVisible",
      label: "Señas particulares visibles",
      type: "textarea",
      placeholder: "Ingresa las señas particulares visibles",
      required: true,
    },
  ];

  const camposReferencias = [
    //------------------------ Referencia 1 --------------------------------------
    { type: "divider", label: "Referencia 1" },
    {
      name: "referAmi1",
      label: "Nombre",
      type: "text",
      placeholder: "Ingresa el nombre",
      required: true,
    },
    {
      name: "domAmi1",
      label: "Domicilio",
      type: "text",
      placeholder: "Ingresa el domicilio",
      required: true,
    },
    {
      name: "lugarAmi1",
      label: "Lugar",
      type: "text",
      placeholder: "Ingresa el lugar",
      required: true,
    },
    {
      name: "telAmi1",
      label: "Teléfono",
      type: "tel",
      placeholder: "Ingresa el teléfono",
      required: true,
    },
    //------------------------------- Referencia 2 --------------------------------------
    { type: "divider", label: "Referencia 2" },
    {
      name: "referAmi2",
      label: "Nombre",
      type: "text",
      placeholder: "Ingresa el nombre",
      required: true,
    },
    {
      name: "domAmi2",
      label: "Domicilio",
      type: "text",
      placeholder: "Ingresa el domicilio",
      required: true,
    },
    {
      name: "lugarAmi2",
      label: "Lugar",
      type: "text",
      placeholder: "Ingresa el lugar",
      required: true,
    },
    {
      name: "telAmi2",
      label: "Teléfono",
      type: "tel",
      placeholder: "Ingresa el teléfono",
      required: true,
    },
  ];

  const camposParientes = [
    //------------------------------------ Pariente 1 --------------------------------------
    { type: "divider", label: "Pariente 1" },
    {
      name: "referPari1",
      label: "Nombre",
      type: "text",
      placeholder: "Ingresa el nombre",
      required: true,
    },
    {
      name: "domiParo1",
      label: "Domicilio",
      type: "text",
      placeholder: "Ingresa el domicilio",
      required: true,
    },
    {
      name: "lugarPari1",
      label: "Lugar",
      type: "text",
      placeholder: "Ingresa el lugar",
      required: true,
    },
    {
      name: "telPari1",
      label: "Teléfono",
      type: "tel",
      placeholder: "Ingresa el teléfono",
      required: true,
    },
    //--------------------------------- Pariente 2 --------------------------------------
    { type: "divider", label: "Pariente 2" },
    {
      name: "referPari2",
      label: "Nombre",
      type: "text",
      placeholder: "Ingresa el nombre",
      required: true,
    },
    {
      name: "domiParo2",
      label: "Domicilio",
      type: "text",
      placeholder: "Ingresa el domicilio",
      required: true,
    },
    {
      name: "lugarPari2",
      label: "Lugar",
      type: "text",
      placeholder: "Ingresa el lugar",
      required: true,
    },
    {
      name: "telPari2",
      label: "Teléfono",
      type: "tel",
      placeholder: "Ingresa el teléfono",
      required: true,
    },
  ];

  // Función que crea los campos con valores por defecto
  const crearCampos = (fields) =>
    fields.map((field) => ({
      ...field,
      defaultValue: "",
    }));

  // Campos para el formulario de creación
  const camposCrearAfiliado = crearCampos(camposAfiliado);
  const camposCrearReferencias = crearCampos(camposReferencias);
  const camposCrearParientes = crearCampos(camposParientes);

  // Vistas de las Tabs
  const items = [
    {
      key: "1",
      label: "Datos del afiliado",
      children: (
        <CustomForm
          fields={camposCrearAfiliado}
          onSubmit={handleNextTab}
          onChange={handleFormChange}
          buttonText="Siguiente"
        />
      ),
      disabled: !enabledTabs.includes("1"),
    },
    {
      key: "2",
      label: "Referencias",
      children: (
        <CustomForm
          fields={camposCrearReferencias}
          onSubmit={handleNextTab}
          onChange={handleFormChange}
          buttonText="Siguiente"
        />
      ),
      disabled: !enabledTabs.includes("2"),
    },
    {
      key: "3",
      label: "Parientes",
      children: (
        <CustomForm
          fields={camposCrearParientes}
          onSubmit={handleSave}
          onChange={handleFormChange}
          buttonText="Guardar"
        />
      ),
      disabled: !enabledTabs.includes("3"),
    },
  ];

  // Se obtienen las listas para los campos de select del formulario
  useEffect(() => {
    obtenerTiposCentrosDeTrabajo(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/recursos_humanos/centros-trabajo/obtenerTipoCentrosTrabajo`
    );

    obtenerEstadosCivil(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/recursos_humanos/persona/obtenerListaEstadoCivil`
    );

    obtenerNivelDeEstudios(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/recursos_humanos/nivelMaximoDeEstudios/obtenerListadoDeNivelMaximoEstudios`
    );

    obtenerGeneros(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/recursos_humanos/genero/obtenerGeneros`
    );
  }, []);

  // Actualizan los estados cuando hay una nueva respuesta del servidor
  useEffect(() => {
    if (responseTiposCentrosDeTrabajoObtenidos) {
      // Transformar la respuesta en el formato de opciones para el select
      const options = responseTiposCentrosDeTrabajoObtenidos.map((item) => ({
        value: item.idTipoCentroTrabajo,
        label: `${item.nivelEducativo} - ${item.modalidad}`,
      }));
      setTipoCentros(options);
    }

    if (responseEstadosCivilObtenidos) {
      // Transformar la respuesta en el formato de opciones para el select
      const options = responseEstadosCivilObtenidos.map((item) => ({
        value: item.id,
        label: `${item.descripcion}`,
      }));
      setEstadosCivil(options);
    }

    if (responseNivelDeEstudiosObtenidos) {
      // Transformar la respuesta en el formato de opciones para el select
      const options = responseNivelDeEstudiosObtenidos.map((item) => ({
        value: item.codigo,
        label: `${item.estudios}`,
      }));
      setNivelDeEstudios(options);
    }

    if (responseGenerosObtenidos) {
      // Transformar la respuesta en el formato de opciones para el select
      const options = responseGenerosObtenidos.map((item) => ({
        value: item.id,
        label: `${item.tipo}`,
      }));
      setGeneros(options);
    }

    if (responsePersonaObtenida) {
      setPersona(responsePersonaObtenida);
    }
  }, [
    responseTiposCentrosDeTrabajoObtenidos,
    responseEstadosCivilObtenidos,
    responseGenerosObtenidos,
    responseNivelDeEstudiosObtenidos,
    responsePersonaObtenida,
  ]);

  useEffect(() => {
    if (responseFiliacionAgregada!= null) {
      Swal.fire({
        title: "Se guardó la filiación correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      // Limpia los datos y reiniciar la pestaña activa y las pestañas habilitadas
      setActiveTab("1");
      setEnabledTabs(["1"]);
      setMostrarFormulario(false);
      setRFC("");
      setMostrarHojaDeFiliacion(true);
    } else if (errorFiliacionAgregada) {
      Swal.fire({
        title: "Hubo un error al guardar al guardar la filiación",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  }, [
    loadingFiliacionAgregada,
    responseFiliacionAgregada,
    errorFiliacionAgregada,
  ]);

  return (
    <>
      <Card title="Validar RFC">
        <div className="row">
          <div className="col-sm-12 col-md-3 p-3 right-line">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <form onSubmit={handleSubmitRFC} className="form-empleado">
                <input
                  type="text"
                  placeholder="Ingrese el RFC"
                  value={rfc}
                  onChange={(e) => setRFC(e.target.value.toUpperCase())} // Convierte a mayúsculas
                  className={ `input-buscar-rfc ${rfcError ? "input-error" : ""}`}
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
            <h5>Datos Generales</h5>
            <p className="m-0">RFC: {persona?.rfc}</p>
            <p className="m-0">Nombre: {persona?.nombre}</p>
            <p className="m-0">Tipo de persona: {persona?.tipoPersona}</p>
            <p className="m-0">Teléfono: {persona?.contacto?.movil}</p>
            <p className="m-0">
              Correo electrónico: {persona?.contacto?.email}
            </p>
          </div>
        </div>
      </Card>
      {mostrarFormulario && (
        <Card title="Filiación">
          <Tabs activeKey={activeTab} onChange={setActiveTab} items={items} />
        </Card>
      )}
      {mostrarHojaDeFiliacion && (
        <div className="center-card">
          <div>
            <ReactToPrint
              trigger={() => <button>Print this out!</button>}
              content={() => componentRef.current}
            />
            <ShadowComponent>
              <HojaDeFiliacion dataFiliacion={formData} persona={persona} ref={componentRef} />
            </ShadowComponent>
          </div>
        </div>
      )}
    </>
  );
};
