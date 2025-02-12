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

const ConceptoPercepcion = () => {
    const [conceptoPercepcion , setConceptoPercepcion ] = useState([]);
    const [tipoPercepcion, setTipoPercepcion] = useState([]);
    const [claveIntPercepcion, setClaveIntPercepcion] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    // Estado para controlar la visibilidad del modal de eliminación
    const [openModalEliminar, setOpenModalEliminar] = useState(false);
  
    // Estado para manejar la información actual de un Concepto de Percepcion en edición/eliminación
    const [currentInfo, setCurrentInfo] = useState(false);
  
    // Estado para manejar el tipo de renderización (0 = tabla, 1 = agregar, 2 = editar)
    const [typeRender, setTypeRender] = useState(0);
  
    // Custom hooks
    const {
      getData: obtenerConceptoPercepcion ,
      loading: loadingConceptoPercepcionObtenidos,
      error: errorConceptoPercepcionObtenidos,
      response: responseConceptoPercepcionObtenidos,
    } = useGetRequest();

    const {
      getData: obtenerTipoPercepcion,
      loading: loadingTipoPercepcionObtenidos,
      error: errorTipoPercepcionObtenidos,
      response: responseTipoPercepcionObtenidos,
    } = useGetRequest();

    const {
      getData: obtenerClaveIntPercepcion,
      loading: loadingClaveIntPercepcionObtenidos,
      error: errorClaveIntPercepcionObtenidos,
      response: responseClaveIntPercepcionObtenidos,
    } = useGetRequest();
  
    const {
      postData: agregarConceptoPercepcion,
      response: responseConceptoPercepcionAgregado,
      loading: loadingConceptoPercepcionAgregado,
      error: errorConceptoPercepcionAgregado,
    } = usePostRequest();
  
    const {
      postData: eliminarConceptoPercepcion,
      response: responseConceptoPercepcionEliminado,
      loading: loadingConceptoPercepcionEliminado,
      error: errorConceptoPercepcionEliminado,
    } = usePostRequest();
  
    // Muestra el formulario para agregar un nuevo Concepto de Percepcion.
    const showFormAgregar = () => {
      setTypeRender(1);
    };
  
    const formAgregar = () => {
      return showFormAgregar();
    };
  
    // Muestra el formulario para editar un Concepto de Percepcion existente.
    const showFormActualizar = (info) => {
      setCurrentInfo(info);
      setTypeRender(2);
    };
  
    // Muestra el modal de confirmación para eliminar un Concepto de Percepcion
    const showModalEliminar = (info) => {
      setCurrentInfo(info);
      setOpenModalEliminar(true);
    };
  
    // Envía los datos del formulario para agregar un nuevo Concepto de Percepcion
    const handleAgregar = async (conceptoPercepcion) => {
      agregarConceptoPercepcion(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/nomina-concepto-percepciones/guardarConceptoPercepciones`,
        conceptoPercepcion
      );
    };
  
    const handleActualizar = async (conceptoPercepcion) => {
      // Asegúrate de incluir el id de ConceptoPercepcion en los datos que se envían
      const conceptoPercepcionActualizado = {
        ...conceptoPercepcion,
        id: currentInfo.id,
      };
  
      setIsEdit(true);
  
      // Envía los datos al servidor
      agregarConceptoPercepcion(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/nomina-concepto-percepciones/guardarConceptoPercepciones`,
        conceptoPercepcionActualizado
      );
    };
  
    // Envía el id del centro de trabajo para eliminarlo
    const handleEliminar = () => {
      //console.log(currentInfo);
      eliminarConceptoPercepcion(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/nomina-concepto-percepciones/eliminarConceptoPercepcionesPorId/${
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
        header: "Tipo Percepción",
        accessorKey: "claveTipoPercepcion",
        filterFn: "includesString",
      },
      {
        header: "Clave Interna",
        accessorKey: "claveInterna",
        filterFn: "includesString",
      },
      {
        header: "Monto Gravado",
        accessorKey: "montoGravado",
        filterFn: "includesString",
      },
      {
        header: "Monto Exento",
        accessorKey: "montoExento",
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
        placeholder: "Ingresa el concepto de la percepción",
        required: true,
      },
      {
        name: "claveTipoPercepcion",
        label: "Tipo Percepción",
        type: "select",
        options: tipoPercepcion,
        placeholder: "Selecciona una opción",
        required: true,
      },
      {
        name: "claveInterna",
        label: "Clave Interna",
        type: "select",
        options: claveIntPercepcion,
        placeholder: "Selecciona una opción",
        required: true,
      },
      {
        name: "montoGravado",
        label: "Monto Gravado",
        type: "number",
        placeholder: "Ingresa el monto gravado",
        required: true,
        decimal: true
      },
      {
        name: "montoExento",
        label: "Monto Exento",
        type: "number",
        placeholder: "Ingresa el monto gravado",
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
  
    // Hook para obtener los datos de los concepto de perpecion cuando se monta el componente
    useEffect(() => {
      obtenerConceptoPercepcion(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/nomina-concepto-percepciones/obtenerConceptoPercepciones`
      );
      obtenerTipoPercepcion(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/nomina-tipos-percepcion/obtenerTiposPercepcion`
      );
      obtenerClaveIntPercepcion(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/nomina-clave-interna-percepcion/obtenerClaveInternaPercepcion`
      );

    }, []);
  
    // Actualiza el estado de 'data' cuando hay una nueva respuesta del servidor
    useEffect(() => {
      if (responseConceptoPercepcionObtenidos) {
        setConceptoPercepcion(responseConceptoPercepcionObtenidos);
      }

      if (responseTipoPercepcionObtenidos) {
        // Transformar la respuesta en el formato de opciones para el select
        const options = responseTipoPercepcionObtenidos.map((item) => ({
          value: item.clave,
          label: `${item.clave} - ${item.descripcion}`,
        }));
        setTipoPercepcion(options);
      }

      if (responseClaveIntPercepcionObtenidos) {
        // Transformar la respuesta en el formato de opciones para el select
        const options = responseClaveIntPercepcionObtenidos.map((item) => ({
          value: item.clave_interna,
          label: `${item.clave_interna} - ${item.descripcion}`,
        }));
        setClaveIntPercepcion(options);
      }

    }, [responseConceptoPercepcionObtenidos,responseTipoPercepcionObtenidos,responseClaveIntPercepcionObtenidos]);
  
    useEffect(() => {
      if (!loadingConceptoPercepcionAgregado) {
        if (responseConceptoPercepcionAgregado) {
          // Mostrar mensaje según sea agregar o actualizar
          if (isEdit) {
            Swal.fire({
              title: "Concepto de percepción actualizado correctamente",
              icon: "success",
              confirmButtonText: "Aceptar",
            });
  
            // Actualizar el estado con los nuevos datos actualizados
            setConceptoPercepcion((prevData) =>
              prevData.map((item) =>
                item.id === responseConceptoPercepcionAgregado.id
                  ? responseConceptoPercepcionAgregado
                  : item
              )
            );
            setIsEdit(false);
          } else {
            Swal.fire({
              title: "Se guardó el concepto de percepción",
              icon: "success",
              confirmButtonText: "Aceptar",
            });
  
            // Agregar el nuevo tipo al estado
            setConceptoPercepcion((prevData) => [...prevData, responseConceptoPercepcionAgregado]);
          }
  
          setTypeRender(0); // Volver a la vista de tabla
        } else if (errorConceptoPercepcionAgregado) {
          console.log(errorConceptoPercepcionAgregado);
          Swal.fire({
            title: "Hubo un error al guardar el concepto de percepción",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        }
      }
    }, [loadingConceptoPercepcionAgregado, responseConceptoPercepcionAgregado, errorConceptoPercepcionAgregado]);
  
    useEffect(() => {
      if (!loadingConceptoPercepcionEliminado) {
        if (responseConceptoPercepcionEliminado) {
          Swal.fire({
            title: "Se eliminó el concepto de percepción",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          setConceptoPercepcion((prevData) =>
            prevData.filter(
              (item) => item.id
              !== currentInfo.id
            )
          );
          handleCancel();
        } else if (errorConceptoPercepcionEliminado) {
          console.log(errorConceptoPercepcionEliminado);
          Swal.fire({
            title: "Hubo un error al eliminar el concepto de percepción",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        }
      }
    }, [loadingConceptoPercepcionEliminado, responseConceptoPercepcionEliminado, errorConceptoPercepcionEliminado]);

  return (
    <>
    <Card
        title={
          typeRender === 1
            ? "Agregar concepto de percepción"
            : typeRender === 2
            ? "Editar concepto de percepción"
            : "Conceptos de percepción"
        }
        back={typeRender === 1 || typeRender === 2 ? handleBack : null}
        show={typeRender === 0 }
      >
        {typeRender === 0 && (
          <Table
            buttonName={"Nuevo concepto de percepción"}
            tableDesign={"concepto-percepciones"}
            data={conceptoPercepcion}
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
        title={"Eliminar concepto de percepción"}
        messageButtonOk={"Eliminar"}
      >
        <p>¿Estás seguro que quieres eliminar el concepto de percepción?</p>
      </CustomModal>
    </>
  )
}

export default ConceptoPercepcion