// import React, { useRef } from 'react';
// import ReactToPrint from 'react-to-print';
// import ShadowComponent from './utilities/pdf-templates/ShadowComponent';
// import FormatoUnicoPersonal from './utilities/pdf-templates/FormatoUnicoPersonal';
import HojaDeFiliacion from "./utilities/pdf-templates/HojaDeFiliacion";

import { Breadcrumb } from "react-bootstrap";
import {
  BsCalendar2CheckFill,
  BsPeopleFill,
  BsFillFileEarmarkBarGraphFill,
  BsFillPersonLinesFill,
} from "react-icons/bs";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { LuSettings2 } from "react-icons/lu";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaChalkboardTeacher } from "react-icons/fa";
import { RiGraduationCapFill } from "react-icons/ri";
import { FaFileSignature } from "react-icons/fa6";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import MenuItem from "./common/MenuItem";

export default function App() {
  return (
    <div id="MotorContainer">
      {/* <h1>Hello SIAPSEZ</h1> */}
      {/* <HojaDeFiliacion /> */}

      <div id="GridMenuContainer">
        <MenuItem
          title={"ADMINISTRACIÓN DE PERSONAL"}
          icon={<BsPeopleFill />}
          linkTo={"/administracion-de-personal"}
        />

        <MenuItem
          linkTo={"/nomina"}
          title={"NÓMINAS"}
          icon={<MdOutlineAttachMoney style={{ transform: "scale(1.4)" }} />}
        />

        <MenuItem
          linkTo={"/portal-empleado"}
          title={"PORTAL DEL EMPLEADO"}
          icon={<RiGraduationCapFill style={{ transform: "scale(1.1)" }} />}
        />
        <MenuItem
          title={"GESTIÓN DE PLAZAS"}
          icon={<FaChalkboardTeacher style={{ transform: "scale(1.3)" }} />}
        />

        <MenuItem
          title={"PAGOS"}
          icon={<FaMoneyCheckDollar style={{ transform: "scale(1.2)" }} />}
        />
        <MenuItem
          linkTo={"/portal-control-asistencias"}
          title={"CONTROL DE ASISTENCIA"}
          icon={<FaRegCalendarCheck />}
        />
        <MenuItem title={"INFORMES"} icon={<BsFillFileEarmarkBarGraphFill />} />

        <MenuItem title={"ADMINISTRACIÓN DEL SISTEMA"} icon={<LuSettings2 />} />
        <MenuItem
          title={"FIRMA ELECTRÓNICA"}
          icon={<FaFileSignature style={{ transform: "scale(1.2)" }} />}
        />
      </div>
    </div>
  );
}

// const App = () => {
//     const componentRef = useRef();

//     return (
//         <div className='center-card'>
//             <div>
//                 <ReactToPrint
//                     trigger={() => <button>Print this out!</button>}
//                     content={() => componentRef.current}
//                 />
//                 <ShadowComponent>
//  <HojaDeFiliacion ref={componentRef} />
//                 </ShadowComponent>
//             </div>
//         </div>
//     );
// };

// export default App;
