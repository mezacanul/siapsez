import React, { useEffect, useState } from "react";
import Card from "../../../utilities/card/Card";
import Table from "../../../utilities/table/Table";
import useGetRequest from "../../../../hooks/useGetRequest";
import usePostRequest from "../../../../hooks/usePostRequest";
import "./centrosDeTrabajo.css";
import { IconButton } from "@mui/material";
import { Dropdown, Space } from "antd";
import CustomModal from "../../../utilities/modal/CustomModal";
import CustomForm from "../../../utilities/form/CustomForm";
import { CgMoreVertical } from "react-icons/cg";
import Swal from "sweetalert2";

const CentrosDeTrabajo = () => {
  // Estado para manejar la data obtenida de los centros de trabajo
  const [centrosDeTrabajo, setCentrosDeTrabajo] = useState();
  const [tipoCentros, setTipoCentros] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  // Estado para controlar la visibilidad del modal de eliminación
  const [openModalEliminar, setOpenModalEliminar] = useState(false);

  // Estado para manejar la información actual de un centro de trabajo en edición/eliminación
  const [currentInfo, setCurrentInfo] = useState(false);

  // Estado para manejar el tipo de renderización (0 = tabla, 1 = agregar, 2 = editar)
  const [typeRender, setTypeRender] = useState(0);

  // Custom hooks
  const {
    getData: obtenerCentrosDeTrabajo,
    loading: loadingCentrosDeTrabajoObtenidos,
    error: errorCentrosDeTrabajoObtenidos,
    response: responseCentrosDeTrabajoObtenidos,
  } = useGetRequest();

  const {
    getData: obtenerTiposCentrosDeTrabajo,
    loading: loadingTiposCentrosDeTrabajoObtenidos,
    error: errorTiposCentrosDeTrabajoObtenidos,
    response: responseTiposCentrosDeTrabajoObtenidos,
  } = useGetRequest();

  const {
    postData: agregarCentroDeTrabajo,
    response: responseCentroDeTrabajoAgregado,
    loading: loadingCentroDeTrabajoAgregado,
    error: errorCentroDeTrabajoAgregado,
  } = usePostRequest();

  const {
    postData: eliminarCentroDeTrabajo,
    response: responseCentroDeTrabajoEliminado,
    loading: loadingCentroDeTrabajoEliminado,
    error: errorCentroDeTrabajoEliminado,
  } = usePostRequest();

  // Muestra el formulario para agregar un nuevo centro de trabajo.
  const showFormAgregar = () => {
    setTypeRender(1);
  };

  const formAgregar = () => {
    return showFormAgregar();
  };

  // Muestra el formulario para editar un centro de trabajo existente.
  const showFormActualizar = (info) => {
    setCurrentInfo(info);
    setTypeRender(2);
  };

  // Muestra el modal de confirmación para eliminar un centro de trabajo.
  const showModalEliminar = (info) => {
    setCurrentInfo(info);
    setOpenModalEliminar(true);
  };

  // Envía los datos del formulario para agregar un nuevo centro de trabajo
  const handleAgregar = async (dataCentroAgregado) => {
    agregarCentroDeTrabajo(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/recursos_humanos/escuelas/guardarEscuela`,
      dataCentroAgregado
    );
  };

  const handleActualizar = async (dataCentroAgregado) => {
    // Asegúrate de incluir el idCentroTrabajo en los datos que se envían
    const dataCentroActualizado = {
      ...dataCentroAgregado,
      id: currentInfo.id,
    };

    setIsEdit(true);

    // Envía los datos al servidor
    agregarCentroDeTrabajo(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/recursos_humanos/escuelas/guardarEscuela`,
      dataCentroActualizado
    );
  };

  // Envía el id del centro de trabajo para eliminarlo
  const handleEliminar = () => {
    eliminarCentroDeTrabajo(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/recursos_humanos/escuelas/eliminarEscuelaPorId/${
        currentInfo.id
      }`
    );
  };

  // Cancela la eliminación y cierra el modal de confirmación.
  const handleCancel = () => {
    setOpenModalEliminar(false);
  };

  const handleBack = () => {
    setTypeRender(0);
  };

  // Definición de columnas de la tabla
  const columns = [
    {
      header: "Numero de alumnos",
      accessorKey: "numeroAlumnos",
      filterFn: "includesString",
    },
    {
      header: "Numero de grupos",
      accessorKey: "numeroGrupos",
      filterFn: "includesString",
    },
    {
      header: "Clave CT",
      accessorKey: "claveCT",
      filterFn: "includesString",
    },
    {
      header: "Nombre de la escuela",
      accessorKey: "nombreEscuela",
      filterFn: "includesString",
    },
    {
      header: "Servicio educativo",
      accessorKey: "servicioEducativo",
      filterFn: "includesString",
    },
    {
      header: "Estatus de la escuela",
      accessorKey: "estatusEscuela",
      filterFn: "includesString",
    },
    {
      header: "Número de región educativa",
      accessorKey: "numeroRegionEducativa",
      filterFn: "includesString",
    },
    {
      header: "Número de zona escolar",
      accessorKey: "numeroZonaEscolar",
      filterFn: "includesString",
    },
    {
      header: "Clave CT de región educativa",
      accessorKey: "claveCtRegionEducativa",
      filterFn: "includesString",
    },
    {
      header: "Clave CT de supervisión",
      accessorKey: "claveCtSupervision",
      filterFn: "includesString",
    },
    {
      header: "Nombre del municipio",
      accessorKey: "nombreMunicipio",
      filterFn: "includesString",
    },
    {
      header: "Nombre de la localidad",
      accessorKey: "nombreLocalidad",
      filterFn: "includesString",
    },
    {
      header: "Clave CT del sistema",
      accessorKey: "sistemaCT",
      filterFn: "includesString",
    },
    {
      id: "actions",
      header: "Acciones",
      size: 30,
      cell: ({ row }) => {
        const items = [
          {
            label: (
              <a onClick={() => showFormActualizar(row.original)}>
                <i className="bi bi-pencil" /> Editar
              </a>
            ),
            key: "1",
          },
          {
            label: (
              <a onClick={() => showModalEliminar(row.original)}>
                <i className="bi bi-trash3" /> Eliminar
              </a>
            ),
            key: "2",
          },
        ];

        return (
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <IconButton type="link" className="button-options">
                  <CgMoreVertical />
                </IconButton>
              </Space>
            </a>
          </Dropdown>
        );
      },
    },
  ];

  // Campos del formulario
  const campos = [
    {
      name: "numeroAlumnos",
      label: "Número de alumnos",
      type: "number",
      placeholder: "Ingresa el número de alumnos",
      required: true,
    },
    {
      name: "numeroGrupos",
      label: "Número de grupos",
      type: "number",
      placeholder: "Ingresa el número de grupos",
      required: true,
    },
    {
      name: "claveCT",
      label: "Clave CT",
      type: "text",
      placeholder: "Ingresa la clave del centro de trabajo",
      required: true,
    },
    {
      name: "nombreEscuela",
      label: "Nombre de la escuela",
      type: "text",
      placeholder: "Ingresa el nombre de la escuela",
      required: true,
    },
    {
      name: "servicioEducativo",
      label: "Servicio educativo",
      type: "number",
      placeholder: "Ingresa número del servicio",
      required: true,
    },
    {
      name: "estatusEscuela",
      label: "Estatus de la escuela",
      type: "number",
      placeholder: "Ingresa el estatus de la escuela",
      required: true,
    },
    {
      name: "numeroRegionEducativa",
      label: "Número de región educativa",
      type: "text",
      placeholder: "Ingresa el número de región educativa",
      required: true,
    },
    {
      name: "numeroZonaEscolar",
      label: "Número de zona escolar",
      type: "text",
      placeholder: "Ingresa el número de zona escolar",
      required: true,
    },
    {
      name: "claveCtRegionEducativa",
      label: "Clave CT de región educativa",
      type: "text",
      placeholder: "Ingresa la clave de región educativa",
      required: true,
    },
    {
      name: "claveCtSupervision",
      label: "Clave CT de supervisión",
      type: "text",
      placeholder: "Ingresa la clave de supervisión",
      required: true,
    },
    {
      name: "nombreMunicipio",
      label: "Nombre del municipio",
      type: "text",
      placeholder: "Ingresa el nombre del municipio",
      required: true,
    },
    {
      name: "nombreLocalidad",
      label: "Nombre de la localidad",
      type: "text",
      placeholder: "Ingresa el nombre de la localidad",
      required: true,
    },
    {
      name: "sistemaCT",
      label: "Clave CT del sistema",
      type: "number",
      placeholder: "Ingresa la clave del sistema",
      required: true,
    },
    {
      name: "idTipoCentro",
      label: "Tipo de centro de trabajo",
      type: "select",
      options: tipoCentros,
      placeholder: "Selecciona una opción",
      required: true,
    },
  ];

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

  // Campos para los formularios de creación y edición
  const camposCrear = crearCampos(campos);
  const camposEditar = editarCampos(campos, currentInfo);

  // Hook para obtener los datos de los centros de trabajo cuando se monta el componente
  useEffect(() => {
    obtenerCentrosDeTrabajo(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/recursos_humanos/escuelas/obtenerEscuelas`
    );

    obtenerTiposCentrosDeTrabajo(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/recursos_humanos/centros-trabajo/obtenerTipoCentrosTrabajo`
    );
  }, []);

  // Actualiza el estado de 'data' cuando hay una nueva respuesta del servidor
  useEffect(() => {
    if (responseCentrosDeTrabajoObtenidos) {
      setCentrosDeTrabajo(responseCentrosDeTrabajoObtenidos);
    }
    if (responseTiposCentrosDeTrabajoObtenidos) {
      // Transformar la respuesta en el formato de opciones para el select
      const options = responseTiposCentrosDeTrabajoObtenidos.map((item) => ({
        value: item.idTipoCentroTrabajo,
        label: `${item.nivelEducativo} - ${item.modalidad}`,
      }));
      setTipoCentros(options);
    }
  }, [responseCentrosDeTrabajoObtenidos, responseTiposCentrosDeTrabajoObtenidos]);

  useEffect(() => {
    if (!loadingCentroDeTrabajoAgregado) {
      if (responseCentroDeTrabajoAgregado) {
        // Mostrar mensaje según sea agregar o actualizar
        if (isEdit) {
          Swal.fire({
            title: "Centro de trabajo actualizado correctamente",
            icon: "success",
            confirmButtonText: "Aceptar",
          });

          // Actualizar el estado con los nuevos datos actualizados
          setCentrosDeTrabajo((prevData) =>
            prevData.map((item) =>
              item.id === responseCentroDeTrabajoAgregado.id
                ? responseCentroDeTrabajoAgregado
                : item
            )
          );
          setIsEdit(false);
        } else {
          Swal.fire({
            title: "Se guardó el centro de trabajo correctamente",
            icon: "success",
            confirmButtonText: "Aceptar",
          });

          // Agregar el nuevo centro al estado
          setCentrosDeTrabajo((prevData) => [...prevData, responseCentroDeTrabajoAgregado]);
        }

        setTypeRender(0); // Volver a la vista de tabla
      } else if (errorCentroDeTrabajoAgregado) {
        console.log(errorCentroDeTrabajoAgregado);
        Swal.fire({
          title: "Hubo un error al guardar el centro de trabajo",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }
    }
  }, [loadingCentroDeTrabajoAgregado, responseCentroDeTrabajoAgregado, errorCentroDeTrabajoAgregado]);

  useEffect(() => {
    if (!loadingCentroDeTrabajoEliminado) {
      if (responseCentroDeTrabajoEliminado) {
        Swal.fire({
          title: "Se eliminó el centro de trabajo correctamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        setCentrosDeTrabajo((prevData) =>
          prevData.filter(
            (item) => item.id !== currentInfo.id
          )
        );
        handleCancel();
      } else if (errorCentroDeTrabajoEliminado) {
        console.log(errorCentroDeTrabajoEliminado);
        Swal.fire({
          title: "Hubo un error al eliminar el centro",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }
    }
  }, [loadingCentroDeTrabajoEliminado, responseCentroDeTrabajoEliminado, errorCentroDeTrabajoEliminado]);

  return (
    <>
      <Card
        title={
          typeRender === 1
            ? "Agregar escuela"
            : typeRender === 2
            ? "Editar escuela"
            : "Escuelas"
        }
        back={typeRender === 1 || typeRender === 2 ? handleBack : null}
        show={typeRender === 0 }
      >
        {typeRender === 0 && (
          <Table
            buttonName={"Nueva escuela"}
            tableDesign={"centros-trabajo"}
            data={centrosDeTrabajo}
            columns={columns}
            modalNewElement={formAgregar}
          />
        )}
        {typeRender === 1 && (
          <CustomForm
            onSubmit={handleAgregar}
            fields={camposCrear}
            buttonText="Guardar"
          />
        )}
        {typeRender === 2 && (
          <CustomForm
            onSubmit={handleActualizar}
            fields={camposEditar}
            buttonText="Guardar"
          />
        )}
      </Card>
      <CustomModal
        open={openModalEliminar}
        close={handleCancel}
        ok={handleEliminar}
        title={"Eliminar escuela"}
        messageButtonOk={"Eliminar"}
      >
        <p>¿Estás seguro que quieres eliminar la escuela?</p>
      </CustomModal>
    </>
  );
};

export default CentrosDeTrabajo;
