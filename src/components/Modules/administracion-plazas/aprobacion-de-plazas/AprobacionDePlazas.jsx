import { AutoComplete, Select } from "antd";
import Card from "../../../utilities/card/Card";
import { useEffect, useState } from "react";
import Table from "../../../utilities/table/Table";
import CustomModal from "../../../utilities/modal/CustomModal";
import ShadowComponent from "../../../utilities/pdf-templates/ShadowComponent";
import FormatoUnicoPersonal from "../../../utilities/pdf-templates/FormatoUnicoPersonal";
import useGetRequest from "../../../../hooks/useGetRequest";
import "./aprobacionDePlazas.css";
import usePostRequest from "../../../../hooks/usePostRequest";
import Swal from "sweetalert2";

const listaDePlazas = () => {
  const [plazas, setPlazas] = useState(null);
  //const [plazaDataCompleta, setPlazaDataCompleta] = useState(null);
  const [currentInfo, setCurrentInfo] = useState(false);

  const {
    getData: obtenerListaPlazas,
    loading: loadingListaPlazasObtenida,
    error: errorListaPlazasObtenida,
    response: responseListaPlazasObtenida,
  } = useGetRequest();

  const {
    getData: obtenerPlazaPorId,
    loading: loadingPlazaPorIdObtenido,
    error: errorPlazaPorIdObtenido,
    response: responsePlazaPorIdObtenido,
  } = useGetRequest();

  const {
    postData: actualizarEstatusPlaza,
    response: responseActualizarEstatusPlaza,
    loading: loadingActualizarEstatusPlaza,
    error: errorActualizarEstatusPlaza,
  } = usePostRequest();

  const [openModal, setOpenModal] = useState(false);

  //const handleBuscar = () => {};

  // Definición de columnas de la tabla
  const columns= [
    {
     header:  "ID",
     accessorKey:  "id",
     filterFn:  "includesString",
    },
    {
     header:  "CVEFED",
     accessorKey:  "cvefed",
     filterFn:  "includesString",
    },
    {
     header:  "Cat",
     accessorKey:  "cat",
     filterFn:  "includesString",
    },
    {
     header:  "Sueldo",
     accessorKey:  "sueldo",
     filterFn:  "includesString",
    },
    {
     header:  "Horas",
     accessorKey:  "hrs",
     filterFn:  "includesString",
    },
    {
     header:  "Estatus",
     accessorKey:  "status",
     filterFn:  "includesString",
     cell: ({  row }) => {
      const statusMapping= {
       1:  "Creado",
       2:  "Aprobado",
       3:  "Rechazado",
       4:  "No permitido",
       5:  "Aprobado especial",
      };
      return statusMapping[row.original.estatus] || "Desconocido";
     },
    },
    {
     header:  "Opciones",
     accessorKey:  "Opciones",
     size:  30,
     cell: ({  row }) => (
      <button
      className="btn btn-custom-primary mx-1"
      onClick={() => handleAprobar(row.original)} // Aquí se llama la función que aprueba la plaza
      >
        Aprobar
      </button>
     ),
    }
   ];

   const handleAprobar = (row) => {
    // Cambia el estatus de la plaza a 5
    actualizarEstatusPlaza(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/recursos_humanos/api/tabe-sp/plazas/actualizar/estatus-plaza`,
      {
        id: parseInt(row.id, 10),
        estatus: 5, // Estatus de aprobado
      }
    );
    setCurrentInfo(row); // Guarda la información de la plaza seleccionada
  };  
  
  
  // const handleRowClick = (row) => {
  //   setCurrentInfo(row);
  //   obtenerPlazaPorId(
  //     `${
  //       import.meta.env.VITE_BACKEND_URL
  //     }/recursos_humanos/api/formatos/fup/obtener-fup/${row.id}`
  //   );
  //   openCloseModal();
  // };

  // const handleActualizarEstatusPlaza = () => {
  //   actualizarEstatusPlaza(
  //     `${
  //       import.meta.env.VITE_BACKEND_URL
  //     }/recursos_humanos/api/formatos/fup/actualizar/estatus-fup`,
  //     {
  //       id: parseInt(currentInfo.id, 10),
  //       estatus: 5,
  //     }
  //   );
  // };

   const openCloseModal = () => setOpenModal(!openModal);
  // const selectedRowModal = (
  //   <div className="d-flex justify-content-center">
  //     <div className="container-PLAZA-aprobacion">
  //       <ShadowComponent>
  //         <FormatoUnicoPersonal data={plazaDataCompleta} />
  //       </ShadowComponent>
  //       <br></br>
  //     </div>
  //   </div>
  // );

  // Hook para obtener los datos de la plaza cuando se monta el componente
  useEffect(() => {
    obtenerListaPlazas(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/recursos_humanos/api/tabe-sp/plazas/obtener-lista/datos/plazas-por-aprobar`
    );
  }, []);

  // Hook para actualizar el estado de las plazas cuando se obtiene la respuesta
  useEffect(() => {
    if (responseListaPlazasObtenida) {
      setPlazas(responseListaPlazasObtenida);
    }
  }, [responseListaPlazasObtenida, responsePlazaPorIdObtenido]);

  useEffect(() => {
    if (!loadingActualizarEstatusPlaza) {
      if (responseActualizarEstatusPlaza) {
        Swal.fire({
          title: "Se aprobó la plaza",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        // Actualiza el estado de las plazas con el nuevo estatus
        setPlazas((prevData) =>
          prevData.map((item) =>
            item.id === currentInfo.id ? { ...item, estatus: 5 } : item
          )
        );
        openCloseModal(); // Cierra el modal
      } else if (errorActualizarEstatusPlaza) {
        Swal.fire({
          title: "Hubo un error al aprobar la plaza",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }
    }
  }, [
    loadingActualizarEstatusPlaza,
    responseActualizarEstatusPlaza,
    errorActualizarEstatusPlaza,
  ]);

  return (
    <>
      <Card title="Aprobación de Plazas">
        <Table
          tableDesign={"control-de-plazas-presupuestales"}
          data={plazas}
          columns={columns}
        />
      </Card>
      {/* <CustomModal
        open={openModal}
        close={openCloseModal}
        ok={handleActualizarEstatusPlaza}
        title="Editar status FUP"
        children={selectedRowModal}
        width="80%"
        messageButtonOk="Aprobar"
      /> */}
    </>
  );
};

export default listaDePlazas;
