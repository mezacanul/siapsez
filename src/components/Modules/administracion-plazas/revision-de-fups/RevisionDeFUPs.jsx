import { Select } from "antd";
import Card from "../../../utilities/card/Card";
import { useEffect, useState } from "react";
import Table from "../../../utilities/table/Table";
import CustomModal from "../../../utilities/modal/CustomModal";
import useGetRequest from "../../../../hooks/useGetRequest";
import ShadowComponent from "../../../utilities/pdf-templates/ShadowComponent";
import FormatoUnicoPersonal from "../../../utilities/pdf-templates/FormatoUnicoPersonal";
import "./revisionDeFups.css";
import usePostRequest from "../../../../hooks/usePostRequest";
import Swal from "sweetalert2";

const listaDeFups = () => {
  const [centroDeTrabajoId, setCentroDeTrabajoId] = useState(null);
  const [estatusId, setEstatusId] = useState(null);
  const [fupCortos, setFupCortos] = useState(null);
  const [fupDataCompleta, setFupDataCompleta] = useState(null);
  const [currentInfo, setCurrentInfo] = useState([]);
  const [centrosDeTrabajo, setCentrosDeTrabajo] = useState([]);
  const [estatus, setEstatus] = useState([]);
  const [estatusSeleccionado, setEstatusSeleccionado] = useState(null); 

  const [openModal, setOpenModal] = useState(false);

  const {
    getData: obtenerListaFupCortos,
    loading: loadingListaFupCortosObtenida,
    error: errorListaFupCortosObtenida,
    response: responseListaFupCortosObtenida,
  } = useGetRequest();

  const {
    getData: obtenerFupPorId,
    loading: loadingFupPorIdObtenido,
    error: errorFupPorIdObtenido,
    response: responseFupPorIdObtenido,
  } = useGetRequest();

  const {
    postData: actualizarEstatusFUP,
    response: responseActualizarEstatusFUP,
    loading: loadingActualizarEstatusFUP,
    error: errorActualizarEstatusFUP,
  } = usePostRequest();

  const handleBuscar = () => {};

  // Definición de columnas de la tabla
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      filterFn: "includesString",
    },
    {
      header: "Centro de trabajo",
      accessorKey: "claveCT",
      filterFn: "includesString",
    },
    {
      header: "Fecha",
      accessorKey: "fecha",
      filterFn: "includesString",
    },
    {
      header: "Estatus",
      accessorKey: "estatus",
      filterFn: "includesString",
      cell: ({ row }) => {
        const statusMapping = {
          1: "Creado",
          2: "Aprobado",
          3: "Rechazado",
          4: "No permitido",
          5: "Aprobado especial",
        };
        return statusMapping[row.original.estatus] || "Desconocido";
      },
    },
  ];

  const handleRowClick = (row) => {
    setCurrentInfo(row);
    obtenerFupPorId(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/recursos_humanos/api/formatos/fup/obtener-fup/${row.id}`
    );
    openCloseModal();
  };

  const handleActualizarEstatusFUP = () => {
    
    if (!estatusSeleccionado || estatusSeleccionado === "0") {
      Swal.fire({
        title: "Seleccione un estatus válido",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    actualizarEstatusFUP(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/recursos_humanos/api/formatos/fup/actualizar/estatus-fup`,
      {
        id: parseInt(currentInfo.id, 10),
        estatus: parseInt(estatusSeleccionado, 10), 
      }
    );
  };

  const openCloseModal = () => {
    setOpenModal(!openModal);
    if (openModal) {
      setEstatusSeleccionado(null); 
    }
  };

  const selectedRowModal = (
    <div>
      <div className="d-flex justify-content-center">
        <div className="container-FUP-revision">
          <ShadowComponent>
            <FormatoUnicoPersonal data={fupDataCompleta} />
          </ShadowComponent>
          <br></br>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div>
          <p>
            Estatus:<br></br>
            <select
            value={estatusSeleccionado || ""} 
            onChange={(e) => setEstatusSeleccionado(e.target.value)} 
          >
              <option value="" disabled hidden>
              Seleccionar un estatus
            </option>
              <option value="2">Aprobado</option>
              <option value="3">Rechazado</option>
              <option value="4">No permitido</option>
              <option value="5">Aprobado especial</option>
            </select>
          </p>
        </div>
        <div className="mx-2">
          <p>
            Documento:<br></br>
            <input type="file"></input>
          </p>
        </div>
      </div>
    </div>
  );

  // Hook para obtener los datos del FUP cuando se monta el componente
  useEffect(() => {
    obtenerListaFupCortos(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/recursos_humanos/api/formatos/fup/obtener-lista/fups-cortos`
    );
  }, []);

  // Actualiza el estado de 'data' cuando hay una nueva respuesta del servidor
  useEffect(() => {
    if (responseListaFupCortosObtenida) {
      setFupCortos(responseListaFupCortosObtenida);
    }
    if (responseFupPorIdObtenido) {
      setFupDataCompleta(responseFupPorIdObtenido);
    }
  }, [responseListaFupCortosObtenida, responseFupPorIdObtenido]);

    useEffect(() => {
      if (!loadingActualizarEstatusFUP) {
        if (responseActualizarEstatusFUP) {
          Swal.fire({
            title: "Se aprobó el FUP",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          setFupCortos((prevData) =>
            prevData.map((item) =>
              item.id === currentInfo.id ? { ...item, estatus: parseInt(estatusSeleccionado, 10) } : item
            )
          );
          openCloseModal();
        } else if (errorActualizarEstatusFUP) {
          Swal.fire({
            title: "Hubo un error al aprobar el FUP",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        }
      }
    }, [
      loadingActualizarEstatusFUP,
      responseActualizarEstatusFUP,
      errorActualizarEstatusFUP,
    ]);

  return (
    <>
      <Card title="Lista de FUPs">
        <Table
          tableDesign={"control-de-plazas-presupuestales"}
          data={fupCortos}
          columns={columns}
          rowClick={handleRowClick}
        />
      </Card>
      <CustomModal
        open={openModal}
        close={openCloseModal}
        ok={handleActualizarEstatusFUP}
        title="Editar status FUP"
        children={selectedRowModal}
        width="80%"
        messageButtonOk="Guardar"
      />
    </>
  );
};

export default listaDeFups;
