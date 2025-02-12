import React, { useEffect, useState } from 'react'
import Card from '../../../utilities/card/Card'
import Table from '../../../utilities/table/Table'
import CustomForm from '../../../utilities/form/CustomForm'
import CustomModal from '../../../utilities/modal/CustomModal'
import useGetRequest from "../../../../hooks/useGetRequest";
import usePostRequest from "../../../../hooks/usePostRequest";
import "./centrosDeTrabajo.css";
import { IconButton } from "@mui/material";
import { Dropdown, Space } from "antd";
import { CgMoreVertical } from "react-icons/cg";
import Swal from "sweetalert2";

const TiposCentrosDeTrabajo = () => {
    const [tiposCentrosDeTrabajo, setTiposCentrosDeTrabajo] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    // Estado para controlar la visibilidad del modal de eliminación
    const [openModalEliminar, setOpenModalEliminar] = useState(false);
  
    // Estado para manejar la información actual de un centro de trabajo en edición/eliminación
    const [currentInfo, setCurrentInfo] = useState(false);
  
    // Estado para manejar el tipo de renderización (0 = tabla, 1 = agregar, 2 = editar)
    const [typeRender, setTypeRender] = useState(0);
  
    // Custom hooks
    const {
      getData: obtenerTiposCentrosDeTrabajo,
      loading: loadingTiposCentrosDeTrabajoObtenidos,
      error: errorTiposCentrosDeTrabajoObtenidos,
      response: responseTiposCentrosDeTrabajoObtenidos,
    } = useGetRequest();
  
    const {
      postData: agregarTipoCentroDeTrabajo,
      response: responseTipoCentroDeTrabajoAgregado,
      loading: loadingTipoCentroDeTrabajoAgregado,
      error: errorTipoCentroDeTrabajoAgregado,
    } = usePostRequest();
  
    const {
      postData: eliminarTipoCentroDeTrabajo,
      response: responseTipoCentroDeTrabajoEliminado,
      loading: loadingTipoCentroDeTrabajoEliminado,
      error: errorTipoCentroDeTrabajoEliminado,
    } = usePostRequest();
  
    // Muestra el formulario para agregar un nuevo tipo centro de trabajo.
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
    const handleAgregar = async (tipoCentroDeTrabajo) => {
      agregarTipoCentroDeTrabajo(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/centros-trabajo/guardarTipoCentroTrabajo`,
        tipoCentroDeTrabajo
      );
    };
  
    const handleActualizar = async (tipoCentroDeTrabajo) => {
      // Asegúrate de incluir el idCentroTrabajo en los datos que se envían
      const tipoCentroDeTrabajoActualizado = {
        ...tipoCentroDeTrabajo,
        idTipoCentroTrabajo: currentInfo.idTipoCentroTrabajo,
      };
  
      setIsEdit(true);
  
      // Envía los datos al servidor
      agregarTipoCentroDeTrabajo(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/centros-trabajo/guardarTipoCentroTrabajo`,
        tipoCentroDeTrabajoActualizado
      );
    };
  
    // Envía el id del centro de trabajo para eliminarlo
    const handleEliminar = () => {
      eliminarTipoCentroDeTrabajo(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/centros-trabajo/eliminarTipoCentroTrabajoPorId/${
          currentInfo.idTipoCentroTrabajo
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
        header: "Nivel educativo",
        accessorKey: "nivelEducativo",
        filterFn: "includesString",
      },
      {
        header: "Modalidad",
        accessorKey: "modalidad",
        filterFn: "includesString",
      },
      {
        header: "Alumnos por grupo",
        accessorKey: "alumnosXGrupo",
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
        name: "nivelEducativo",
        label: "Nivel educativo",
        type: "select",
        options: [
          {value:"Preescolar", label: "Preescolar"},
          {value:"Primaria", label: "Primaria"},
          {value:"Secundaria", label: "Secundaria"},
          {value:"Bachillerato", label: "Bachillerato"},
          {value:"Universidad", label: "Universidad"},
        ],
        placeholder: "Selecciona una opción",
        required: true,
      },
      {
        name: "modalidad",
        label: "Ingresa la modalidad",
        type: "select",
        options: [
          {value:"En línea", label: "En línea"},
          {value:"Presencial", label: "Presencial"},
          {value:"Híbrido", label: "Híbrido"},
        ],
        placeholder: "Selecciona una opción",
        required: true,
      },
      {
        name: "alumnosXGrupo",
        label: "Número de alumnos por grupo",
        type: "number",
        placeholder: "Ingresa el número de alumnos por grupo",
        required: true,
      }
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
      obtenerTiposCentrosDeTrabajo(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/centros-trabajo/obtenerTipoCentrosTrabajo`
      );
    }, []);
  
    // Actualiza el estado de 'data' cuando hay una nueva respuesta del servidor
    useEffect(() => {
      if (responseTiposCentrosDeTrabajoObtenidos) {
        setTiposCentrosDeTrabajo(responseTiposCentrosDeTrabajoObtenidos);
      }
    }, [responseTiposCentrosDeTrabajoObtenidos]);
  
    useEffect(() => {
      if (!loadingTipoCentroDeTrabajoAgregado) {
        if (responseTipoCentroDeTrabajoAgregado) {
          // Mostrar mensaje según sea agregar o actualizar
          if (isEdit) {
            Swal.fire({
              title: "Tipo de centro de trabajo actualizado correctamente",
              icon: "success",
              confirmButtonText: "Aceptar",
            });
  
            // Actualizar el estado con los nuevos datos actualizados
            setTiposCentrosDeTrabajo((prevData) =>
              prevData.map((item) =>
                item.idTipoCentroTrabajo === responseTipoCentroDeTrabajoAgregado.idTipoCentroTrabajo
                  ? responseTipoCentroDeTrabajoAgregado
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
            setTiposCentrosDeTrabajo((prevData) => [...prevData, responseTipoCentroDeTrabajoAgregado]);
          }
  
          setTypeRender(0); // Volver a la vista de tabla
        } else if (errorTipoCentroDeTrabajoAgregado) {
          console.log(errorTipoCentroDeTrabajoAgregado);
          Swal.fire({
            title: "Hubo un error al guardar el tipo de centro de trabajo",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        }
      }
    }, [loadingTipoCentroDeTrabajoAgregado, responseTipoCentroDeTrabajoAgregado, errorTipoCentroDeTrabajoAgregado]);
  
    useEffect(() => {
      if (!loadingTipoCentroDeTrabajoEliminado) {
        if (responseTipoCentroDeTrabajoEliminado) {
          Swal.fire({
            title: "Se eliminó el tipo de centro de trabajo correctamente",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          setTiposCentrosDeTrabajo((prevData) =>
            prevData.filter(
              (item) => item.idTipoCentroTrabajo
              !== currentInfo.idTipoCentroTrabajo
            )
          );
          handleCancel();
        } else if (errorTipoCentroDeTrabajoEliminado) {
          console.log(errorTipoCentroDeTrabajoEliminado);
          Swal.fire({
            title: "Hubo un error al eliminar el tipo de centro de trabajo",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        }
      }
    }, [loadingTipoCentroDeTrabajoEliminado, responseTipoCentroDeTrabajoEliminado, errorTipoCentroDeTrabajoEliminado]);

  return (
    <>
    <Card
        title={
          typeRender === 1
            ? "Agregar tipo de centro de trabajo"
            : typeRender === 2
            ? "Editar tipo de centro de trabajo"
            : "Tipos de centros de trabajo"
        }
        back={typeRender === 1 || typeRender === 2 ? handleBack : null}
        show={typeRender === 0 }
      >
        {typeRender === 0 && (
          <Table
            buttonName={"Nuevo tipo"}
            tableDesign={"centros-trabajo"}
            data={tiposCentrosDeTrabajo}
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
        title={"Eliminar centro de trabajo"}
        messageButtonOk={"Eliminar"}
      >
        <p>¿Estás seguro que quieres eliminar el tipo de centro de trabajo?</p>
      </CustomModal>
    </>
  )
}

export default TiposCentrosDeTrabajo