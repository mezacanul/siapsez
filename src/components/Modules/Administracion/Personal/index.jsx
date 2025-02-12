import { FaFileSignature } from "react-icons/fa6";
import { FaSortAmountUp, FaSortAmountDownAlt } from "react-icons/fa";
import { LuUserRoundSearch } from "react-icons/lu";
import { FaBuildingColumns } from "react-icons/fa6";

import MenuItem from "../../../common/MenuItem";

export default function AdministracionDePersonal() {
  return (
    <div id="GridMenuContainer">
      <MenuItem
        linkTo={"movimientos"}
        title={"MOVIMIENTOS DE PERSONAL"}
        icon={<FaBuildingColumns />}
      />

      {/* <MenuItem
        linkTo={"tramite-baja"}
        title={"TRÁMITE DE BAJA"}
        icon={<FaSortAmountDownAlt />}
      /> */}

      <MenuItem
        linkTo={"afiliacion"}
        title={"AFILIACIÓN IMSS"}
        icon={<img src="IMSS_Logo_small.png" style={{ width: "3.2rem" }} />}
      />

      <MenuItem
        linkTo={"buscar"}
        title={"BUSCAR EMPLEADO"}
        icon={<LuUserRoundSearch style={{ transform: "scale(1.1)" }} />}
      />
    </div>
  );
}
