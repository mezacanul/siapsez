import React from 'react';
import barra1 from './assets/Barra1LicenciaSinGoceDeSueldo.png';
import barra2 from './assets/Barra2LicenciaSinGoceDeSueldo.png';
import HeaderLicenciaSinGoceDeSueldo from './assets/HeaderLicenciaSinGoceDeSueldo.png';
import './css/LicenciaSinGoceDeSueldo.css';
const LicenciaSinGoceDeSueldo = React.forwardRef((props, ref) => {

    const oficio = 'sez/955/2024',
        area = 'Despacho de la Secretaria',
        asunto = 'Licencia sin goce de sueldo',
        lugar = 'Guadalupe, Zac.',
        fecha = '13 de agosto de 2024',
        name = "Alán Bernardo Arteaga Vilchis",
        numeroDeEmpleado = '456346',
        puestoYCategoria = '2INTENDENTE INA',
        cct = '32EPR0010V',
        escuela = 'Esc. Prim. "Severo Cosío"',
        lugarAdscripcion = 'Guadalupe, Zacatecas',
        PeriodoAutorizado = 'Del 1 de octubre de 2024 al 30 de septiembre de 2025'
    return (
        <div ref={ref}>
            <div className="carta">
                <div className='w-100 text-start'>
                    <img className='barra1' src={barra1} alt='...' />
                    <img className='barra2' src={barra2} alt='...' />
                </div>
                <div style={{ textAlign: "center" }}>
                    <img className='header' src={HeaderLicenciaSinGoceDeSueldo} alt='...' />
                </div>
                <div className='fist-data'>
                    <table style={{ width: "100%" }}>
                        <tr>
                            <td><b>Oficio</b></td>
                            <td>{oficio}</td>
                        </tr>
                        <tr>
                            <td><b>Área</b></td>
                            <td>{area}</td>
                        </tr>
                        <tr>
                            <td><b>Asunto</b></td>
                            <td>{asunto}</td>
                        </tr>
                        <tr>
                            <td><b>Lugar</b></td>
                            <td>{lugar}</td>
                        </tr>
                        <tr>
                            <td><b>Fecha</b></td>
                            <td>{fecha}</td>
                        </tr>
                    </table>
                </div>
                <div className='text-start'>
                    <p className='mb-0'><b>C. {name}</b></p>
                    <p className='mt-0'><b>Presente</b></p>
                    <p className='justify-text'>En referencia a su solicitud recibida el día {fecha}, comunico a usted que <b>ha sido autorizada la licencia sin goce de sueldo</b>, para atender <b>asuntos de carácter personal</b>, de conformidad con los siguientes datos:</p>

                    <table style={{ width: "100%" }}>
                        <tr>
                            <td>Número de empleado:</td>
                            <td><b>{numeroDeEmpleado}</b></td>
                        </tr>
                        <tr>
                            <td>Puesto y categoría:</td>
                            <td><b>{puestoYCategoria}</b></td>
                        </tr>
                        <tr>
                            <td>C.C.T.:</td>
                            <td><b>{cct}</b></td>
                        </tr>
                        <tr>
                            <td>Escuela:</td>
                            <td><b>{escuela}</b></td>
                        </tr>
                        <tr>
                            <td>Lugar de adscripción:</td>
                            <td><b>{lugarAdscripcion}</b></td>
                        </tr>
                        <tr>
                            <td>Periodo autorizado:</td>
                            <td><b>{PeriodoAutorizado}</b></td>
                        </tr>
                    </table>

                    <p className='justify-text' >Con fundamento en lo establecido en el artículo 51, fracc. II, del Reglamento de las Condiciones Generales de Trabajo del Personal
                        de la Secretaría de Educación Pública; numeral 25.3, del Manual de Normas para la Administración de Recursos Humanos en
                        la Secretaría de Educación Pública; párrafo segundo del artículo 55, de la Ley del servicio Civil del Estado de Zacatecas;
                        artículo 62, inciso d), de las condiciones Generales del Servicio y artículo 10, fracción XVI, del Reglamento Interior de la
                        Secretaría de Educación del Estado de Zacatecas.</p>
                    <p className='justify-text'>Así mismo, le informo que cuenta con 10 días hábiles para presentar el aviso de reincorporación o solicitar prórroga antes del
                        término de la misma. En caso de reanudar cuenta con un plazo no mayor a 3 días hábiles para presentar su horario e inicio de
                        labores para definir su situación.</p>
                    <p>Me despido cordialmente y ratifico mis mejores consideraciones.</p>
                </div>
                <div className='sign'>
                    <div style={{ width: "100%" }}>
                        <p><b>M.F. María del Carmen Salinas Flores</b></p>
                        <p><b>Secretaria de Educación</b></p>
                    </div>
                </div>
                <div>
                    <p className='tiny-text'>
                        c.c.p.- M. en F. Adriana Vargas Tagle. - Subsecretaria Administrativa <br />
                        E.O.. Lucero Arely Aguilera Luna. - Directora de Capital Humano <br />
                        Director(a) de la Esc. Prim. "Severo Cosío"S <br />
                        Archivo.</p>
                </div>

                <div className='w-100'>
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
        </div>
    )
});

export default LicenciaSinGoceDeSueldo