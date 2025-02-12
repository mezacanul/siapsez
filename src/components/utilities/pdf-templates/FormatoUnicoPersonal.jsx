import React from 'react';
import logo from './assets/HeaderLicenciaSinGoceDeSueldo.png';


const FormatoUnicoPersonal = React.forwardRef((props, ref) => {
    

    return (<>
        <link rel="stylesheet" href="/css/FormatoUnicoPersonal.css" />
        <div ref={ref} >
            <div className="carta">
                <div className="w-100">
                    <table >
                        <thead>
                            <tr>
                                <th className='w-30'>
                                    <img width={"100%"} src={logo} alt="Logo" />
                                </th>
                                <th className='w-30'>
                                    <h2>Formato Unico de Personal</h2>
                                </th>
                                <th className='w-30 bordered'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>NUMERO DE EMPLEADO</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{props.data?.numeroDeEmpleado}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className='bordered'>
                    <table>
                        <thead>
                            <tr>
                                <th>Región</th>
                                <th>Tipo de Movimiento</th>
                                <th>Tipo de Nómina</th>
                                <th>Seguro Social</th>
                                <th>Fecha</th>
                                <th>Folio</th>
                                <th>Centro de Trabajo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{props.data?.region}</td>
                                <td>{props.data?.tipoMovimiento}</td>
                                <td>{props.data?.tipoNomina}</td>
                                <td>{props.data?.seguroSocial}</td>
                                <td>{props.data?.fecha}</td>
                                <td>{props.data?.folio}</td>
                                <td>{props.data?.centroTrabajo}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='bordered'>
                    <table>
                        <thead>
                            <tr>
                                <th>R.F.C.</th>
                                <th>Primer Apellido</th>
                                <th>Segundo Apellido</th>
                                <th>Nombre(s)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{props.data?.rfc}</td>
                                <td>{props.data?.apellidoPaterno}</td>
                                <td>{props.data?.apellidoMaterno}</td>
                                <td>{props.data?.nombre}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="bordered">
                    <table>
                        <thead>
                            <tr>
                                <th rowspan="2">CURP</th>
                                <th rowspan="2">Sexo</th>
                                <th colspan="2">Antigüedad</th>
                                <th rowspan="2">Nivel máximo de preparación</th>
                                <th colspan="2">Asignación percibo-deducción</th>
                            </tr>
                            <tr>
                                <th>S.E.P.</th>
                                <th>RAMA</th>
                                <th>Concepto</th>
                                <th>Importe</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{props.data?.curp}</td>
                                <td>{props.data?.genero}</td>
                                <td colspan="2">{props.data?.antiguedad}</td>
                                <td>{props.data?.nivelMaximoEstudios}</td>
                                <td>{props.data?.asignacionPerciboReduccionConcepto}</td>
                                <td>{props.data?.asignacionPerciboReduccionImporte}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="bordered">
                    <table>
                        <thead>
                            <tr>
                                <th colspan="4">CÓMPENSACIONES Y PRESTACIONES</th>
                                <th colspan="2">EFECTOS</th>
                            </tr>
                            <tr>
                                <th>PARTIDA</th>
                                <th>TOTAL</th>
                                <th>IMPUESTO</th>
                                <th>TOTAL A PAGAR</th>
                                <th>DESDE</th>
                                <th>HASTA</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{props.data?.compensacionPartida}</td>
                                <td>{props.data?.compensacionTotal}</td>
                                <td>{props.data?.compensacionImpuesto}</td>
                                <td>{props.data?.compensacionTotalAPagar}</td>
                                <td>{props.data?.compensacionDesde}</td>
                                <td>{props.data?.compensacionHasta}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="bordered">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <h3 style={{ margin: 5, textAlign: 'center' }}>Observaciones</h3>
                                    <p>{props.data?.observaciones}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="bordered">


                    <h4 style={{ margin: 5, textAlign: 'center' }}>MOVIMIENTOS</h4>
                    <table>
                        <thead>
                            <tr>
                                <th rowSpan='2'>TIPO MOV.</th>
                                <th rowSpan='2'>CLAVE FEDERAL</th>
                                <th colSpan='2'>PLAZA/S A MODIFICAR</th>
                                <th colSpan='2'>EFECTOS</th>
                                <th rowSpan='2'>DOCUMENTACIÓN ANEXA</th>
                            </tr>
                            <tr>
                                <th>PUESTO</th>
                                <th>CAT.</th>
                                <th>DESDE</th>
                                <th>HASTA</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{props.data?.movimientoTipoMovimiento}</td>
                                <td>{props.data?.movimientoclaveFederal}</td>
                                <td>{props.data?.movimientoPuesto}</td>
                                <td>{props.data?.movimientoCAT}</td>
                                <td>{props.data?.movimientoDesde}</td>
                                <td>{props.data?.movimientosHasta}</td>
                                <td>{props.data?.moviminetosDocumentacionAnexa}</td>
                            </tr>
                        </tbody>
                    </table>

                    <table>
                        <thead>
                            <tr>
                                <th>Tipo Mov.</th>
                                <th>Motivo Mov.</th>
                                <th>Código Plaza</th>
                                <th>Unidad</th>
                                <th>Subi</th>
                                <th>Clave Federal</th>
                                <th>Horas</th>
                                <th>Código</th>
                                <th>Desde</th>
                                <th>Hasta</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{props.data?.movimientoTipoMovimiento2}</td>
                                <td>{props.data?.movimientoMotivoMovimiento}</td>
                                <td>{props.data?.movimientoCodigoPlaza}</td>
                                <td>{props.data?.movimientoUnidad}</td>
                                <td>{props.data?.movimientoSubi}</td>
                                <td>{props.data?.movimientoclaveFederal2}</td>
                                <td>{props.data?.movimientoHoras}</td>
                                <td>{props.data?.movimientoCodigo}</td>
                                <td>{props.data?.movimientoDesde2}</td>
                                <td>{props.data?.movimientoHasta2}</td>
                            </tr>
                            <tr>
                                <td colspan="5">
                                    Descripción Puesto o Categoría:{props.data?.descripcionPuestpOCategoria}
                                </td>
                                <td colspan="5">
                                    Nuevo centro de trabajo: {props.data?.nuevoCentroDeTrabajo}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <h4 style={{ margin: 5, textAlign: 'center' }}> DATOS DEL (LOS) SUSTITUÍDO(S)</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>No. EMP</th>
                                <th>Tipo Nómina</th>
                                <th>R.F.C.</th>
                                <th>CURP</th>
                                <th>Primer Apellido</th>
                                <th>Segundo Apellido</th>
                                <th>Nombre(s)</th>
                                <th>Motivo</th>
                                <th>Desde</th>
                                <th>Hasta</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{props.data?.datosNoEemp}</td>
                                <td>{props.data?.datosTipoDeNomina}</td>
                                <td>{props.data?.datosRFC}</td>
                                <td>{props.data?.datosCURP}</td>
                                <td>{props.data?.datosPrimerApellido}</td>
                                <td>{props.data?.datosSegundoApellido}</td>
                                <td>{props.data?.datosNombre}</td>
                                <td>{props.data?.datosMotivo}</td>
                                <td>{props.data?.datosdesde}</td>
                                <td>{props.data?.datosHasta}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h4 style={{ margin: 5, textAlign: 'center' }}>DATOS DEL RECURSO</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>No. EMP</th>
                                <th>Tipo Nómina</th>
                                <th>R.F.C.</th>
                                <th>CURP</th>
                                <th>Primer Apellido</th>
                                <th>Segundo Apellido</th>
                                <th>Nombre(s)</th>
                                <th>Motivo</th>
                                <th>Desde</th>
                                <th>Hasta</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{props.data?.recursoNoEmp}</td>
                                <td>{props.data?.recursoTipoDeNomina}</td>
                                <td>{props.data?.recursoRFC}</td>
                                <td>{props.data?.recursoCURP}</td>
                                <td>{props.data?.recursoPrimerApellido}</td>
                                <td>{props.data?.recursoSegundoApellido}</td>
                                <td>{props.data?.recursoNombre}</td>
                                <td>{props.data?.recursoMotivo}</td>
                                <td>{props.data?.recursodesde}</td>
                                <td>{props.data?.recursoHasta}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h4 style={{ margin: 5, textAlign: 'center' }}>AUTORIZACIONES PARA EL PROCESO</h4>
                    <div className="signatures">
                        <table className='' >
                            <thead>
                                <tr>
                                    <th colSpan="2" >ELABORA</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ height: "1.3in" }}>
                                        <p style={{ marginTop: "1in" }}>FIRMA</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <table >
                            <thead>
                                <tr>
                                    <th colSpan="2" style={{ textAlign: 'center' }}>REVISA</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ height: "1.3in" }}>
                                        <p style={{ marginTop: "1in" }}>FIRMA</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table >
                            <thead>
                                <tr>
                                    <th colSpan="2" style={{ textAlign: 'center' }}>AUTORIZA</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ height: "1.3in" }}>
                                        <p style={{ marginTop: "1in" }}>FIRMA</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
});

export default FormatoUnicoPersonal;
