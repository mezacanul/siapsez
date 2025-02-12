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


const EstructuraOrganizacional = () => {
    const [data, setData] = useState();
    const [tipoEscuelas, setTipoEscuelas] = useState([]);
    const [funciones, setFunciones] = useState([
        { value: "D", label: "Docente" },
        { value: "T", label: "Técnico Docente" },
        { value: "I", label: "Dirección" },
        { value: "S", label: "supervisión" },
        { value: "U", label: "Tutoría" },
        { value: "A", label: "Asesoría Técnica Pedagógica" },
        { value: "E", label: "Apoyo y Asistencia a la Educación" },
    ]);
    const [isEdit, setIsEdit] = useState(false);

    const [openModalEliminar, setOpenModalEliminar] = useState(false);

    const [currentInfo, setCurrentInfo] = useState(false);

    // Estado para manejar el tipo de renderización (0 = tabla, 1 = agregar, 2 = editar)
    const [typeRender, setTypeRender] = useState(0);

    const [tablaForm, setTablaForm] = useState({});

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
    const {
        postData: agregarCargaMasiva,
        response: responseCargaMasivaAgregado,
        loading: loadingCargaMasivaAgregado,
        error: errorCargaMasivaAgregado,
    } = usePostFormRequest();
    const showFormAgregar = () => {
        setTypeRender(1);
    };
    const showFormCargaMasiva = () => {
        setTypeRender(3);
    };
    const formAgregar = () => {
        setTablaForm({})
        return showFormAgregar();
    };
    const formCargaMasiva = () => {
        return showFormCargaMasiva();
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

        const mergedObj = { ...dataAgregado, ...tablaForm };

        agregar(
            `${import.meta.env.VITE_BACKEND_URL
            }/recursos_humanos/api/estructura-organizacional/guardar-estructura`,
            mergedObj
        );
    };
    const handleActualizar = async (dataAgregado) => {

        const dataActualizado = {
            ...dataAgregado,
            id: currentInfo.id,
        };

        const mergedObj = { ...dataActualizado, ...tablaForm };

        setIsEdit(true);

        // Envía los datos al servidor
        agregar(
            `${import.meta.env.VITE_BACKEND_URL
            }/recursos_humanos/api/estructura-organizacional/actualizar/estructura-organizacional`,
            mergedObj
        );
    };
    const handleCargaMasiva = async (dataAgregado) => {

        console.log(dataAgregado.archivos);
        const file = dataAgregado.archivos;
        const formData = new FormData();
        formData.append("File", file);
        agregarCargaMasiva(
            `${import.meta.env.VITE_BACKEND_URL
            }/recursos_humanos/api/estructura-organizacional/guardar/carga-masiva/estructura-organizacional`,
            formData
        );
    };
    const handleEliminar = () => {
        eliminar(
            `${import.meta.env.VITE_BACKEND_URL
            }/recursos_humanos/api/estructura-organizacional/eliminar/estructura-organizacional/${currentInfo.id
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
    const columns = [
        {
            header: "Id",
            accessorKey: "id",
            filterFn: "includesString",
        },
        {
            header: "Categoría",
            accessorKey: "categoria",
            filterFn: "includesString",
        },
        {
            header: "Función",
            accessorKey: "funcion",
            filterFn: "includesString",
        },
        {
            header: "Personal",
            accessorKey: "personal",
            filterFn: "includesString",
        },
        {
            header: "Tipo",
            accessorKey: "tipo",
            filterFn: "includesString",
        },
        {
            header: "1",
            accessorKey: "uno",
            filterFn: "includesString",
        },
        {
            header: "2",
            accessorKey: "dos",
            filterFn: "includesString",
        },
        {
            header: "3",
            accessorKey: "tres",
            filterFn: "includesString",
        },
        {
            header: "4",
            accessorKey: "cuatro",
            filterFn: "includesString",
        },
        {
            header: "5",
            accessorKey: "cinco",
            filterFn: "includesString",
        },
        {
            header: "6",
            accessorKey: "seis",
            filterFn: "includesString",
        },
        {
            header: "7",
            accessorKey: "siete",
            filterFn: "includesString",
        },
        {
            header: "8",
            accessorKey: "ocho",
            filterFn: "includesString",
        },
        {
            header: "9",
            accessorKey: "nueve",
            filterFn: "includesString",
        },
        {
            header: "10",
            accessorKey: "diez",
            filterFn: "includesString",
        },
        {
            header: "11",
            accessorKey: "once",
            filterFn: "includesString",
        },
        {
            header: "12",
            accessorKey: "doce",
            filterFn: "includesString",
        },
        {
            header: "13",
            accessorKey: "trece",
            filterFn: "includesString",
        },
        {
            header: "14",
            accessorKey: "catorce",
            filterFn: "includesString",
        },
        {
            header: "15",
            accessorKey: "quince",
            filterFn: "includesString",
        },
        {
            header: "16",
            accessorKey: "dieciseis",
            filterFn: "includesString",
        },
        {
            header: "17",
            accessorKey: "diecisiete",
            filterFn: "includesString",
        },
        {
            header: "18",
            accessorKey: "dieciocho",
            filterFn: "includesString",
        },
        {
            header: "19",
            accessorKey: "diecinueve",
            filterFn: "includesString",
        },
        {
            header: "20",
            accessorKey: "veinte",
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
            name: "categoria",
            label: "Categoría",
            type: "text",
            placeholder: "Ingresa la categoría",
            required: true,
        },
        {
            name: "funcion",
            label: "Función",
            type: "select",
            options: funciones,
            placeholder: "Selecciona una opción",
            required: true,
        },
        {
            name: "personal",
            label: "Personal",
            type: "text",
            placeholder: "Ingresa la descripción",
            required: true,
        },
        {
            name: "tipo",
            label: "tipo escuela",
            type: "select",
            options: tipoEscuelas,
            placeholder: "Selecciona una opción",
            required: true,
        },

    ];
    const camposCargamasiva = [
        {
            name: "file",
            label: "Formato",
            type: "file",
            placeholder: "carga tu archivo",
            required: true,
        }

    ];

    const tablaFormCampos = <>
        <div className="w-100 mb-3  d-flex justify-content-center align-items-center">
            <div className="text-center">
                <table className="main-table mb-3">
                    <thead>
                        <tr>
                            <th>1</th><th>2</th><th>3</th><th>4</th><th>5</th>
                            <th>6</th><th>7</th><th>8</th><th>9</th><th>10</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input style={{ width: "70px" }} value={tablaForm.uno} onChange={handleTableFormChange} type="number" name="uno" /></td>
                            <td><input style={{ width: "70px" }} value={tablaForm.dos} onChange={handleTableFormChange} type="number" name="dos" /></td>
                            <td><input style={{ width: "70px" }} value={tablaForm.tres} onChange={handleTableFormChange} type="number" name="tres" /></td>
                            <td><input style={{ width: "70px" }} value={tablaForm.cuatro} onChange={handleTableFormChange} type="number" name="cuatro" /></td>
                            <td><input style={{ width: "70px" }} value={tablaForm.cinco} onChange={handleTableFormChange} type="number" name="cinco" /></td>
                            <td><input style={{ width: "70px" }} value={tablaForm.seis} onChange={handleTableFormChange} type="number" name="seis" /></td>
                            <td><input style={{ width: "70px" }} value={tablaForm.siete} onChange={handleTableFormChange} type="number" name="siete" /></td>
                            <td><input style={{ width: "70px" }} value={tablaForm.ocho} onChange={handleTableFormChange} type="number" name="ocho" /></td>
                            <td><input style={{ width: "70px" }} value={tablaForm.nueve} onChange={handleTableFormChange} type="number" name="nueve" /></td>
                            <td><input style={{ width: "70px" }} value={tablaForm.diez} onChange={handleTableFormChange} type="number" name="diez" /></td>
                        </tr>
                    </tbody>
                </table>
                <table className="main-table">
                    <thead>
                        <tr>
                            <th>11</th><th>12</th><th>13</th><th>14</th><th>15</th>
                            <th>16</th><th>17</th><th>18</th><th>19</th><th>20</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input style={{ width: "70px" }} value={tablaForm.once} onChange={handleTableFormChange} type="number" name="once" /></td>
                            <td><input style={{ width: "70px" }} value={tablaForm.doce} onChange={handleTableFormChange} type="number" name="doce" /></td>
                            <td><input style={{ width: "70px" }} value={tablaForm.trece} onChange={handleTableFormChange} type="number" name="trece" /></td>
                            <td><input style={{ width: "70px" }} value={tablaForm.catorce} onChange={handleTableFormChange} type="number" name="catorce" /></td>
                            <td><input style={{ width: "70px" }} value={tablaForm.quince} onChange={handleTableFormChange} type="number" name="quince" /></td>
                            <td><input style={{ width: "70px" }} value={tablaForm.dieciseis} onChange={handleTableFormChange} type="number" name="dieciseis" /></td>
                            <td><input style={{ width: "70px" }} value={tablaForm.diecisiete} onChange={handleTableFormChange} type="number" name="diecisiete" /></td>
                            <td><input style={{ width: "70px" }} value={tablaForm.dieciocho} onChange={handleTableFormChange} type="number" name="dieciocho" /></td>
                            <td><input style={{ width: "70px" }} value={tablaForm.diecinueve} onChange={handleTableFormChange} type="number" name="diecinueve" /></td>
                            <td><input style={{ width: "70px" }} value={tablaForm.veinte} onChange={handleTableFormChange} type="number" name="veinte" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
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
    const camposCargamasivaCrear = crearCampos(camposCargamasiva);
    useEffect(() => {
        obtener(
            `${import.meta.env.VITE_BACKEND_URL
            }/recursos_humanos/api/estructura-organizacional/obtener-lista/estructuras-organizacionales`
        );

        obtenerTiposEscuelas(
            `${import.meta.env.VITE_BACKEND_URL
            }/recursos_humanos/escuelas/obtenerTiposDeEscuelas`
        );
    }, []);
    useEffect(() => {

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
    }, [responseObtenidos, responseTiposEscuelasObtenidos]);
    useEffect(() => {
        if (!loadingAgregado) {
            if (responseAgregado) {
                const tipoId = parseInt(responseAgregado.tipo, 10); // Convertir a número
                const matchingItem = responseTiposEscuelasObtenidos.find(el => el.id === tipoId); // Buscar en array2
                if (matchingItem) {
                    responseAgregado.tipo = matchingItem.nombre; // Actualizar con el nombre correspondiente
                }
                // Mostrar mensaje según sea agregar o actualizar
                if (isEdit) {
                    Swal.fire({
                        title: "Estructura actualizada correctamente",
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
                        title: "Se guardó la estructura correctamente",
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
    useEffect(() => {
        if (!loadingEliminado) {
            if (responseEliminado) {
                Swal.fire({
                    title: "Se eliminó la estructura correctamente",
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
                    title: "Hubo un error al eliminar la estructura",
                    icon: "error",
                    confirmButtonText: "Cerrar",
                });
            }
        }
    }, [loadingEliminado, responseEliminado, errorEliminado]);
    useEffect(() => {
        if (!loadingCargaMasivaAgregado) {
            if (responseCargaMasivaAgregado) {

                obtener(
                    `${import.meta.env.VITE_BACKEND_URL
                    }/recursos_humanos/api/estructura-organizacional/obtener-lista/estructuras-organizacionales`
                );

                Swal.fire({
                    title: "Se guardó la estructura correctamente",
                    icon: "success",
                    confirmButtonText: "Aceptar",
                });

                setTypeRender(0); // Volver a la vista de tabla
            } else if (errorCargaMasivaAgregado) {
                Swal.fire({
                    title: "Hubo un error al guardar la estructura",
                    icon: "error",
                    confirmButtonText: "Cerrar",
                });
            }
        }
    }, [loadingCargaMasivaAgregado, responseCargaMasivaAgregado, errorCargaMasivaAgregado]);
    return (
        <>
            <Card
                title={
                    typeRender === 1
                        ? "Agregar estructura"
                        : typeRender === 2
                            ? "Editar estructura"
                            : typeRender === 3
                                ? "Carga masiva " : "Estructura organizacional"
                }
                back={typeRender === 1 || typeRender === 2 || typeRender === 3 ? handleBack : null}
                show={typeRender === 0}
            >
                {typeRender === 0 && (

                    <Table
                        buttonName={"Nueva estructura"}
                        buttonName2={"Carga Masiva"}
                        tableDesign={"estructura-organizacional"}
                        data={data}
                        columns={columns}
                        modalNewElement={formAgregar}
                        modalNewElement2={formCargaMasiva}
                    />

                )}
                {typeRender === 1 && (
                    <>

                        <CustomForm
                            onSubmit={handleAgregar}
                            fields={camposCrear}
                            extraChild={tablaFormCampos}
                            buttonText="Guardar"
                        />
                    </>

                )}
                {typeRender === 2 && (
                    <CustomForm
                        onSubmit={handleActualizar}
                        fields={camposEditar}
                        extraChild={tablaFormCampos}
                        buttonText="Guardar"
                    />
                )}
                {typeRender === 3 && (
                    <CustomForm
                        onSubmit={handleCargaMasiva}
                        fields={camposCargamasivaCrear}
                        buttonText="Guardar"
                    />
                )}
            </Card>
            <CustomModal
                open={openModalEliminar}
                close={handleCancel}
                ok={handleEliminar}
                title={"Eliminar estructura"}
                messageButtonOk={"Eliminar"}
            >
                <p>¿Estás seguro que quieres eliminar la estructura?</p>
            </CustomModal>
        </>
    );
};

export default EstructuraOrganizacional;