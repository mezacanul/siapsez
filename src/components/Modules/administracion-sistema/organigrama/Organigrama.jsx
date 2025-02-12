import React, { useEffect, useState } from "react";
import usePostRequest from "../../../../hooks/usePostRequest";
import { Select } from "antd";
import useGetRequest from "../../../../hooks/useGetRequest";
import Card from "../../../utilities/card/Card";
import { Empty } from "antd";
import { IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Organigrama = () => {
  const [data, setData] = useState([]); // Datos del organigrama
  const [idInsert, setIdInsert] = useState(0); // ID del nodo a insertar
  const [expanded, setExpanded] = useState([]); // Estado de nodos expandidos
  const [oficinasCentrales, setOficinasCentrales] = useState([]);
  const [regiones, setRegiones] = useState([]);
  const [supervision, setSupervision] = useState([]);
  const [escuelas, setEscuelas] = useState([]);
  const [regionId, setRegionId] = useState(null);
  const [supervisionId, setSupervisionId] = useState(null);
  const [escuelaId, setEscuelaId] = useState(null);
  const [oficinasCentralesId, setOficinasCentralesId] = useState(null);
  const [empty, setEmpty] = useState(null);

  let organigrama = {
    oficinasCentralesId: null,
    regionId: null,
    supervisionId: null,
    escuelaId: null,
    puestoSuperiorId: 0,
  };

  const { postData, loading, error, response } = usePostRequest(); // Hook personalizado
  const {
    getData: obtenerOficinasCentrales,
    loading: loadingOficinasCentrales,
    error: errorOficinasCentrales,
    response: responseOficinasCentrales,
  } = useGetRequest(); // Hook personalizado
  const {
    getData: obtenerRegiones,
    loading: loadingRegiones,
    error: errorRegiones,
    response: responseRegiones,
  } = useGetRequest(); // Hook personalizado
  const {
    getData: obtenerSupervisiones,
    loading: loadingSupervisiones,
    error: errorSupervisiones,
    response: responseSupervisiones,
  } = useGetRequest(); // Hook personalizado
  const {
    getData: obtenerEscuelas,
    loading: loadingEscuelas,
    error: errorEscuelas,
    response: responseEscuelas,
  } = useGetRequest(); // Hook personalizado

  // Cargar los datos iniciales del nodo raíz
  useEffect(() => {
    obtenerOficinasCentrales(
      `${import.meta.env.VITE_BACKEND_URL
      }/recursos_humanos/oficinasCentrales/obteneroficinasCentrales`
    );
  }, []);

  // Al cambiar una oficina central, carga las regiones correspondientes
  useEffect(() => {
    if (oficinasCentralesId) {
      obtenerRegiones(
        `${import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/region/obtenerRegionPorOficinaId/${oficinasCentralesId}`
      );
    }
    setRegiones(null); // Resetea las opciones del Select de regiones
    setRegionId(null); // Resetea el valor seleccionado
    setSupervision(null); // Resetea las opciones del Select de supervisión
    setSupervisionId(null); // Resetea el valor seleccionado
    setEscuelas(null); // Resetea las opciones del Select de escuelas
    setEscuelaId(null); // Resetea el valor seleccionado
  }, [oficinasCentralesId]);

  // Al cambiar una región, carga las supervisiones correspondientes
  useEffect(() => {
    if (regionId) {
      obtenerSupervisiones(
        `${import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/supervision/obtenerSupervisionPorRegionId/${regionId}`
      );
    }
    setSupervision([]); // Resetea las opciones del Select de supervisión
    setSupervisionId(null); // Resetea el valor seleccionado
    setEscuelas([]); // Resetea las opciones del Select de escuelas
    setEscuelaId(null); // Resetea el valor seleccionado
  }, [regionId]);

  // Al cambiar una supervisión, carga las escuelas correspondientes
  useEffect(() => {
    if (supervisionId) {
      obtenerEscuelas(
        `${import.meta.env.VITE_BACKEND_URL
        }/recursos_humanos/escuelas/obtenerEscuelaPorSupervisionId/${supervisionId}`
      );
    }
    setEscuelas([]); // Resetea las opciones del Select de escuelas
    setEscuelaId(null); // Resetea el valor seleccionado
  }, [supervisionId]);

  // Actualiza los datos al recibir la respuesta inicial sin duplicar nodos
  useEffect(() => {
    if (response) {
      if (data.length === 0) {
        // Significa que es el primer nodo
        const updatedData = response.map((item) => ({
          ...item,
          children: [], // Inicializa la propiedad children
        }));
        setData(updatedData);
      } else {
        // Ya hay nodos, se debe agregar el nuevo nodo
        let tree = [...data]; // Clonamos el array para no mutar el estado
        const updatedResponse = response.map((item) => ({
          ...item,
          children: [], // Inicializa la propiedad children
        }));
        addChildToTree(tree, idInsert, updatedResponse);
        setData(tree);
      }
      setEmpty(response.length === 0);
    }
  }, [response]);

  function addChildToTree(tree, targetId, newChildren) {
    for (let node of tree) {
      if (node.puestoId === targetId) {
        // Verifica si los hijos ya están presentes
        if (!node.children) {
          node.children = [];
        }

        const existingIds = node.children.map((child) => child.puestoId);
        const uniqueChildren = newChildren.filter(
          (child) => !existingIds.includes(child.puestoId)
        );

        // Agrega solo los hijos que no existen
        node.children.push(...uniqueChildren);
        return true; // Salimos de la función si se agregaron los hijos
      }
      // Llamada recursiva para buscar el nodo en los descendientes
      if (
        node.children &&
        addChildToTree(node.children, targetId, newChildren)
      ) {
        return true;
      }
    }
    return false; // Retornamos false si no se encontró el nodo
  }

  const handleRowClick = async (id) => {
    setIdInsert(id);

    // Alternar el estado de expansión del nodo
    setExpanded((prevExpanded) => {
      if (prevExpanded.includes(id)) {
        return prevExpanded.filter((expandedId) => expandedId !== id); // Colapsar nodo
      } else {
        return [...prevExpanded, id]; // Expandir nodo
      }
    });

    const newNodoOrganigrama = {
      oficinasCentralesId,
      regionId,
      supervisionId,
      escuelaId,
      puestoSuperiorId: id,
    };

    await postData(
      `${import.meta.env.VITE_BACKEND_URL
      }/recursos_humanos/organigrama/obtenerOrganigrama`,
      newNodoOrganigrama
    );
  };

  const renderRow = (item, level = 0) => (
    <React.Fragment key={item.puestoId}>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <p style={{ paddingLeft: `${level * 20}px`, marginBottom: 0 }}>
          {`${item.descripcion}  ${item.nombre !== null ? " - " + item.nombre : ""}`}
        </p>
        {item.tienePersonasACargo && (
          <IconButton onClick={() => handleRowClick(item.puestoId)}>
            {expanded.includes(item.puestoId) ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        )}
      </li>
      {expanded.includes(item.puestoId) &&
        item.children?.map((child) => renderRow(child, level + 1))}
    </React.Fragment>
  );

  const handleBuscarOrganigrama = () => {
    // Limpia el estado antes de realizar la búsqueda
    setData([]);
    setExpanded([]);

    organigrama = {
      oficinasCentralesId,
      regionId,
      supervisionId,
      escuelaId,
      puestoSuperiorId: 0,
    };

    postData(
      `${import.meta.env.VITE_BACKEND_URL
      }/recursos_humanos/organigrama/obtenerOrganigrama`,
      organigrama
    );
  };

  // Actualizan los estados cuando hay una nueva respuesta del servidor
  useEffect(() => {
    if (responseOficinasCentrales) {
      // Transformar la respuesta en el formato de opciones para el select
      const options = responseOficinasCentrales.map((item) => ({
        value: item.id,
        label: `${item.nombre}`,
      }));
      setOficinasCentrales(options);
    }
  }, [responseOficinasCentrales]);

  useEffect(() => {
    if (responseRegiones) {
      // Transformar la respuesta en el formato de opciones para el select
      const options = responseRegiones.map((item) => ({
        value: item.oficinasCentralesId,
        label: `${item.direccion}`,
      }));
      setRegiones(options);
    }

    if (responseSupervisiones) {
      console.log(responseSupervisiones);
      // Transformar la respuesta en el formato de opciones para el select
      const options = responseSupervisiones.map((item) => ({
        value: item.idRegion,
        label: `${item.nombre}`,
      }));
      setSupervision(options);
    }

    if (responseEscuelas) {
      // Transformar la respuesta en el formato de opciones para el select
      const options = responseEscuelas.map((item) => ({
        value: item.supervisionId,
        label: `${item.nombreEscuela}`,
      }));
      setEscuelas(options);
    }
  }, [responseRegiones, responseSupervisiones, responseEscuelas]);

  return (
    <>
      <Card title="Organigrama">
        <div className="d-flex justify-content-between">
          <p>Filtros</p>
          <div>
            <Select
              style={{
                width: 200,
              }}
              placeholder="Selecciona la oficina central"
              options={oficinasCentrales}
              value={oficinasCentralesId}
              onChange={(value) => setOficinasCentralesId(value)}
              className="mx-1"
            />
            <Select
              style={{
                width: 200,
              }}
              placeholder="Selecciona la región"
              options={regiones}
              value={regionId}
              onChange={(value) => setRegionId(value)}
              className="mx-1"
              disabled={!oficinasCentralesId}
            />
            <Select
              style={{
                width: 200,
              }}
              placeholder="Selecciona la supervisión"
              options={supervision}
              value={supervisionId}
              onChange={(value) => setSupervisionId(value)}
              disabled={!regionId}
              className="mx-1"
            />
            <Select
              style={{
                width: 200,
              }}
              placeholder="Selecciona la escuela"
              options={escuelas}
              value={escuelaId}
              onChange={(value) => setEscuelaId(value)}
              className="mx-1"
              disabled={!supervisionId}
            />
            <button
              className="btn btn-custom-primary"
              onClick={handleBuscarOrganigrama}
            >
              Buscar
            </button>
          </div>
        </div>
        <hr />
        {empty && <Empty />}
        <ul className="list-group">{data.map((item) => renderRow(item))}</ul>
      </Card>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  );
};

export default Organigrama;
