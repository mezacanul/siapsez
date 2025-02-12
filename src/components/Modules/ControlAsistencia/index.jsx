import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PortalControlAsistencia() {
  return (
    <div className="defaultMenuGrid">
      <Link to={"sincronizar"}>
        <button>Sincronizar Movimientos</button>
      </Link>
      <Link to={"logs"}>
        <button>Logs de Sincronización</button>
      </Link>
    </div>
  );
}