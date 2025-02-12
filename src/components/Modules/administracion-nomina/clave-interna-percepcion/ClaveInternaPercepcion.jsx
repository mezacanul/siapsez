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

const ClaveInternaPercepcion = () => {
    const [ClaveInternaPercepcion, setClaveInternaPercepcion] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    // Estado para controlar la visibilidad del modal de eliminación
    const [openModalEliminar, setOpenModalEliminar] = useState(false);
  
    // Estado para manejar la información actual de un centro de trabajo en edición/eliminación
    const [currentInfo, setCurrentInfo] = useState(false);
  
    // Estado para manejar el tipo de renderización (0 = tabla, 1 = agregar, 2 = editar)
    const [typeRender, setTypeRender] = useState(0);
  
    // Custom hooks
    const {
      getData: obtenerClaveInternaPercepcion,
      loading: loadingClaveInternaPercepcionObtenidos,
      error: errorClaveInternaPercepcionObtenidos,
      response: responseClaveInternaPercepcionObtenidos,
    } = useGetRequest();
  
    const {
      postData: agregarClaveInternaPercepcion,
      response: responseClaveInternaPercepcionAgregado,
      loading: loadingClaveInternaPercepcionAgregado,
      error: errorClaveInternaPercepcionAgregado,
    } = usePostRequest();
  
    const {
      postData: eliminarClaveInternaPercepcion,
      response: responseClaveInternaPercepcionEliminado,
      loading: loadingClaveInternaPercepcionEliminado,
      error: errorClaveInternaPercepcionEliminado,
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
    const handleAgregar = async (claveInternaPercepcion) => {
      agregarClaveInternaPercepcion(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/nomina-clave-interna-percepcion/guardarClaveInternaPercepcion`,
        claveInternaPercepcion
      );
    };
  
    const handleActualizar = async (claveInternaPercepcion) => {
      // Asegúrate de incluir el id de ClaveInternaPercepcion en los datos que se envían
      const claveInternaPercepcionActualizado = {
        ...claveInternaPercepcion,
        id: currentInfo.id,
      };
  
      setIsEdit(true);
  
      // Envía los datos al servidor
      agregarClaveInternaPercepcion(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/nomina-clave-interna-percepcion/guardarClaveInternaPercepcion`,
        claveInternaPercepcionActualizado
      );
    };
  
    // Envía el id del centro de trabajo para eliminarlo
    const handleEliminar = () => {
      console.log(currentInfo);
      eliminarClaveInternaPercepcion(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/nomina-clave-interna-percepcion/eliminarClaveInternaPercepcionPorId/${
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
        header: "Clave Interna",
        accessorKey: "clave_interna",
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
        name: "clave_interna",
        label: "Clave Interna",
        type: "text",
        placeholder: "Ingresa la clave interna de la percepción",
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
      obtenerClaveInternaPercepcion(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/nomina-clave-interna-percepcion/obtenerClaveInternaPercepcion`
      );
    }, []);
  
    // Actualiza el estado de 'data' cuando hay una nueva respuesta del servidor
    useEffect(() => {
      if (responseClaveInternaPercepcionObtenidos) {
        setClaveInternaPercepcion(responseClaveInternaPercepcionObtenidos);
      }
    }, [responseClaveInternaPercepcionObtenidos]);
  
    useEffect(() => {
      if (!loadingClaveInternaPercepcionAgregado) {
        if (responseClaveInternaPercepcionAgregado) {
          // Mostrar mensaje según sea agregar o actualizar
          if (isEdit) {
            Swal.fire({
              title: "Clave interna de percepción actualizado correctamente",
              icon: "success",
              confirmButtonText: "Aceptar",
            });
  
            // Actualizar el estado con los nuevos datos actualizados
            setClaveInternaPercepcion((prevData) =>
              prevData.map((item) =>
                item.id === responseClaveInternaPercepcionAgregado.id
                  ? responseClaveInternaPercepcionAgregado
                  : item
              )
            );
            setIsEdit(false);
          } else {
            Swal.fire({
              title: "Se guardó la clave interna de percepción",
              icon: "success",
              confirmButtonText: "Aceptar",
            });
  
            // Agregar el nuevo tipo al estado
            setClaveInternaPercepcion((prevData) => [...prevData, responseClaveInternaPercepcionAgregado]);
          }
  
          setTypeRender(0); // Volver a la vista de tabla
        } else if (errorClaveInternaPercepcionAgregado) {
          console.log(errorClaveInternaPercepcionAgregado);
          Swal.fire({
            title: "Hubo un error al guardar la clave interna de percepción",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        }
      }
    }, [loadingClaveInternaPercepcionAgregado, responseClaveInternaPercepcionAgregado, errorClaveInternaPercepcionAgregado]);
  
    useEffect(() => {
      if (!loadingClaveInternaPercepcionEliminado) {
        if (responseClaveInternaPercepcionEliminado) {
          Swal.fire({
            title: "Se eliminó la clave interna de percepción",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          setClaveInternaPercepcion((prevData) =>
            prevData.filter(
              (item) => item.id
              !== currentInfo.id
            )
          );
          handleCancel();
        } else if (errorClaveInternaPercepcionEliminado) {
          console.log(errorClaveInternaPercepcionEliminado);
          Swal.fire({
            title: "Hubo un error al eliminar la clave interna de percepción",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        }
      }
    }, [loadingClaveInternaPercepcionEliminado, responseClaveInternaPercepcionEliminado, errorClaveInternaPercepcionEliminado]);

  return (
    <>
    <Card
        title={
          typeRender === 1
            ? "Agregar clave interna de percepción"
            : typeRender === 2
            ? "Editar clave interna de percepción"
            : "Claves internas de percepción"
        }
        back={typeRender === 1 || typeRender === 2 ? handleBack : null}
        show={typeRender === 0 }
      >
        {typeRender === 0 && (
          <Table
            buttonName={"Nueva clave interna de percepción"}
            tableDesign={"clave-interna-percepcion"}
            data={ClaveInternaPercepcion}
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
        title={"Eliminar clave interna de percepción"}
        messageButtonOk={"Eliminar"}
      >
        <p>¿Estás seguro que quieres eliminar la clave interna de percepción?</p>
      </CustomModal>
    </>
  )
}

export default ClaveInternaPercepcion