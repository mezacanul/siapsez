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

const ConceptoDeduccion = () => {
    const [conceptoDeduccion , setConceptoDeduccion ] = useState([]);
    const [tipoDeduccion, setTipoDeduccion] = useState([]);
    const [claveIntDeduccion, setClaveIntDeduccion] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    // Estado para controlar la visibilidad del modal de eliminación
    const [openModalEliminar, setOpenModalEliminar] = useState(false);
  
    // Estado para manejar la información actual de un Concepto de Deduccion en edición/eliminación
    const [currentInfo, setCurrentInfo] = useState(false);
  
    // Estado para manejar el tipo de renderización (0 = tabla, 1 = agregar, 2 = editar)
    const [typeRender, setTypeRender] = useState(0);
  
    // Custom hooks
    const {
      getData: obtenerConceptoDeduccion ,
      loading: loadingConceptoDeduccionObtenidos,
      error: errorConceptoDeduccionObtenidos,
      response: responseConceptoDeduccionObtenidos,
    } = useGetRequest();

    const {
      getData: obtenerTipoDeduccion,
      loading: loadingTipoDeduccionObtenidos,
      error: errorTipoDeduccionObtenidos,
      response: responseTipoDeduccionObtenidos,
    } = useGetRequest();

    const {
      getData: obtenerClaveIntDeduccion,
      loading: loadingClaveIntDeduccionObtenidos,
      error: errorClaveIntDeduccionObtenidos,
      response: responseClaveIntDeduccionObtenidos,
    } = useGetRequest();
  
    const {
      postData: agregarConceptoDeduccion,
      response: responseConceptoDeduccionAgregado,
      loading: loadingConceptoDeduccionAgregado,
      error: errorConceptoDeduccionAgregado,
    } = usePostRequest();
  
    const {
      postData: eliminarConceptoDeduccion,
      response: responseConceptoDeduccionEliminado,
      loading: loadingConceptoDeduccionEliminado,
      error: errorConceptoDeduccionEliminado,
    } = usePostRequest();
  
    // Muestra el formulario para agregar un nuevo Concepto de Deduccion.
    const showFormAgregar = () => {
      setTypeRender(1);
    };
  
    const formAgregar = () => {
      return showFormAgregar();
    };
  
    // Muestra el formulario para editar un Concepto de Deduccion existente.
    const showFormActualizar = (info) => {
      setCurrentInfo(info);
      setTypeRender(2);
    };
  
    // Muestra el modal de confirmación para eliminar un Concepto de Deduccion
    const showModalEliminar = (info) => {
      setCurrentInfo(info);
      setOpenModalEliminar(true);
    };
  
    // Envía los datos del formulario para agregar un nuevo Concepto de Deduccion
    const handleAgregar = async (conceptoDeduccion) => {
      agregarConceptoDeduccion(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/nomina-concepto-deducciones/guardarConceptoDeducciones`,
        conceptoDeduccion
      );
    };
  
    const handleActualizar = async (conceptoDeduccion) => {
      // Asegúrate de incluir el id de ConceptoDeduccion en los datos que se envían
      const conceptoDeduccionActualizado = {
        ...conceptoDeduccion,
        id: currentInfo.id,
      };
  
      setIsEdit(true);
  
      // Envía los datos al servidor
      agregarConceptoDeduccion(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/nomina-concepto-deducciones/guardarConceptoDeducciones`,
        conceptoDeduccionActualizado
      );
    };
  
    // Envía el id del centro de trabajo para eliminarlo
    const handleEliminar = () => {
      //console.log(currentInfo);
      eliminarConceptoDeduccion(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/nomina-concepto-deducciones/eliminarConceptoDeduccionesPorId/${
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
        header: "Concepto",
        accessorKey: "concepto",
        filterFn: "includesString",
      },
      {
        header: "Tipo Deducción",
        accessorKey: "claveTipoDeduccion",
        filterFn: "includesString",
      },
      {
        header: "Clave Interna",
        accessorKey: "claveInterna",
        filterFn: "includesString",
      },
      {
        header: "Monto",
        accessorKey: "monto",
        filterFn: "includesString",
      },
      {
        header: "Tipo Nomina",
        accessorKey: "tipoNominaId",
        filterFn: "includesString",
      },
      {
        header: "Tipo Calculo",
        accessorKey: "tipoCalculoId",
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
        name: "concepto",
        label: "Concepto",
        type: "text",
        placeholder: "Ingresa el concepto de la deducción",
        required: true,
      },
      {
        name: "claveTipoDeduccion",
        label: "Tipo Deducción",
        type: "select",
        options: tipoDeduccion,
        placeholder: "Selecciona una opción",
        required: true,
      },
      {
        name: "claveInterna",
        label: "Clave Interna",
        type: "select",
        options: claveIntDeduccion,
        placeholder: "Selecciona una opción",
        required: true,
      },
      {
        name: "monto",
        label: "Monto",
        type: "number",
        placeholder: "Ingresa el monto",
        required: true,
        decimal: true
      },
      
      {
        name: "tipoNominaId",
        label: "Tipo Nomina",
        type: "select",
        options: [
          {value:"1", label: "Ordinaria"},
          {value:"2", label: "Extraordinaria"},
        ],
        placeholder: "Selecciona una opción",
        required: true,
      },
      {
        name: "tipoCalculoId",
        label: "Tipo Calculo",
        type: "select",
        options: [
          {value:"1", label: "Calculo 1"},
          {value:"2", label: "Calculo 2"},
          {value:"3", label: "Calculo 3"},
        ],
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
  
    // Hook para obtener los datos de los concepto de deduccion cuando se monta el componente
    useEffect(() => {
      obtenerConceptoDeduccion(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/nomina-concepto-deducciones/obtenerConceptoDeducciones`
      );
      obtenerTipoDeduccion(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/nomina-tipos-deduccion/obtenerTiposDeduccion`
      );
      obtenerClaveIntDeduccion(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/nomina-clave-interna-deduccion/obtenerClaveInternaDeduccion`
      );

    }, []);
  
    // Actualiza el estado de 'data' cuando hay una nueva respuesta del servidor
    useEffect(() => {
      if (responseConceptoDeduccionObtenidos) {
        setConceptoDeduccion(responseConceptoDeduccionObtenidos);
      }

      if (responseTipoDeduccionObtenidos) {
        // Transformar la respuesta en el formato de opciones para el select
        const options = responseTipoDeduccionObtenidos.map((item) => ({
          value: item.clave,
          label: `${item.clave} - ${item.descripcion}`,
        }));
        setTipoDeduccion(options);
      }

      if (responseClaveIntDeduccionObtenidos) {
        // Transformar la respuesta en el formato de opciones para el select
        const options = responseClaveIntDeduccionObtenidos.map((item) => ({
          value: item.clave_interna,
          label: `${item.clave_interna} - ${item.descripcion}`,
        }));
        setClaveIntDeduccion(options);
      }

    }, [responseConceptoDeduccionObtenidos,responseTipoDeduccionObtenidos,responseClaveIntDeduccionObtenidos]);
  
    useEffect(() => {
      if (!loadingConceptoDeduccionAgregado) {
        if (responseConceptoDeduccionAgregado) {
          // Mostrar mensaje según sea agregar o actualizar
          if (isEdit) {
            Swal.fire({
              title: "Concepto de deducción actualizado correctamente",
              icon: "success",
              confirmButtonText: "Aceptar",
            });
  
            // Actualizar el estado con los nuevos datos actualizados
            setConceptoDeduccion((prevData) =>
              prevData.map((item) =>
                item.id === responseConceptoDeduccionAgregado.id
                  ? responseConceptoDeduccionAgregado
                  : item
              )
            );
            setIsEdit(false);
          } else {
            Swal.fire({
              title: "Se guardó el concepto de deducción",
              icon: "success",
              confirmButtonText: "Aceptar",
            });
  
            // Agregar el nuevo tipo al estado
            setConceptoDeduccion((prevData) => [...prevData, responseConceptoDeduccionAgregado]);
          }
  
          setTypeRender(0); // Volver a la vista de tabla
        } else if (errorConceptoDeduccionAgregado) {
          console.log(errorConceptoDeduccionAgregado);
          Swal.fire({
            title: "Hubo un error al guardar el concepto de deducción",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        }
      }
    }, [loadingConceptoDeduccionAgregado, responseConceptoDeduccionAgregado, errorConceptoDeduccionAgregado]);
  
    useEffect(() => {
      if (!loadingConceptoDeduccionEliminado) {
        if (responseConceptoDeduccionEliminado) {
          Swal.fire({
            title: "Se eliminó el concepto de deducción",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          setConceptoDeduccion((prevData) =>
            prevData.filter(
              (item) => item.id
              !== currentInfo.id
            )
          );
          handleCancel();
        } else if (errorConceptoDeduccionEliminado) {
          console.log(errorConceptoDeduccionEliminado);
          Swal.fire({
            title: "Hubo un error al eliminar el concepto de deducción",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        }
      }
    }, [loadingConceptoDeduccionEliminado, responseConceptoDeduccionEliminado, errorConceptoDeduccionEliminado]);

  return (
    <>
    <Card
        title={
          typeRender === 1
            ? "Agregar concepto de deducción"
            : typeRender === 2
            ? "Editar concepto de deducción"
            : "Conceptos de deducción"
        }
        back={typeRender === 1 || typeRender === 2 ? handleBack : null}
        show={typeRender === 0 }
      >
        {typeRender === 0 && (
          <Table
            buttonName={"Nuevo concepto de deducción"}
            tableDesign={"concepto-deducciones"}
            data={conceptoDeduccion}
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
        title={"Eliminar concepto de deducción"}
        messageButtonOk={"Eliminar"}
      >
        <p>¿Estás seguro que quieres eliminar el concepto de deducción?</p>
      </CustomModal>
    </>
  )
}

export default ConceptoDeduccion