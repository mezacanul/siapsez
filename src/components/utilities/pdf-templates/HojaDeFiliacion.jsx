import React from "react";
import Header from "./assets/SecretariaEducZac.png";
import pp1 from "./assets/pp1.png";
import pp2 from "./assets/pp1.png";
import fp1 from "./assets/fingerPrint1.png";
import fp2 from "./assets/fingerPrint2.png";

// export default function Filiacion() {
//     return (
//         <div>
//             <h1>Hoja de Filiacion</h1>
//         </div>
//     )
// }

const Filiacion = React.forwardRef((props, ref) => {
  const noRegistro = "CAHR690408MR9",
    noFolio = "FI-2024022681",
    responsableTomaFiliacion = "JUAN CARLOS ORTIZ FUENTES",
    jefaDptoPlazas = "L.C. EDITH RUELAS FLORES";
  return (
    <>
      <link rel="stylesheet" href="/css/Filiacion.css" />
      <div ref={ref}>
        <div className="carta">
          <div className="w-100">
            <table className="w-100">
              <tbody>
                <tr>
                  <td className="w-70">
                    <div className="center-items">
                      <div style={{ textAlign: "left" }}>
                        <img className="header" src={Header} alt="..." />
                      </div>
                    </div>
                  </td>
                  <td className="w-30">
                    <div className="text-center">
                      <p className="mt-0 ">FILIACION</p>
                    </div>
                    <div className="text-start">
                      <p className="my-0">
                        C.U.R.P.{" "}
                        {props.dataFiliacion?.empleado?.curp
                          ? props.dataFiliacion.empleado.curp
                          : ""}
                      </p>
                      <p className="my-0">NO. DE REG. {noRegistro}</p>
                      <p className="my-0">NO. DE FOLIO {noFolio}</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <p className="tiny-text">
              Los datos personales proporcionados y contenidos en el presente
              formato, serán tratados de conformidad a lo que establece la Ley
              de Protección de Datos Personales en Posesión de los Sujetos
              Obligados del Estado de Zacatecas y el aviso de privacidad de la
              Secretaría de Educación de Zacatecas, el cual podrá consultar en
              la dirección electrónica:
              http://www.seduzac.gob.mx/portal/documentos/avisos_privacidad/30052019_aps_administrativa.pdf
            </p>
          </div>

          <div className="w-100 mb-1">
            <table className="w-100 text-start">
              <tr>
                <td className="w-75">
                  <table className="w-100 border text-start">
                    <colgroup>
                      <col width="5%" />
                      <col width="5%" />
                      <col width="5%" />
                      <col width="5%" />
                      <col width="5%" />
                      <col width="5%" />
                      <col width="5%" />
                      <col width="5%" />
                      <col width="5%" />
                      <col width="5%" />
                      <col width="5%" />
                      <col width="5%" />
                      <col width="5%" />
                      <col width="5%" />
                      <col width="5%" />
                      <col width="5%" />
                      <col width="5%" />
                      <col width="5%" />
                      <col width="5%" />
                      <col width="5%" />
                    </colgroup>
                    <tr>
                      <td colSpan={5}>CLAVE DE COBRO:</td>
                      <td colSpan={5}>
                        {props.dataFiliacion?.filiacionEntity?.claveCobro
                          ? props.dataFiliacion.filiacionEntity.claveCobro.toUpperCase()
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5}>NOMBRE:</td>
                      <td colSpan={10}>
                        {props.persona?.nombre ? props.persona.nombre : ""}
                      </td>
                      <td colSpan={1}>TEL.:</td>
                      <td colSpan={4}>
                        {props.persona?.contacto?.movil
                          ? props.persona.contacto.movil
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5}>DOMICILIO:</td>
                      <td colSpan={10}>
                        {props.dataFiliacion?.filiacionEntity?.nomMunicipio
                          ? props.dataFiliacion.filiacionEntity.nomMunicipio.toUpperCase()
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5}>COLONIA:</td>
                      <td colSpan={10}>
                        {props.dataFiliacion?.filiacionEntity?.nomLocalidad
                          ? props.dataFiliacion.filiacionEntity.nomLocalidad.toUpperCase()
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5}>EXTERIOR:</td>
                      <td colSpan={3}>
                        {props.dataFiliacion?.filiacionEntity?.numeroExterior
                          ? props.dataFiliacion.filiacionEntity.numeroExterior
                          : ""}
                      </td>
                      <td colSpan={2}>INTERIOR:</td>
                      <td colSpan={3}>
                        {props.dataFiliacion?.filiacionEntity?.numeroInterior
                          ? props.dataFiliacion.filiacionEntity.numeroInterior
                          : ""}
                      </td>
                      <td colSpan={1}>CP:</td>
                      <td colSpan={6}>
                        {props.dataFiliacion?.filiacionEntity?.cp
                          ? props.dataFiliacion.filiacionEntity.cp
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5}>LUGAR:</td>
                      <td colSpan={10}>
                        {props.dataFiliacion?.filiacionEntity?.lugarDomicilio
                          ? props.dataFiliacion.filiacionEntity.lugarDomicilio.toUpperCase()
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5}>LUGAR DE NACIMIENTO:</td>
                      <td colSpan={5}>
                        {props.dataFiliacion?.filiacionEntity?.lugarNacimiento
                          ? props.dataFiliacion.filiacionEntity.lugarNacimiento
                          : ""}
                      </td>
                      <td colSpan={3}>POBLACION:</td>
                      <td colSpan={7}>
                        {props.dataFiliacion?.filiacionEntity?.poblacion
                          ? props.dataFiliacion.filiacionEntity.poblacion.toUpperCase()
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5}>MUNICIPIO:</td>
                      <td colSpan={5}>
                        {props.dataFiliacion?.filiacionEntity?.nomMunicipio
                          ? props.dataFiliacion.filiacionEntity.nomMunicipio.toUpperCase()
                          : ""}
                      </td>
                      <td colSpan={3}>ESTADO:</td>
                      <td colSpan={7}>
                        {props.dataFiliacion?.filiacionEntity?.estadoNom
                          ? props.dataFiliacion.filiacionEntity.estadoNom.toUpperCase()
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5}>FECHA DE NACIMIENTO:</td>
                      <td colSpan={5}>
                        {props.dataFiliacion?.filiacionEntity?.fecha
                          ? props.dataFiliacion.filiacionEntity.fecha
                          : ""}
                      </td>
                      <td colSpan={3}>ESTADO CIVIL:</td>
                      <td colSpan={7}>
                        {props.dataFiliacion?.empleado?.estadoCivilId
                          ? props.dataFiliacion.empleado.estadoCivilId
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={7}>NOMBRE DEL CONYUGE:</td>
                      <td colSpan={10}>
                        {props.dataFiliacion?.filiacionEntity?.nombreConyuge &&
                        props.dataFiliacion?.filiacionEntity?.separaConyuge
                          ? `${props.dataFiliacion.filiacionEntity.nombreConyuge.toUpperCase()} ${props.dataFiliacion.filiacionEntity.separaConyuge.toUpperCase()}`
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={7}>NOMBRE DEL PADRE:</td>
                      <td colSpan={10}>
                        {props.dataFiliacion?.filiacionEntity?.nombrePadre &&
                        props.dataFiliacion?.filiacionEntity?.separaPadre
                          ? `${props.dataFiliacion.filiacionEntity.nombrePadre.toUpperCase()} ${props.dataFiliacion.filiacionEntity.separaPadre.toUpperCase()}`
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={7}>NOMBRE DE LA MADRE:</td>
                      <td colSpan={10}>
                        {props.dataFiliacion?.filiacionEntity?.nombreMadre &&
                        props.dataFiliacion?.filiacionEntity?.separaMadre
                          ? `${props.dataFiliacion.filiacionEntity.nombreMadre.toUpperCase()} ${props.dataFiliacion.filiacionEntity.separaMadre.toUpperCase()}`
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5}>ACTA NUMERO:</td>
                      <td colSpan={5}>
                        {props.dataFiliacion?.filiacionEntity?.actaNum
                          ? props.dataFiliacion.filiacionEntity.actaNum
                          : ""}
                      </td>
                      <td colSpan={3}>AÑO:</td>
                      <td colSpan={7}>
                        {props.dataFiliacion?.filiacionEntity?.actaAnio
                          ? props.dataFiliacion.filiacionEntity.actaAnio
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5}>FOJA:</td>
                      <td colSpan={5}>
                        {props.dataFiliacion?.filiacionEntity?.actaFoja
                          ? props.dataFiliacion.filiacionEntity.actaFoja
                          : ""}
                      </td>
                      <td colSpan={3}>LIBRO:</td>
                      <td colSpan={7}>
                        {props.dataFiliacion?.filiacionEntity?.actaLlibro
                          ? props.dataFiliacion.filiacionEntity.actaLlibro
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5}>CARTILLA SNM:</td>
                      <td colSpan={10}>
                        {props.dataFiliacion?.filiacionEntity?.cartillaNum
                          ? props.dataFiliacion.filiacionEntity.cartillaNum
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5}>LUGAR:</td>
                      <td colSpan={5}>
                        {props.dataFiliacion?.filiacionEntity?.lugar
                          ? props.dataFiliacion.filiacionEntity.lugar.toUpperCase()
                          : ""}
                      </td>
                      <td colSpan={3}>FECHA:</td>
                      <td colSpan={7}>
                        {props.dataFiliacion?.filiacionEntity?.fechaExpedicion
                          ? props.dataFiliacion.filiacionEntity.fechaExpedicion
                          : ""}
                      </td>
                    </tr>
                  </table>
                </td>
                <td className="w-25 ">
                  <div className=" center-items w-100">
                    <div className="text-center">
                      <img className="ProfilePic" src={pp2} alt="..." />
                      <img className="ProfilePic" src={pp1} alt="..." />
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>

          <div className="w-100 mb-1">
            <table className="w-100 border text-start" rules="all">
              <tr>
                <td className="w-50 text-center ">
                  REFERENCIAS: (Dos personas que lo conozcan)
                </td>
                <td className="w-50 text-center">(Dos parientes)</td>
              </tr>
              <tr>
                <td className="w-50">
                  <table className="w-100 text-start">
                    <tr>
                      <td>NOMBRE:</td>
                      <td className="text-10">
                        {props.dataFiliacion?.filiacionEntity?.referAmi1
                          ? props.dataFiliacion.filiacionEntity.referAmi1.toUpperCase()
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>DOMICILIO:</td>
                      <td className="text-10">
                        {props.dataFiliacion?.filiacionEntity?.domAmi1
                          ? props.dataFiliacion.filiacionEntity.domAmi1.toUpperCase()
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>LUGAR:</td>
                      <td className="text-10">
                        {props.dataFiliacion?.filiacionEntity?.lugarAmi1
                          ? props.dataFiliacion.filiacionEntity.lugarAmi1.toUpperCase()
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>NOMBRE:</td>
                      <td className="text-10">
                        {props.dataFiliacion?.filiacionEntity?.referAmi2
                          ? props.dataFiliacion.filiacionEntity.referAmi2.toUpperCase()
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>DOMICILIO:</td>
                      <td className="text-10">
                        {props.dataFiliacion?.filiacionEntity?.domAmi2
                          ? props.dataFiliacion.filiacionEntity.domAmi2.toUpperCase()
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>LUGAR:</td>
                      <td className="text-10">
                        {props.dataFiliacion?.filiacionEntity?.lugarAmi2
                          ? props.dataFiliacion.filiacionEntity.lugarAmi2.toUpperCase()
                          : ""}
                      </td>
                    </tr>
                  </table>
                </td>
                <td className="w-50">
                  <table className="w-100 text-start">
                    <tr>
                      <td>NOMBRE:</td>
                      <td className="text-10">
                        {props.dataFiliacion?.filiacionEntity?.referPari1
                          ? props.dataFiliacion.filiacionEntity.referPari1.toUpperCase()
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>DOMICILIO:</td>
                      <td className="text-10">
                        {props.dataFiliacion?.filiacionEntity?.domiParo1
                          ? props.dataFiliacion.filiacionEntity.domiParo1.toUpperCase()
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>LUGAR:</td>
                      <td className="text-10">
                        {props.dataFiliacion?.filiacionEntity?.lugarPari1
                          ? props.dataFiliacion.filiacionEntity.lugarPari1.toUpperCase()
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>NOMBRE:</td>
                      <td className="text-10">
                        {props.dataFiliacion?.filiacionEntity?.referPari2
                          ? props.dataFiliacion.filiacionEntity.referPari2.toUpperCase()
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>DOMICILIO:</td>
                      <td className="text-10">
                        {props.dataFiliacion?.filiacionEntity?.domiParo2
                          ? props.dataFiliacion.filiacionEntity.domiParo2.toUpperCase()
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>LUGAR:</td>
                      <td className="text-10">
                        {props.dataFiliacion?.filiacionEntity?.lugarPari2
                          ? props.dataFiliacion.filiacionEntity.lugarPari2.toUpperCase()
                          : ""}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>

          <div className="w-100 mb-1">
            <table className="w-100 border text-start">
              <tr>
                <td>PIGMENTACION:</td>
                <td className="text-10">
                  {props.dataFiliacion?.filiacionEntity?.color
                    ? props.dataFiliacion.filiacionEntity.color.toUpperCase()
                    : ""}
                </td>
                <td>PELO:</td>
                <td className="text-10">
                  {props.dataFiliacion?.filiacionEntity?.pelo
                    ? props.dataFiliacion.filiacionEntity.pelo.toUpperCase()
                    : ""}
                </td>
                <td>CEJAS:</td>
                <td className="text-10">
                  {props.dataFiliacion?.filiacionEntity?.cejas
                    ? props.dataFiliacion.filiacionEntity.cejas.toUpperCase()
                    : ""}
                </td>
              </tr>
              <tr>
                <td>FRENTE:</td>
                <td className="text-10">
                  {props.dataFiliacion?.filiacionEntity?.frente
                    ? props.dataFiliacion.filiacionEntity.frente.toUpperCase()
                    : ""}
                </td>
                <td>OJOS:</td>
                <td className="text-10">
                  {props.dataFiliacion?.filiacionEntity?.ojos
                    ? props.dataFiliacion.filiacionEntity.ojos.toUpperCase()
                    : ""}
                </td>
                <td>BOCA:</td>
                <td className="text-10">
                  {props.dataFiliacion?.filiacionEntity?.boca
                    ? props.dataFiliacion.filiacionEntity.boca.toUpperCase()
                    : ""}
                </td>
              </tr>
              <tr>
                <td>NARIZ:</td>
                <td className="text-10">
                  {props.dataFiliacion?.filiacionEntity?.nariz
                    ? props.dataFiliacion.filiacionEntity.nariz.toUpperCase()
                    : ""}
                </td>
                <td>ESTATURA:</td>
                <td className="text-10">
                  {props.dataFiliacion?.filiacionEntity?.estatura
                    ? props.dataFiliacion.filiacionEntity.estatura
                    : ""}
                </td>
                <td></td>
                <td className="text-10"></td>
              </tr>
              <tr>
                <td>SEÑAS PARTICULARES VISIBLES:</td>
                <td className="text-10">
                  {props.dataFiliacion?.filiacionEntity?.sePartVisible
                    ? props.dataFiliacion.filiacionEntity.sePartVisible.toUpperCase()
                    : ""}
                </td>
              </tr>
            </table>
          </div>

          <div className="w-100 mb-1">
            <table className="w-100 border text-center" rules="all">
              <tr>
                <td>
                  HUELLA DEL PULGAR IZQUIERDO
                  <div style={{ height: "0.7in" }}></div>
                </td>
                <td className="w-30">
                  ________________________ <br />
                  FIRMA DEL INTERESADO
                </td>
                <td>
                  HUELLA DEL PULGAR DERECHO
                  <div style={{ height: "0.7in" }}></div>
                </td>
              </tr>
            </table>
          </div>

          <div className="w-100 ">
            <table className="w-100 text-center">
              <tr>
                <td className="w-40 border">
                  RESPONSABLE DE LA TOMA DE FILIACION
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  {responsableTomaFiliacion}
                </td>
                <td className="">SELLO</td>
                <td className="w-40 border">
                  JEFA DEPTO. DE PLAZAS ESTATALES
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  {jefaDptoPlazas}
                </td>
              </tr>
            </table>
          </div>

        </div>
      </div>
    </>
  );
});

export default Filiacion;
