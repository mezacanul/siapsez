import Form from "react-bootstrap/Form";
import "../../../../../formularios.css";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { PiPrinterFill } from "react-icons/pi";
import Accordion from "react-bootstrap/Accordion";
import { VscRunAll } from "react-icons/vsc";

export default function Movimientos() {
  const [movimiento, setMovimiento] = useState("default");
  const [subMovimientos, setSubMovimientos] = useState([]);
  const [subMove, setSubMove] = useState("default")

  useEffect(() => {
    switch (movimiento) {
      case "Alta":
        setSubMovimientos(MovimientosAlta);
        break;
      case "Baja":
        setSubMovimientos(MovimientosBaja);
        break;
      default:
        setSubMovimientos([]);
        break;
    }
  }, [movimiento]);

  return (
    <div className="w-75">
      {/* Opciones  */}
      <div className="d-flex flex-column gap-3">
        {/* Selecciona tipo de movimiento  */}
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => {
            setMovimiento(e.target.value);
          }}
        >
          <option value="default">Elige el tipo de movimiento:</option>
          {ListaDeMovimientos.map((mov) => {
            return (
              <option key={mov} value={mov}>
                {mov}
              </option>
            );
          })}
        </Form.Select>

        {/* Selecciona motivo de movimiento  */}
        {subMovimientos.length > 0 && (
          <Form.Select onChange={(e)=>{setSubMove(e.target.value)}}>
            <option value="default">Motivo del movimiento:</option>
            {subMovimientos.map((mov) => {
              return (
                <option key={mov} value={mov}>
                  {mov}
                </option>
              );
            })}
          </Form.Select>
        )}

        <FUP movimiento={movimiento} subMove={subMove}/>
      </div>
    </div>
  );
}

function FUP({ movimiento, subMove }) {
  return (
    <div style={{ opacity: ((movimiento != "default") && (subMove != "default") ? 1 : 0.4) }}>
      {/* Titulo  */}
      <h3 className="my-3">Formato Unico de Personal (FUP):</h3>

      {/* Formulario por secciones  */}
      {/* <Accordion defaultActiveKey="0"> */}
      <Accordion className="my-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Información del Empleado</Accordion.Header>
          <Accordion.Body>
            <FormularioDatosDelEmpleado />
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do. */}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Movimientos</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Datos del (los) sustituido(s)</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Datos del Recurso</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Acciones  */}
      <div className="d-flex justify-content-between gap-3">
        <button className="SEZ-btn w-50">
          <PiPrinterFill className="me-2" style={{ fontSize: "1.5rem" }} />
          <span className="text-white">Formato FUP</span>
        </button>
        <button className="SEZ-btn w-50">
          <PiPrinterFill className="me-2" style={{ fontSize: "1.5rem" }} />
          <span className="text-white">Orden de Presentación</span>
        </button>
      </div>
    </div>
  );
}

function FormularioDatosDelEmpleado() {
  return (
    <div id="GridMenuContainer" className="py-3">
      <Form.Select>
        <option>* Región</option>
      </Form.Select>
      <Form.Select>
        <option>* Tipo de movimiento</option>
      </Form.Select>
      <Form.Select>
        <option>* Tipo de nómina</option>
      </Form.Select>
      {/* <Form.Control type="text" placeholder="* Tipo de movimiento" />
      <Form.Control type="text" placeholder="* Tipo de nónmina" /> */}
      <Form.Control type="text" placeholder="* Seguro Social" />
      <Form.Control type="date" placeholder="* Fecha" />
      <Form.Control type="text" placeholder="* Folio" />
      <Form.Select>
        <option>* Centro de trabajo</option>
      </Form.Select>
      {/* <Form.Control type="text" placeholder="* Centro de Trabajo" /> */}
      <Form.Control type="text" placeholder="* RFC" />
      <button className="SEZ-btn">Validar</button>
    </div>
  );
}

const ListaDeMovimientos = [
  "Alta",
  "Baja",
  "Promoción",
  "Cambio de Adscripción",
  // "Cambios",
  // "Licencias",
  // "Reanudaciones",
];

const MovimientosAlta = [
  "Inicial",
  "Alta Definitiva",
  "Provisional",
  "De Confianza",
  "Alta Interina Limitada",
];

const MovimientosBaja = [
  "Renuncia",
  "Jubilacion o Pension",
  "Abandono de Empleo",
  "Termino de Nombramiento",
  "Regularizacion de Plantilla",
  "Sentencia Judicial",
  "Resolucion del Tribunal C.A.",
  "Incapacidad del ISSTE",
];
