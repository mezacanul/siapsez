import React from 'react';
import './css/OrdenDePresentacion57.css';
import logoEncabezado from './assets/LogoSEZCH.jpg';
import footerLogo from './assets/footerSEZ.jpg'

const OrdenDePresentacion57 = React.forwardRef((props, ref) => {

    const
    fecha = 'Guadalupe, Zac, a 8 de mayo de 2024',
    nombramiento = 'DEFis/84/23-24/043',
    cicloEscolar = '2024-2025',
    motivo = 'Administración por necesidades del servicio (externo)',
    nivel = 'Educación Física',
    nombreFavor = 'C. Humberto Herindian Zapata Campos',
    convocatoria = 'Admisión',
    origenVacante = 'Renuncia',
    titularVacante = 'Sánchez Luevano J. Jesús',
    director = 'E.O. LUCERO ARELY AGUILERA LUNA'


    return (
        <div ref={ref}>
            <div className="carta">
                <div className="pdf-container">
                    <div className="header">
                        <img src={logoEncabezado} alt="Logo" className="logo" />
                    </div>
                    <div className="date">
                        {fecha}
                    </div>

                    <div className="text-section">
                        <p>
                            Con fundamento en el artículo 25 fracción XXIII del reglamento interno de la Secretaría de Educación se emitió el nombramiento N°
                            <strong>{nombramiento}</strong> signado por la Dirección de Educación Básica Estatal. Así mismo y de conformidad con el artículo 61
                            fracciones I, III, IV, XI del mismo ordenamiento y artículo 26-A fracción V de la Ley de Coordinación Fiscal, se extiende:
                        </p>
                    </div>
                    <div className="title-large">
                        ORDEN DE PRESENTACIÓN No 57
                    </div>
                    <div className="title-medium">
                        Ciclo escolar {cicloEscolar}
                    </div>
                    <div className="text-section">
                        <p>
                            Para la <strong>{motivo}</strong> en el nivel de <strong>{nivel}</strong> a favor de:
                        </p>
                    </div>
                    <div className="title-medium">
                        {nombreFavor}
                    </div>
                    <div className="text-section">
                        <p>
                            Por lo que le notifico a usted, que deberá entregarlo ante la Autoridad Jerárquica Superior inmediata a fin de darle posesión de su cargo y empleo.
                            La autoridad antes mencionada dispondrá de tres días naturales para entregar en el área de personal de la Dirección Regional correspondiente, el
                            inicio de labores y horario de trabajo respectivos, así como el formato de Educación a Distancia para que el área correspondiente de la
                            Dirección Regional remita al día siguiente al Departamento del nivel educativo de Adscripción, la documentación respectiva.
                        </p>
                    </div>
                    <div className="text-section">
                        <p>
                            Esta orden de presentación quedará insubsistente, si con posterioridad se detecta por la autoridad competente que no se cumplió con los
                            requisitos en la convocatoria para la <strong>{convocatoria}</strong>, o no se presentó a tomar posesión del empleo en la fecha indicada en el
                            mismo, sin responsabilidad para la Secretaría de Educación.
                        </p>
                    </div>
                    <div className="observations">
                        Observaciones.
                    </div>
                    <div className="rectangular-section">
                        <p>
                            <strong>Origen de la vacante:</strong> {origenVacante}<br />
                            <strong>Titular de la vacante:</strong> {titularVacante}
                        </p>
                    </div>
                    <div className="closing">
                        ATENTAMENTE
                    </div>
                    <div className="signature">
                        <p>
                            {director}<br />
                            DIRECTORA DE CAPITAL HUMANO
                        </p>
                    </div>
                    <div className="footer">
                        <img src={footerLogo} alt="Footer" className="footer-image" />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default OrdenDePresentacion57