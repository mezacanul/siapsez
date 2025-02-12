import React, { useEffect, useState } from 'react'
import Card from '../../../utilities/card/Card'
import Table from '../../../utilities/table/Table'
import CustomForm from '../../../utilities/form/CustomForm'
import CustomModal from '../../../utilities/modal/CustomModal'
import useGetRequest from "../../../../hooks/useGetRequest";
import usePostRequest from "../../../../hooks/usePostRequest";
import "./tiposNomina.css";
import { IconButton } from "@mui/material";
import { Dropdown, Space } from "antd";
import { CgMoreVertical } from "react-icons/cg";
import Swal from "sweetalert2";

const TiposNomina = () => {
    const [tiposNomina, setTiposNomina] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    // Estado para controlar la visibilidad del modal de eliminación
    const [openModalEliminar, setOpenModalEliminar] = useState(false);
  
    // Estado para manejar la información actual de una nomina en edición/eliminación
    const [currentInfo, setCurrentInfo] = useState(false);
  
    // Estado para manejar el tipo de renderización (0 = tabla, 1 = agregar, 2 = editar)
    const [typeRender, setTypeRender] = useState(0);
  
    // Custom hooks
    const {
      getData: obtenerTiposNomina,
      loading: loadingTiposNomina,
      error: errorTiposNomina,
      response: responseTiposNomina,
    } = useGetRequest();
  
    const {
      postData: agregarTipoNomina,
      response: responseTipoNomina,
      loading: loadingTipoNomina,
      error: errorTipoNonomina,
    } = usePostRequest();
  
    const {
      postData: eliminarTipoNomina,
      response: responseTipoNominaEliminado,
      loading: loadingTipoNominaEliminado,
      error: errorTipoNominaEliminado,
    } = usePostRequest();
  

    const estatusTipoNomina = [
      { label: 'Activo', value: 1 },
      { label: 'Inactivo', value: 2 }
    ];

    // Muestra el formulario para agregar un nuevo tipo de nomina.
    const showFormAgregar = () => {
      setTypeRender(1);
    };
  
    const formAgregar = () => {
      return showFormAgregar();
    };

    // Muestra el formulario para editar un tipo de nomina
    const showFormActualizar = (info) => {
      console.log(info);
      setCurrentInfo(info);
      setTypeRender(2);
    };
  
    // Muestra el modal de confirmación para eliminar un tipo de nomina
    const showModalEliminar = (info) => {
      setCurrentInfo(info);
      setOpenModalEliminar(true);
    };
  
    // Envía los datos del formulario para agregar un nuevo tipo de nomina
    const handleAgregar = async (tipoNomina) => {
      agregarTipoNomina(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/api/tipo-nomina/guardar-tipo-nomina`,
        tipoNomina
      );
    };
  
    const handleActualizar = async (tipoNomina) => { 
      // convertimos los valores tipo string a tipo numerico esto debido al cambio
      tipoNomina.cicloCalculo = Number(tipoNomina.cicloCalculo);
      tipoNomina.estatus = Number(tipoNomina.estatus);

      //Agrega a la monina el id para ser actualizado
      const tipoNominaActualizado = {
        ...tipoNomina,
        idNomina: currentInfo.idNomina,
      };
  
      setIsEdit(true);
  
      // Envía los datos al servidor
      agregarTipoNomina(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/api/tipo-nomina/actualizar-tipo-nomina`,
        tipoNominaActualizado
      );
    };
  
    // Envía el id nomina para eliminarlo
    const handleEliminar = () => {
      eliminarTipoNomina(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/api/tipo-nomina/eliminar/eliminar-tipo-nomina/${
          currentInfo.idNomina
        }`
      );
    };
  
    // Metodo para cancelar la eliminacion de tipo de nomina
    const handleCancel = () => {
      setOpenModalEliminar(false);
    };
  
    const handleBack = () => {
      setTypeRender(0);
    };
  
    // Creacion de columnas para la tabla
    const columns = [
      {
        header: "Clave interna",
        accessorKey: "claveInterna",
        filterFn: "includesString",
      },
      {
        header: "Tipo de nomina",
        accessorKey: "tipoNomina",
        filterFn: "includesString",
      },
      {
        header: "Ciclo Nomina",
        accessorKey: "cicloNomina",
        filterFn: "includesString",
      },
      {
        header: "Fecha Inicio",
        accessorKey: "fechaInicio",
        filterFn: "includesString",
      },
      {
        header: "Fecha Final",
        accessorKey: "fechaFin",
        filterFn: "includesString",
      },
      {
        header: "Ciclos calculo",
        accessorKey: "cicloCalculo",
        filterFn: "includesString",
      },
      {
        header: "Estatus",
        accessorKey: "estatus",
        filterFn: "includesString",
        cell: ({ row }) => (row.original.estatus === 1 ? "Activo" : "Inactivo")
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
        name: "tipoNomina",
        label: "Tipo de nomina",
        type: "text",
        placeholder: "Ingresa nombre tipo de nomina",
        required: true,
      },
      {
        name: "cicloNomina",
        label: "Ciclo de nomina",
        type: "text",
        placeholder: "Ingresa ciclo de nomina",
        required: true,
      },
      {
        name: "claveInterna",
        label: "Clave interna",
        type: "text",
        placeholder: "Ingresa clave de tipo nomina",
        required: true,
        maxLength: "10",
      },
      {
        name: "cicloCalculo",
        label: "Ciclo calculo",
        type: "number",
        maxLength: "2",
        placeholder: "Ingresa ciclo de calculo de tipo nomina",
        required: true,
        decimal: true
      },
      {
        name: "fechaInicio",
        label: "Fecha inicial",
        type: "date",
        placeholder: "Ingresa fecha inicial",
        required: true
      },
      {
        name: "fechaFin",
        label: "Fecha final",
        type: "date",
        placeholder: "Ingresa fecha final",
        required: true
      },
      {
        name: "estatus",
        label: "Estatus",
        type: "select",
        options: estatusTipoNomina,
        placeholder: "Selecciona una opción",
        required: true,
      }
    ];
  
    // Función de carga de campos
    const crearCampos = (fields) =>
      fields.map((field) => ({
        ...field,
        defaultValue: "",
      }));
  
    // Función de actualizado de datos
    const editarCampos = (fields, data) =>
      fields.map((field) => ({
        ...field,
        defaultValue: data[field.name],
      }));
  
    // Campos para los formularios de creación y edición
    const camposCrear = crearCampos(campos);
    const camposEditar = editarCampos(campos, currentInfo);
  
    // Metodo para obtener todos los tipos de nomina
    useEffect(() => {
      obtenerTiposNomina(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/api/tipo-nomina/obtener/lista-nomina`
      );
    }, []);
  
    // Actualiza el estado de 'data' cuando hay una nueva respuesta del servidor
    useEffect(() => {
      if (responseTiposNomina) {
        setTiposNomina(responseTiposNomina);
      }
    }, [responseTiposNomina]);
  
    useEffect(() => {
      if (!loadingTipoNomina) {
        if (responseTipoNomina) {
          // Mostrar mensaje según sea agregar o actualizar
          if (isEdit) {
            Swal.fire({
              title: "Tipo de nomina actualizado correctamente",
              icon: "success",
              confirmButtonText: "Aceptar",
            });
  
            // Actualizar el estado con los nuevos datos actualizados
            setTiposNomina((prevData) =>
              prevData.map((item) =>
                item.idNomina === responseTipoNomina.idNomina
                  ? responseTipoNomina
                  : item
              )
            );
            setIsEdit(false);
          } else {
            Swal.fire({
              title: "Se guardó el tipo de nomina correctamente",
              icon: "success",
              confirmButtonText: "Aceptar",
            });
  
            // Agregar el nuevo tipo de nomina
            setTiposNomina((prevData) => [...prevData, responseTipoNomina]);
          }
  
          setTypeRender(0); // Volver a la vista de tabla
        } else if (errorTipoNonomina) {
          console.log(errorTipoNonomina);
          Swal.fire({
            title: "Hubo un error al guardar el tipo nomina",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        }
      }
    }, [loadingTipoNomina, responseTipoNomina, errorTipoNonomina]);
  
   


    useEffect(() => {
      if (!loadingTipoNominaEliminado) {
        if (responseTipoNominaEliminado) {
          Swal.fire({
            title: "Se eliminó el tipo de nomina correctamente",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          setTiposNomina((prevData) =>
            prevData.filter(
              (item) => item.idNomina
              !== currentInfo.idNomina
            )
          );
          handleCancel();
        } else if (errorTipoNominaEliminado) {
          console.log(errorTipoNominaEliminado);
          Swal.fire({errorTipoNominaEliminado,
            title: "Hubo un error al eliminar el tipo de nomina",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        }
      }
    }, [loadingTipoNominaEliminado, responseTipoNominaEliminado, errorTipoNominaEliminado]);

  return (
    <>
    <Card
        title={
          typeRender === 1
            ? "Agregar tipo nomina"
            : typeRender === 2
            ? "Editar tipo nomina"
            : "Tipos de nomina"
        }
        back={typeRender === 1 || typeRender === 2 ? handleBack : null}
        show={typeRender === 0 }
      >
        {typeRender === 0 && (
          <Table
            buttonName={"Nuevo tipo nomina"}
            tableDesign={"tipos-nomina"}
            data={tiposNomina}
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
        title={"Eliminar tipo de nomina"}
        messageButtonOk={"Eliminar"}
      >
        <p>¿Estás seguro que quieres eliminar el tipo de nomina?</p>
      </CustomModal>
    </>
  )
}

export default TiposNomina