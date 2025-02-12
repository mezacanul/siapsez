import { Link } from "react-router-dom";

export default function Nomina() {
  return (
    <div className="defaultMenuGrid">
      <Link className="btn-sez-default" to={"/nomina/tipos-de-percepcion"}>
        <button className="btn w-100">Tipos de Percepción</button>
      </Link>

      <Link to={"/nomina/tipos-de-deduccion"}>
        <button className="btn w-100">Tipos de Deducción</button>
      </Link>

      <Link to={"/nomina/clave-interna-percepcion"}>
        <button className="btn w-100">Clave Interna - Percepción</button>
      </Link>

      <Link to={"/nomina/clave-interna-deduccion"}>
        <button className="btn w-100">Clave Interna - Deducción</button>
      </Link>

      <Link to={"/nomina/concepto-percepciones"}>
        <button className="btn w-100">Concepto - Percepción</button>
      </Link>

      <Link to={"/nomina/concepto-deducciones"}>
        <button className="btn w-100">Concepto - Deducción</button>
      </Link>

      <Link to={"/nomina/tipos-de-nomina"}>
        <button className="btn w-100">Tipos de Nómina</button>
      </Link>
    </div>
  );
}
