import React, { useState } from 'react'
import Layout from '../../../../Layout'
import { OrganizationChart } from 'primereact/organizationchart';
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./organigrama.css"
import Card from '../../../../utilities/card/Card';


const Organigrama = () => {

    const [data] = useState([
        {
            type: 'person',
            data: {
                name: 'Eduardo Pacheco',
                title: 'Director'
            },
            expanded: true,
            children: [
                {
                    type: 'person',
                    expanded: true,
                    data: {
                        name: 'Kevin Meneses',
                        title: 'Tech Leader'
                    },
                    children: [
                        {
                            type: 'person',
                            expanded: true,
                            data: {
                                name: 'Mauricio Hernandez',
                                title: 'developer'
                            },
                            children: [
                                {
                                    type: 'person',
                                    data: {
                                        name: 'Jorge Martinez',
                                        title: 'developer'
                                    },
                                },
                                {
                                    type: 'person',
                                    data: {
                                        name: 'Diego Altamirano',
                                        title: 'developer'
                                    },
                                }
                            ]
                        },
                        {
                            type: 'person',
                            data: {
                                name: 'Isaac Montiel',
                                title: 'developer'
                            },
                        }
                    ]
                },
                {
                    expanded: false,
                    type: 'person',
                    data: {
                        name: 'Alfredo Mendoza',
                        title: 'developer',
                    },
                    children: [
                        {
                            type: 'person',
                            data: {
                                name: 'Alexis Navarro',
                                title: 'developer'
                            },
                        },
                        {
                            type: 'person',
                            data: {
                                name: 'Luis Muñoz',
                                title: 'developer'
                            },
                            children: [
                                {
                                    type: 'person',
                                    data: {
                                        name: 'Alexis Navarro',
                                        title: 'developer'
                                    },
                                },
                                
                            ]
                        }
                    ]
                }
            ]
        }
    ]);

    const nodeTemplate = (node) => {
        if (node.type === 'person' && node.data) {
            return (
                <div className="flex flex-column">
                    <div className="flex flex-column align-items-center">
                        <p className="fw-bold mb-2">{node.data.name}</p>
                        <span>{node.data.title}</span>
                    </div>
                </div>
            );
        }

        return node.label;
    };

    return (
        <Layout>
            <Card title="Organigrama">
                <OrganizationChart value={data} nodeTemplate={nodeTemplate} />
            </Card>
        </Layout>
    )
}

export default Organigrama