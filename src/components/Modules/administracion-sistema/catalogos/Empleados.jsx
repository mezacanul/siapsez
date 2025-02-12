import { useEffect, useState } from "react";
import Card from "../../../utilities/card/Card";
import Swal from "sweetalert2";
import usePostRequest from "../../../../hooks/usePostRequest";
import useGetRequest from "../../../../hooks/useGetRequest";
import CustomModal from "../../../utilities/modal/CustomModal";
import Table from "../../../utilities/table/Table";
import { Dropdown, Space } from "antd";
import { IconButton } from "@mui/material";
import { CgMoreVertical } from "react-icons/cg";
import CustomForm from "../../../utilities/form/CustomForm";
import usePostFormRequest from "../../../../hooks/usePostFormRequest";
import { use } from "react";


const Empleados = () => {
    const [data, setData] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const [openModalEliminar, setOpenModalEliminar] = useState(false);
    const [currentInfo, setCurrentInfo] = useState(false);
    // catalogos desplegables
    const [nivelDeEstudios, setNivelDeEstudios] = useState([]);
    const [estadosCivil, setEstadosCivil] = useState([]);
    const [generos, setGeneros] = useState([]);
    // Estado para manejar el tipo de renderización (0 = tabla, 1 = agregar, 2 = editar)
    const [typeRender, setTypeRender] = useState(0);

    const [tablaForm, setTablaForm] = useState({});
    // Estados para manejar la carga de la información
     const {
        getData: obtener,
        loading: loadingObtenidos,
        error: errorObtenidos,
        response: responseObtenidos,
    } = useGetRequest();
    
     const {
        postData: agregar,
        response: responseAgregado,
        loading: loadingAgregado,
        error: errorAgregado,
    } = usePostRequest();

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
    const {
        postData: eliminar,
        response: responseEliminado,
        loading: loadingEliminado,
        error: errorEliminado,
    } = usePostRequest();
    // funciones para CRUD

     const showFormAgregar = () => {
        setTypeRender(1);
    };

    const formAgregar = () => {
        setTablaForm({})
        return showFormAgregar();
    };
    const showFormActualizar = (info) => {
        setCurrentInfo(info);
        setTablaForm(info);

        setTypeRender(2);
    };
    const showModalEliminar = (info) => {
        setCurrentInfo(info);
        setOpenModalEliminar(true);
    };
    const handleBack = () => {
        setTypeRender(0);
    };
    const handleCancel = () => {
        setOpenModalEliminar(false);
    };

    const handleAgregar = async (dataAgregado) => {
        agregar(
            `${import.meta.env.VITE_BACKEND_URL}/recursos_humanos/empleado/agregarNuevoEmpleado`,
            dataAgregado
        );
    };
    const handleActualizar = async (dataAgregado) => {
        const dataActualizado = {
            ...dataAgregado,
            idNumeroEmpleado: currentInfo.idNumeroEmpleado,
        };
      
        setIsEdit(true);
        // Envía los datos al servidor
        agregar(
            `${import.meta.env.VITE_BACKEND_URL
            }/recursos_humanos/empleado/actualizarEmpleado`,
            dataActualizado
        );
    };
    const handleEliminar = () => {
        eliminar(
            `${import.meta.env.VITE_BACKEND_URL
            }/recursos_humanos/empleado/eliminarEmpleado/${currentInfo.idNumeroEmpleado
            }`
        );
    };
    const handleTableFormChange = e => {
        const { name, value } = e.target
        setTablaForm((prevState) => ({
            ...prevState,
            [name]: value
        }))

    };

    
    // columnas de tabla
    const columns = [
        {
            header: "Id",
            accessorKey: "idNumeroEmpleado",
            filterFn: "includesString",
        },
        {
            header: "NSS",
            accessorKey: "nss",
            filterFn: "includesString",
        },
        {
            header: "Curp",
            accessorKey: "curp",
            filterFn: "includesString",
        },
        {
            header: "Cedula",
            accessorKey: "cedula",
            filterFn: "includesString",
        },
        {
            header: "Egreso",
            accessorKey: "anioEgreso",
            filterFn: "includesString",
        },
        {
            header: "Estudios",
            accessorKey: "estudios",
            filterFn: "includesString",
        },
        {
            header: "Esc. egreso",
            accessorKey: "escuelaEgreso",
            filterFn: "includesString",
        },
        
        {
            header: "Area",
            accessorKey: "area",
            filterFn: "includesString",
        },
        {
            header: "Email",
            accessorKey: "email",
            filterFn: "includesString",
        },
                {
            header: "Telefono",
            accessorKey: "telefono",
            filterFn: "includesString",
        },
        {
            header: "Genero",
            accessorKey: "genero",
            filterFn: "includesString",
        },
        {
            header: "Estado civil",
            accessorKey: "estadoCivil",
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
     const campos = [
        {
            name: "nss",
            label: "NSS",
            type: "text",
            placeholder: "Ingresa el NSS",
            required: true,
        },
        {
            name: "curp",
            label: "Curp",
            type: "text",
            placeholder: "Ingresa el Curp",
            required: true,
        },
        {
            name: "cedula",
            label: "Cedula",
            type: "text",
            placeholder: "Ingresa No. de cedula profesional",
            required: true,
        },
        {
            name: "anioEgreso",
            label: "Año de egreso",
            type: "number",
            placeholder: "Ingresa el año de egreso",
            required: true,
        },
        {
            name: "nivelMaximoDeEstudiosId",
            label: "Nivel Max. de estudios",
            type: "select",
            options: nivelDeEstudios,
            placeholder: "Ingrqesa el nivel maximo de estudios",
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
            label: "Area",
            type: "number",
            placeholder: "Ingresa el area",
            required: true,
        },
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Ingresa el email",
            required: true,
        },
        {
            name: "telefono",
            label: "Telefono",
            type: "number",
            placeholder: "Ingresa el telefono",
            required: true,
        },
        {
            name: "generoId",
            label: "Genero",
            type: "select",
            options: generos,
            placeholder: "Ingresa el genero",
            required: true,
        },
        {
            name: "estadoCivilId",
            label: "Estado Civil",
            type: "select",
            options: estadosCivil,
            placeholder: "Ingresa el estado civil",
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

    // funciones para obtener informacion del server
    // useEffect(() => {
    //     obtener(`${import.meta.env.VITE_BACKEND_URL}/recursos_humanos/empleado/obtenerEmpleados`);
    //     //  obtenerTiposEscuelas(
    //     //     `${import.meta.env.VITE_BACKEND_URL
    //     //     }/recursos_humanos/escuelas/obtenerTiposDeEscuelas`
    //     // );
    // },[]);

    
     // Se obtienen las listas para los campos de select del formulario
      useEffect(() => {    
     obtener(`${import.meta.env.VITE_BACKEND_URL}/recursos_humanos/empleado/obtenerEmpleados`);
        obtenerEstadosCivil(
          `${import.meta.env.VITE_BACKEND_URL
          }/recursos_humanos/persona/obtenerListaEstadoCivil`
        );
    
        obtenerNivelDeEstudios(
          `${import.meta.env.VITE_BACKEND_URL
          }/recursos_humanos/nivelMaximoDeEstudios/obtenerListadoDeNivelMaximoEstudios`
        );
    
        obtenerGeneros(
          `${import.meta.env.VITE_BACKEND_URL
          }/recursos_humanos/genero/obtenerGeneros`
        );
      }, []);
      // Actualizan los estados cuando hay una nueva respuesta del servidor
        useEffect(() => {
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
        }, [
          responseEstadosCivilObtenidos,
          responseGenerosObtenidos,
          responseNivelDeEstudiosObtenidos,
        ]);
    // useEffect para mostrar la informacion
    useEffect(()=>{
        
        // }
        if (responseObtenidos) {
             const updatedData = responseObtenidos.map(item => {
            const matchingNivelEstudios = responseNivelDeEstudiosObtenidos?.find(el => el.codigo === item.nivelMaximoDeEstudiosId);
            if (matchingNivelEstudios) {
                item.estudios = matchingNivelEstudios.estudios;
            }

            const matchingGenero = responseGenerosObtenidos?.find(el => el.id === item.generoId);
            if (matchingGenero) {
                item.genero = matchingGenero.tipo;
            }

            const matchingEstadoCivil = responseEstadosCivilObtenidos?.find(el => el.id === item.estadoCivilId);
            if (matchingEstadoCivil) {
                item.estadoCivil = matchingEstadoCivil.descripcion;
            }
        });
            setData(responseObtenidos);
            
        }
    },[responseObtenidos,responseNivelDeEstudiosObtenidos,responseGenerosObtenidos,responseEstadosCivilObtenidos]);
    useEffect(() => {
            if (!loadingAgregado) {
                if (responseAgregado) {
                    const matchingNivelEstudios = responseNivelDeEstudiosObtenidos?.find(el => el.codigo === responseAgregado.nivelMaximoDeEstudiosId);
                if (matchingNivelEstudios) {
                    responseAgregado.estudios = matchingNivelEstudios.estudios;
                }

                const matchingGenero = responseGenerosObtenidos?.find(el => el.id === responseAgregado.generoId);
                if (matchingGenero) {
                    responseAgregado.genero = matchingGenero.tipo;
                }

                const matchingEstadoCivil = responseEstadosCivilObtenidos?.find(el => el.id === responseAgregado.estadoCivilId);
                if (matchingEstadoCivil) {
                    responseAgregado.estadoCivil = matchingEstadoCivil.descripcion;
                }
                    // Mostrar mensaje según sea agregar o actualizar
                    if (isEdit) {
                        Swal.fire({
                            title: "Empleado actualizado correctamente",
                            icon: "success",
                            confirmButtonText: "Aceptar",
                        });
    
                        // Actualizar el estado con los nuevos datos actualizados
                        setData((prevData) =>
                            
                            prevData.map((item) =>
                                item.idNumeroEmpleado === responseAgregado.idNumeroEmpleado
                                    ? responseAgregado
                                    : item
                            )
                        );
                        setIsEdit(false);
                    } else {
                        Swal.fire({
                            title: "Se guardó el empleado correctamente",
                            icon: "success",
                            confirmButtonText: "Aceptar",
                        });
    
                        setData((prevData) => [...prevData, responseAgregado]);
                    }
    
                    setTypeRender(0); // Volver a la vista de tabla
                } else if (errorAgregado) {
                    Swal.fire({
                        title: "Hubo un error al guardar el empleado",
                        icon: "error",
                        confirmButtonText: "Cerrar",
                    });
                }
            }
        }, [loadingAgregado, responseAgregado, errorAgregado]);
    // use effect para eliminar
    useEffect(() => {
            if (!loadingEliminado) {
                if (responseEliminado) {
                    Swal.fire({
                        title: "Se eliminó el Empleado correctamente",
                        icon: "success",
                        confirmButtonText: "Aceptar",
                    });
                    setData((prevData) =>
                        prevData.filter(
                            (item) => item.idNumeroEmpleado !== currentInfo.idNumeroEmpleado
                        )
                    );
                    handleCancel();
                } else if (errorEliminado) {
                    Swal.fire({
                        title: "Hubo un error al eliminar el Empleado",
                        icon: "error",
                        confirmButtonText: "Cerrar",
                    });
                }
            }
        }, [loadingEliminado, responseEliminado, errorEliminado]);
    // retorna el contenido geeneral de la vista
     return (
        <>
            <Card
                title={
                    typeRender === 1
                        ? "Agregar Empleado"
                        : typeRender === 2
                            ? "Editar Empleado"
                            : "Empleados"
                                
                }
                back={typeRender === 1 || typeRender === 2 || typeRender === 3 ? handleBack : null}
                show={typeRender === 0}
            >
                {typeRender === 0 && (

                    <Table
                        // buttonName={"Nuevo empleado"}
                        tableDesign={"empleados"}
                        data={data}
                        columns={columns}
                        modalNewElement={formAgregar}
                    />

                )}
                {typeRender === 1 && (
                    <>

                        <CustomForm
                            onSubmit={handleAgregar}
                            fields={camposCrear}
                            buttonText="Guardar"
                        />
                    </>

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
                title={"Eliminar Empleado"}
                messageButtonOk={"Eliminar"}
            >
                <p>¿Estás seguro que quieres eliminar el empleado seleccionado?</p>
            </CustomModal>
        </>
    );
};

export default Empleados;