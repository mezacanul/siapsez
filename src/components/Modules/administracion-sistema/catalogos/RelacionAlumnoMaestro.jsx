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


const RelacionAlumnoMaestro = () => {
    const [data, setData] = useState();
    const [tipoEscuelas, setTipoEscuelas] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [openModalEliminar, setOpenModalEliminar] = useState(false);
    const [currentInfo, setCurrentInfo] = useState(false);

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
        getData: obtenerTiposEscuelas,
        loading: loadingTiposEscuelasObtenidos,
        error: errorTiposEscuelasObtenidos,
        response: responseTiposEscuelasObtenidos,
    } = useGetRequest();
     const {
        postData: agregar,
        response: responseAgregado,
        loading: loadingAgregado,
        error: errorAgregado,
    } = usePostRequest();

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
            `${import.meta.env.VITE_BACKEND_URL}/recursos_humanos/api/relacion/ram/guardar-ram`,
            dataAgregado
        );
    };
    const handleActualizar = async (dataAgregado) => {
        const dataActualizado = {
            ...dataAgregado,
            id: currentInfo.id,
        };
      
        setIsEdit(true);
        // Envía los datos al servidor
        agregar(
            `${import.meta.env.VITE_BACKEND_URL
            }/recursos_humanos/api/relacion/ram/actualizar-ram`,
            dataActualizado
        );
    };
    const handleEliminar = () => {
        eliminar(
            `${import.meta.env.VITE_BACKEND_URL
            }/recursos_humanos/api/relacion/ram/eliminar-ram/${currentInfo.id
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
            accessorKey: "id",
            filterFn: "includesString",
        },
        {
            header: "Grupos y Docentes",
            accessorKey: "gruposYDocentes",
            filterFn: "includesString",
        },
        {
            header: "Turno",
            accessorKey: "turno",
            filterFn: "includesString",
        },
        {
            header: "Tipo",
            accessorKey: "nombre",
            filterFn: "includesString",
        },
        {
            header: "Minimo",
            accessorKey: "minimo",
            filterFn: "includesString",
        },
        {
            header: "Maximo",
            accessorKey: "maximo",
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
            name: "gruposYDocentes",
            label: "Grupos y Docentes",
            type: "number",
            placeholder: "Ingresa grupos y docentes",
            required: true,
        },
        {
            name: "turno",
            label: "Turno",
            type: "text",
            placeholder: "Ingresa el turno",
            required: false,
        },
        {
            name: "tipoEscuelaId",
            label: "Tipo escuela",
            type: "select",
            options: tipoEscuelas,
            placeholder: "Selecciona una opción",
            required: true,
        },
        {
            name: "minimo",
            label: "Minimo",
            type: "number",
            placeholder: "Ingresa el valor minimo",
            required: true,
        },
        {
            name: "maximo",
            label: "Maximo",
            type: "number",
            placeholder: "Ingresa el valor maximo",
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
    useEffect(() => {
        obtener(`${import.meta.env.VITE_BACKEND_URL}/recursos_humanos/api/relacion/ram/obtener/lista-rams`);
         obtenerTiposEscuelas(
            `${import.meta.env.VITE_BACKEND_URL
            }/recursos_humanos/escuelas/obtenerTiposDeEscuelas`
        );
    },[]);

    // useEffect para mostrar la informacion
    useEffect(()=>{
        if (responseTiposEscuelasObtenidos) {
            // Transformar la respuesta en el formato de opciones para el select
            const options = responseTiposEscuelasObtenidos?.map((item) => ({
                value: item.id,
                label: item.nombre,
            }));
            setTipoEscuelas(options);
        }
        if (responseObtenidos) {
             responseObtenidos.forEach(item => {
                const tipoId = parseInt(item.tipo, 10); // Convertir a número
                const matchingItem = responseTiposEscuelasObtenidos?.find(el => el.id === tipoId); // Buscar en array2
                if (matchingItem) {
                    item.tipo = matchingItem.nombre; // Actualizar con el nombre correspondiente
                }
            });
            setData(responseObtenidos);
        }
    },[responseObtenidos,responseTiposEscuelasObtenidos]);
    useEffect(() => {
            if (!loadingAgregado) {
                if (responseAgregado) {
                    // Mostrar mensaje según sea agregar o actualizar
                    if (isEdit) {
                        Swal.fire({
                            title: "Relación actualizada correctamente",
                            icon: "success",
                            confirmButtonText: "Aceptar",
                        });
    
                        // Actualizar el estado con los nuevos datos actualizados
                        setData((prevData) =>
                            prevData.map((item) =>
                                item.id === responseAgregado.id
                                    ? responseAgregado
                                    : item
                            )
                        );
                        setIsEdit(false);
                    } else {
                        Swal.fire({
                            title: "Se guardó la relación correctamente",
                            icon: "success",
                            confirmButtonText: "Aceptar",
                        });
    
                        setData((prevData) => [...prevData, responseAgregado]);
                    }
    
                    setTypeRender(0); // Volver a la vista de tabla
                } else if (errorAgregado) {
                    Swal.fire({
                        title: "Hubo un error al guardar la estructura",
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
                        title: "Se eliminó la relación alumno maestro correctamente",
                        icon: "success",
                        confirmButtonText: "Aceptar",
                    });
                    setData((prevData) =>
                        prevData.filter(
                            (item) => item.id !== currentInfo.id
                        )
                    );
                    handleCancel();
                } else if (errorEliminado) {
                    Swal.fire({
                        title: "Hubo un error al eliminar la relación alumno maestro",
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
                        ? "Agregar Relación Alumno Maestro"
                        : typeRender === 2
                            ? "Editar Relación Alumno Maestro"
                            : "Relación Alumno Maestro"
                                
                }
                back={typeRender === 1 || typeRender === 2 || typeRender === 3 ? handleBack : null}
                show={typeRender === 0}
            >
                {typeRender === 0 && (

                    <Table
                        buttonName={"Nueva relación"}
                        tableDesign={"estructura-organizacional"}
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
                title={"Eliminar relación alumno maestro"}
                messageButtonOk={"Eliminar"}
            >
                <p>¿Estás seguro que quieres eliminar la relacion alumno maestro seleccionada?</p>
            </CustomModal>
        </>
    );
};

export default RelacionAlumnoMaestro;