import React from 'react';
import barra1 from './assets/Barra1LicenciaSinGoceDeSueldo.png';
import barra2 from './assets/Barra2LicenciaSinGoceDeSueldo.png';
import HeaderLicenciaSinGoceDeSueldo from './assets/HeaderLicenciaSinGoceDeSueldo.png';
import './css/HojaDeServicio.css';

const HojaDeServicio = React.forwardRef((props, ref) => {
    const oficio = '0795',
        expediente = '\\2024',
        name = 'C. ORTIZ MORENO ANA LILIA',
        data = [
            {
                year: '1992',
                month: 'Septiembre',
                grade: '1°',
                desc: '2Educadora "TA", en el J.N. "CRI-CRI", ubicado en Monte Escobedo, Zac., 1 año, 5 meses, 16 días.'
            },
            {
                year: '1994',
                month: 'Febrero',
                grade: '17',
                desc: '2Director, "TA", en el J.N. "COLIBRI", ubicado en Monte Escobedo, Zac., 2 años, 14 días.'
            }
            ,
            {
                year: '1996',
                month: 'Marzo',
                grade: '1°',
                desc: 'LICENCIA POR 5 MESES, 29 DÍAS, SIN GOCE DE SUELDO.'
            }
            ,
            {
                year: '1996',
                month: 'Agosto',
                grade: '30',
                desc: '2Director CM "TA", reanuda en el J.N. "COLIBRI", ubicado en Monte Escobedo, Zac., 1 año, 2 días.'
            }
            ,
            {
                year: '1997',
                month: 'Septiembre',
                grade: '1°',
                desc: '2Director CM "TA", en el J.N. "CRI-CRI", ubicado en Monte Escobedo, Zac., 4 meses, 15 días.'
            }
            ,
            {
                year: '1998',
                month: 'Enero',
                grade: '16',
                desc: '2Director CM "TB", en el J.N. "COLIBRI", ubicado en Monte Escobedo, Zac., 2 años, 8 meses, 23 días.'
            }
        ],
        workingYears = '31 AÑOS, 11 MESES, 2 DÍAS.'
    return (
        <div ref={ref}>
            <div className="carta">
                <div className='w-100 text-start'>
                    <img className='barra1' src={barra1} alt='...' />
                    <img className='barra2' src={barra2} alt='...' />
                </div>
                <div className='w-100' >

                    <div className='contact-data'>
                        <table className='w-100'>
                            <tr className='w-50'>
                                <td className='w-50'>
                                    <div className='center-items'>
                                        <img src="https://img.icons8.com/ios/20/marker--v1.png" alt="marker--v1" />
                                        <p>Lateral López Portillo No. 305, Col. Dependencias Federales C.P. 98618, Guadalupe, Zacatecas, México <br />
                                            *MCSF/AVT/LAA/ERF/mgc</p>
                                    </div>
                                </td>
                                <td className='w-50'>

                                    <div className='end-items'>
                                        <img src="https://img.icons8.com/ios/20/phone--v1.png" alt="phone--v1" /> <p>&nbsp; 492 923 9600 Ext. 5622</p>
                                    </div>
                                </td>


                            </tr>
                            <tr className='w-50'>
                                <td>
                                    <div className='center-items'>
                                        <img src="https://img.icons8.com/ios/20/globe--v1.png" alt="globe--v1" />
                                        <p>&nbsp; www.seduzac.gob.mx</p>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div style={{ textAlign: "center" }}>
                    <img className='header' src={HeaderLicenciaSinGoceDeSueldo} alt='...' />
                </div>
                <div className='fist-data'>
                    <table style={{ width: "100%" }}>
                        <tr>
                            <td className='text-end'><b>Núm. de Oficio:</b></td>
                            <td><b>{oficio}</b></td>
                        </tr>
                        <tr>
                            <td className='text-end'><b>Expediente H.S.</b></td>
                            <td><b>{expediente}</b></td>
                        </tr>
                    </table>
                </div>
                <div className='w-100' >
                    <p><b>ASUNTO: HOJA DE SERVICIO</b></p>
                    <p className='text-start'><b>LA QUE SUSCRIBE, JEFA DEL DEPARTAMENTO DE PLAZAS ESTATALES DE LA SECRETARÍA DE EDUCACIÓN DEL ESTADO DE ZACATECAS.</b></p>
                    <p className='spacing-2'><b>HACE CONSTAR:</b></p>
                    <p className='text-start'>Que el (la)  <b>{name}</b>, ha estado prestando sus Servicios en el Estado, de acuerdo a los documentos
                        que obran en el expediente de esta secretaría, en la forma que a continuación se expresa:</p>
                </div>
                <div className='w-100'>
                    <table className='w-100 text-start'>
                        {data.map(item => (
                            <tr>
                                <td>{item.year}</td>
                                <td><b>{item.grade}</b></td>
                                <td>{item.month}</td>
                                <td className='w-75'>{item.desc}</td>
                            </tr>
                        ))
                        }
                    </table>
                </div>
                <div className='w-100'>
                    <br />
                    <p><b>TOTAL AÑOS DE SERVICIO: {workingYears}</b></p>
                    <br />
                    <br />
                    <br />
                    <br />
                    <p>Se extiende la presente en la Ciudad de Zacatecas Capital del Estado del mismo nombre
                        a los veintinueve días del mes de agosto del dos mil veinticuatro, para los usos y fines
                        legales que al mismo le convengan.</p>
                    <p><b>SOCIEDAD INFORMADA Y CON VALORES</b></p>
                    <p>#juutossomospaz</p>
                    <br />
                    <br />
                    <p><b>L.C. EDITTH RUELAS FLORES</b></p>
                </div>
            </div>
        </div>
    )
})

export default HojaDeServicio