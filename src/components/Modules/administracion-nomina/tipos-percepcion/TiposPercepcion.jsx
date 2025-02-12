/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import Card from '../../../utilities/card/Card'
import Table from '../../../utilities/table/Table'
import CustomForm from '../../../utilities/form/CustomForm'
import CustomModal from '../../../utilities/modal/CustomModal'
import useGetRequest from "../../../../hooks/useGetRequest";
import usePostRequest from "../../../../hooks/usePostRequest";
//import "./centrosDeTrabajo.css";
import { IconButton } from "@mui/material";
import { Dropdown, Space } from "antd";
import { CgMoreVertical } from "react-icons/cg";
import Swal from "sweetalert2";

const TiposPercepcion = () => {
    const [tiposPercepcion, setTiposPercepcion] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    // Estado para controlar la visibilidad del modal de eliminación
    const [openModalEliminar, setOpenModalEliminar] = useState(false);
  
    // Estado para manejar la información actual de un centro de trabajo en edición/eliminación
    const [currentInfo, setCurrentInfo] = useState(false);
  
    // Estado para manejar el tipo de renderización (0 = tabla, 1 = agregar, 2 = editar)
    const [typeRender, setTypeRender] = useState(0);
  
    // Custom hooks
    const {
      getData: obtenerTiposPercepcion,
      loading: loadingTiposPercepcionObtenidos,
      error: errorTiposPercepcionObtenidos,
      response: responseTiposPercepcionObtenidos,
    } = useGetRequest();
  
    const {
      postData: agregarTipoPercepcion,
      response: responseTipoPercepcionAgregado,
      loading: loadingTipoPercepcionAgregado,
      error: errorTipoPercepcionAgregado,
    } = usePostRequest();
  
    const {
      postData: eliminarTipoPercepcion,
      response: responseTipoPercepcionEliminado,
      loading: loadingTipoPercepcionEliminado,
      error: errorTipoPercepcionEliminado,
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
    const handleAgregar = async (tipoPercepcion) => {
      agregarTipoPercepcion(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/nomina-tipos-percepcion/guardarTiposPercepcion`,
        tipoPercepcion
      );
    };
  
    const handleActualizar = async (tipoPercepcion) => {
      // Asegúrate de incluir el id de TipoPercepcion en los datos que se envían
      const tipoPercepcionActualizado = {
        ...tipoPercepcion,
        id: currentInfo.id,
      };
  
      setIsEdit(true);
  
      // Envía los datos al servidor
      agregarTipoPercepcion(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/nomina-tipos-percepcion/guardarTiposPercepcion`,
        tipoPercepcionActualizado
      );
    };
  
    // Envía el id del centro de trabajo para eliminarlo
    const handleEliminar = () => {
      console.log(currentInfo);
      eliminarTipoPercepcion(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/nomina-tipos-percepcion/eliminarTiposPercepcionPorId/${
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
        header: "#",
        accessorKey: "id",
        filterFn: "inNumberRange",
      },
      {
        header: "Clave SAT",
        accessorKey: "clave",
        filterFn: "includesString",
      },
      {
        header: "Descripción",
        accessorKey: "descripcion",
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
        name: "clave",
        label: "Clave SAT",
        type: "text",
        placeholder: "Ingresa la clave de la percepción",
        required: true,
      },
      {
        name: "descripcion",
        label: "Descripción",
        type: "text",
        placeholder: "Ingresa la descripción de la percepción",
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
      obtenerTiposPercepcion(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/nomina-tipos-percepcion/obtenerTiposPercepcion`
      );
    }, []);
  
    // Actualiza el estado de 'data' cuando hay una nueva respuesta del servidor
    useEffect(() => {
      if (responseTiposPercepcionObtenidos) {
        setTiposPercepcion(responseTiposPercepcionObtenidos);
      }
    }, [responseTiposPercepcionObtenidos]);
  
    useEffect(() => {
      if (!loadingTipoPercepcionAgregado) {
        if (responseTipoPercepcionAgregado) {
          // Mostrar mensaje según sea agregar o actualizar
          if (isEdit) {
            Swal.fire({
              title: "Tipo de percepción actualizado correctamente",
              icon: "success",
              confirmButtonText: "Aceptar",
            });
  
            // Actualizar el estado con los nuevos datos actualizados
            setTiposPercepcion((prevData) =>
              prevData.map((item) =>
                item.id === responseTipoPercepcionAgregado.id
                  ? responseTipoPercepcionAgregado
                  : item
              )
            );
            setIsEdit(false);
          } else {
            Swal.fire({
              title: "Se guardó el tipo de percepción",
              icon: "success",
              confirmButtonText: "Aceptar",
            });
  
            // Agregar el nuevo tipo al estado
            setTiposPercepcion((prevData) => [...prevData, responseTipoPercepcionAgregado]);
          }
  
          setTypeRender(0); // Volver a la vista de tabla
        } else if (errorTipoPercepcionAgregado) {
          console.log(errorTipoPercepcionAgregado);
          Swal.fire({
            title: "Hubo un error al guardar el tipo de percepción",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        }
      }
    }, [loadingTipoPercepcionAgregado, responseTipoPercepcionAgregado, errorTipoPercepcionAgregado]);
  
    useEffect(() => {
      if (!loadingTipoPercepcionEliminado) {
        if (responseTipoPercepcionEliminado) {
          Swal.fire({
            title: "Se eliminó el tipo de percepción",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          setTiposPercepcion((prevData) =>
            prevData.filter(
              (item) => item.id
              !== currentInfo.id
            )
          );
          handleCancel();
        } else if (errorTipoPercepcionEliminado) {
          console.log(errorTipoPercepcionEliminado);
          Swal.fire({
            title: "Hubo un error al eliminar el tipo de percepción",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        }
      }
    }, [loadingTipoPercepcionEliminado, responseTipoPercepcionEliminado, errorTipoPercepcionEliminado]);

  return (
    <>
    <Card
        title={
          typeRender === 1
            ? "Agregar tipo de percepción"
            : typeRender === 2
            ? "Editar tipo de percepción"
            : "Tipos de percepción"
        }
        back={typeRender === 1 || typeRender === 2 ? handleBack : null}
        show={typeRender === 0 }
      >
        {typeRender === 0 && (
          <Table
            buttonName={"Nuevo tipo de percepción"}
            tableDesign={"tipos-percepcion"}
            data={tiposPercepcion}
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
        title={"Eliminar tipo de percepción"}
        messageButtonOk={"Eliminar"}
      >
        <p>¿Estás seguro que quieres eliminar el tipo de percepción?</p>
      </CustomModal>
    </>
  )
}

export default TiposPercepcion