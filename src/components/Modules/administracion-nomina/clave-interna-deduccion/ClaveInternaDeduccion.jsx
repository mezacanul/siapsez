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

const ClaveInternaDeduccion = () => {
    const [ClaveInternaDeduccion, setClaveInternaDeduccion] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    // Estado para controlar la visibilidad del modal de eliminación
    const [openModalEliminar, setOpenModalEliminar] = useState(false);
  
    // Estado para manejar la información actual de una clave interna en edición/eliminación
    const [currentInfo, setCurrentInfo] = useState(false);
  
    // Estado para manejar el tipo de renderización (0 = tabla, 1 = agregar, 2 = editar)
    const [typeRender, setTypeRender] = useState(0);
  
    // Custom hooks
    const {
      getData: obtenerClaveInternaDeduccion,
      loading: loadingClaveInternaDeduccionObtenidos,
      error: errorClaveInternaDeduccionObtenidos,
      response: responseClaveInternaDeduccionObtenidos,
    } = useGetRequest();
  
    const {
      postData: agregarClaveInternaDeduccion,
      response: responseClaveInternaDeduccionAgregado,
      loading: loadingClaveInternaDeduccionAgregado,
      error: errorClaveInternaDeduccionAgregado,
    } = usePostRequest();
  
    const {
      postData: eliminarClaveInternaDeduccion,
      response: responseClaveInternaDeduccionEliminado,
      loading: loadingClaveInternaDeduccionEliminado,
      error: errorClaveInternaDeduccionEliminado,
    } = usePostRequest();
  
    // Muestra el formulario para agregar un nueva clave interna.
    const showFormAgregar = () => {
      setTypeRender(1);
    };
  
    const formAgregar = () => {
      return showFormAgregar();
    };
  
    // Muestra el formulario para editar una clave interna existente.
    const showFormActualizar = (info) => {
      setCurrentInfo(info);
      setTypeRender(2);
    };
  
    // Muestra el modal de confirmación para eliminar una clave interna
    const showModalEliminar = (info) => {
      setCurrentInfo(info);
      setOpenModalEliminar(true);
    };
  
    // Envía los datos del formulario para agregar una clave interna
    const handleAgregar = async (claveInternaDeduccion) => {
      agregarClaveInternaDeduccion(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/nomina-clave-interna-percepcion/guardarClaveInternaDeduccion`,
        claveInternaDeduccion
      );
    };
  
    const handleActualizar = async (claveInternaDeduccion) => {
      // Asegúrate de incluir el id de ClaveInternaDeduccion en los datos que se envían
      const claveInternaDeduccionActualizado = {
        ...claveInternaDeduccion,
        id: currentInfo.id,
      };
  
      setIsEdit(true);
  
      // Envía los datos al servidor
      agregarClaveInternaDeduccion(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/nomina-clave-interna-deduccion/guardarClaveInternaDeduccion`,
        claveInternaDeduccionActualizado
      );
    };
  
    // Envía el id de la clave interna para eliminarlo
    const handleEliminar = () => {
      console.log(currentInfo);
      eliminarClaveInternaDeduccion(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/nomina-clave-interna-deduccion/eliminarClaveInternaDeduccionPorId/${
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
        placeholder: "Ingresa la clave interna de la deducción",
        required: true,
      },
      {
        name: "descripcion",
        label: "Descripción",
        type: "text",
        placeholder: "Ingresa la descripción de la deducción",
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
      obtenerClaveInternaDeduccion(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/nomina-clave-interna-deduccion/obtenerClaveInternaDeduccion`
      );
    }, []);
  
    // Actualiza el estado de 'data' cuando hay una nueva respuesta del servidor
    useEffect(() => {
      if (responseClaveInternaDeduccionObtenidos) {
        setClaveInternaDeduccion(responseClaveInternaDeduccionObtenidos);
      }
    }, [responseClaveInternaDeduccionObtenidos]);
  
    useEffect(() => {
      if (!loadingClaveInternaDeduccionAgregado) {
        if (responseClaveInternaDeduccionAgregado) {
          // Mostrar mensaje según sea agregar o actualizar
          if (isEdit) {
            Swal.fire({
              title: "Clave interna de deducción actualizado correctamente",
              icon: "success",
              confirmButtonText: "Aceptar",
            });
  
            // Actualizar el estado con los nuevos datos actualizados
            setClaveInternaDeduccion((prevData) =>
              prevData.map((item) =>
                item.id === responseClaveInternaDeduccionAgregado.id
                  ? responseClaveInternaDeduccionAgregado
                  : item
              )
            );
            setIsEdit(false);
          } else {
            Swal.fire({
              title: "Se guardó la clave interna de deducción",
              icon: "success",
              confirmButtonText: "Aceptar",
            });
  
            // Agregar el nuevo tipo al estado
            setClaveInternaDeduccion((prevData) => [...prevData, responseClaveInternaDeduccionAgregado]);
          }
  
          setTypeRender(0); // Volver a la vista de tabla
        } else if (errorClaveInternaDeduccionAgregado) {
          console.log(errorClaveInternaDeduccionAgregado);
          Swal.fire({
            title: "Hubo un error al guardar la clave interna de deducción",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        }
      }
    }, [loadingClaveInternaDeduccionAgregado, responseClaveInternaDeduccionAgregado, errorClaveInternaDeduccionAgregado]);
  
    useEffect(() => {
      if (!loadingClaveInternaDeduccionEliminado) {
        if (responseClaveInternaDeduccionEliminado) {
          Swal.fire({
            title: "Se eliminó la clave interna de deducción",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          setClaveInternaDeduccion((prevData) =>
            prevData.filter(
              (item) => item.id
              !== currentInfo.id
            )
          );
          handleCancel();
        } else if (errorClaveInternaDeduccionEliminado) {
          console.log(errorClaveInternaDeduccionEliminado);
          Swal.fire({
            title: "Hubo un error al eliminar la clave interna de deducción",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        }
      }
    }, [loadingClaveInternaDeduccionEliminado, responseClaveInternaDeduccionEliminado, errorClaveInternaDeduccionEliminado]);

  return (
    <>
    <Card
        title={
          typeRender === 1
            ? "Agregar clave interna de deducción"
            : typeRender === 2
            ? "Editar clave interna de deducción"
            : "Claves internas de deducción"
        }
        back={typeRender === 1 || typeRender === 2 ? handleBack : null}
        show={typeRender === 0 }
      >
        {typeRender === 0 && (
          <Table
            buttonName={"Nueva clave interna de deducción"}
            tableDesign={"clave-interna-deduccion"}
            data={ClaveInternaDeduccion}
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
        title={"Eliminar clave interna de deducción"}
        messageButtonOk={"Eliminar"}
      >
        <p>¿Estás seguro que quieres eliminar la clave interna de deducción?</p>
      </CustomModal>
    </>
  )
}

export default ClaveInternaDeduccion