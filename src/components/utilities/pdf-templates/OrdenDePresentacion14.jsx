import React from "react";

import barraVertical from './assets/BarraVertical.png'
import barraHorizontal from './assets/BarraHorizontal.png'
import HeaderSEZACD from './assets/LogoSEZACD.jpg'
import Direccion from './assets/iconoUbicacion.png'
import Telefono from './assets/iconoTelefono.png'
import Web from './assets/iconoWeb.png'
import './css/OrdenDePresentacion14.css'


const OrdenDePresentacion14 = React.forwardRef((props, ref) => {

    const 
    fecha = 'Guadalupe, Zac., a 18 de julio de 2024',
    presente = 'C. Sánches Luna Jaime',
    cicloEscolar = '2024-2025',
    nivel = 'Nivel de Personal de Apoyo',
    forma = 'Temporal',
    categoria = 'ADMINISTRATIVO(A)',
    proceso = 'INTERINATO',
    clavePresupuestal = '1103075412A0380400.0200921',
    nuevoCentroTrabajo = '32ADG0118F',
    efectos = 'Del 16 de agosto de 2024 al 15 agosto de 2025',
    region = '0',
    zona = '0',
    nuevoCT = 'Departamento de Plazas Estatales',
    localidad = 'Guadalupe',
    municipio = 'Guadalupe',
    recurso = 'Martinez Gallegos Eliza',
    motivo1 = 'jubilación',
    sustituye = '',
    motivo2 = '',
    director = 'E. O. LUCERO ARELY AGUILERA LUNA'

    return (
        <div ref={ref}>
            <div className='carta'>
                <div className='w-100 text-start'>
                    <img className='barraVertical' src={barraVertical} alt='...' />
                </div>
                <div className='w-100'>
                    <img className='barraHorizontal' src={barraHorizontal} alt="..." />
                </div>

                <div style={{ textAlign: 'center' }}>
                    <img className='header' src={HeaderSEZACD} alt='...' />
                </div>

                <div className='title-large'>
                    ORDEN DE PRESENTACIÓN No 14
                </div>

                <div className='date'>
                    {fecha}
                </div>

                <div className='highlight-text'>
                    <p>
                        {presente} <br />
                        Presente
                    </p>
                </div>

                <div className='general-text'>
                    <p>
                        Con fundamento en lo establecido en el articulo 63, fraccion XV y XXI del Reglamento Interior de la
                        Secretaria de Educacion; para el ciclo escolar {cicloEscolar} del <strong>{nivel}</strong>, tengo a bien extender a 
                        Usted la Orden de Presentacion de forma <strong>{forma}</strong> con la categoria de <strong>{categoria},</strong> la cual debera de
                        entregar ante la Autoridad Superior Inmediato para su conocimiento, proporcionando los siguientes datos:
                    </p>
                </div>

                <div className='proces-text'>
                    <p>
                        Tipo de Proceso: <strong>{proceso}</strong>
                    </p>
                </div>

                <div className='list-text'>
                    <p>
                        <strong>Clave Presopuestal:</strong> {clavePresupuestal}<br />
                        <strong>Nuevo Centro de Trabajo:</strong> {nuevoCentroTrabajo}<br />
                        <strong>Efecto:</strong> {efectos}<br />
                        <strong>Regin:</strong> {region}<br />
                        <strong>Zona:</strong> {zona}<br />
                        <strong>Nombre del Nuevo C.T.:</strong>{nuevoCT}<br />
                        <strong>Localidad:</strong> {localidad}<br />
                        <strong>Municipio:</strong> {municipio}<br />
                    </p>
                </div>

                <div className='rectangular-section w-100'>
                    <table>
                        <tr>
                            <td>
                                <strong>Recurso:</strong> {recurso}
                            </td>
                            <td className='separated-column'>
                                <strong>Motivo:</strong> {motivo1}
                            </td>
                        </tr>
                        <tr>
                            <td >
                                <strong>Sustituye:</strong> {sustituye}
                            </td>
                            <td className='separated-column'>
                                <strong>Motivo:</strong> {motivo2}
                            </td>
                        </tr>
                    </table>
                </div>

                <div className='general-text'>
                    <p>
                        El presente documento deberá de entregarlo el día siguietne ante la autoridad antes mencionada, para 
                        darle posesíon de su empleo. La autoridad inmediata dispondrá de 3 días hábiles pata entregar el área de
                        Personal de la Dirección Regional correspondiente, el inicio de labores y horario de trabajo respectivo, asimimo 
                        área de personal de la Dirección Regional educativa remitirá la documentación al nivel educativo.
                    </p>
                </div>

                <div className='general-text'>
                    <p>
                        Esta orden de presentacíon quedará insubsistente, si con posterioridad se detecta por la autoridad
                        competente, que no se cumplió con los requisitos correspondientes en la Convocatoria o no se presentó a tomar
                        posesión del empleo en la fecha indicada en el párrafo anterior, sin responsabilidad para la Secretaría de Educación.
                    </p>
                </div>

                <div className='signature-text large-separation'>
                    <p>
                        ATENTAMENTE
                    </p>
                </div>

                <div className='signature-text middle-separation'>
                    <p>
                        {director} <br />
                        DIRECTORA DE CAPITAL HUMANO
                    </p>
                </div>

                <div className='w-100'>
                    <table className='w-100'>
                        <tr className='w-50'>
                            <td className='w-50'>
                                <div className='center-items'>
                                    <img src={Direccion} alt='marker--v1' />
                                    <p>Lateral López Portillo No. 305, Col. Dependencias Federales C.P. 98618, Guadalupe, Zacatecas, México</p>
                                </div>
                            </td>
                            <td className='w-50'>
                                <div className='end-items'>
                                    <img src={Telefono} alt='phone--v1' /> <p>&nbsp; 492 923 9699 Ext. 5622</p>
                                </div>
                            </td>
                        </tr>
                        <tr className='w-50'>
                            <td>
                                <div className='center-items'>
                                    <img src={Web} alt='globe--v1' />
                                    <p>&nbsp; www.seduzac.gob.mx</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
});

export default OrdenDePresentacion14