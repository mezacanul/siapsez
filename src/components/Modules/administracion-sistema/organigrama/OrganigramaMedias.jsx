import React, { useEffect, useState } from 'react';
import Layout from '../../../Layout';
import useGetRequest from '../../../../hooks/useGetRequest';

const OrganigramaMedias = () => {
    const [data, setData] = useState([]); // Datos del organigrama
    const [expanded, setExpanded] = useState({}); // Estado de nodos expandidos
    const { getData, loading, error, response } = useGetRequest(); // Hook personalizado

    // Cargar los datos iniciales del nodo raíz
    useEffect(() => {
        getData(`${import.meta.env.VITE_BACKEND_URL}/recursos_humanos/organigrama/obtenerOrganigrama/0`);
    }, []);

    // Actualiza los datos al recibir la respuesta inicial sin duplicar nodos
    useEffect(() => {
        if (response) {
            setData(prevData => mergeData(prevData, response)); // Mantenemos la estructura previa sin duplicados
        }
    }, [response]);

    const handleRowClick = async (id) => {
        if (expanded[id]) {
            // Si ya está expandido, lo colapsamos
            setExpanded(prev => ({ ...prev, [id]: false }));
        } else {
            // Obtener los hijos del nodo seleccionado
            await getData(
                `${import.meta.env.VITE_BACKEND_URL}/recursos_humanos/organigrama/obtenerOrganigrama/${id}`
            );

            if (response) {
                setData(prevData => addChildrenToNode(prevData, id, response));
                setExpanded(prev => ({ ...prev, [id]: true }));
            }
        }
    };

    // Combinar los datos sin duplicar nodos ya existentes
    const mergeData = (prevData, newData) => {
        const newIds = new Set(newData.map(item => item.id));
        const filteredPrevData = prevData.filter(node => !newIds.has(node.id)); // Eliminar duplicados

        const merged = [...filteredPrevData, ...newData].map(item => ({
            ...item,
            children: item.children || [],
        }));
        return merged;
    };

    // Agregar hijos al nodo correspondiente sin perder la estructura
    const addChildrenToNode = (nodes, id, children) => {
        return nodes.map(node => {
            if (node.id === id) {
                return { ...node, children: children.map(child => ({ ...child, children: [] })) };
            }
            if (node.children.length > 0) {
                return { ...node, children: addChildrenToNode(node.children, id, children) };
            }
            return node;
        });
    };

    const renderRow = (item, level = 0) => (
        <React.Fragment key={item.id}>
            <li className='list-group-item d-flex justify-content-between align-items-center'>
                <p style={{ paddingLeft: `${level * 20}px`, marginBottom: 0 }}>{item.puesto}</p>
                {item.tieneHijos && (
                    <button className='btn btn-custom-primary' onClick={() => handleRowClick(item.id)}>
                        {expanded[item.id] ? 'Colapsar' : 'Expandir'}
                    </button>
                )}
            </li>
            {expanded[item.id] && item.children.map(child => renderRow(child, level + 1))}
        </React.Fragment>
    );

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Layout>
            <ul className='list-group'>
                {data.map(item => renderRow(item))}
            </ul>
        </Layout>
    );
};

export default OrganigramaMedias;
