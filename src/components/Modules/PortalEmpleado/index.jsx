import { Carousel, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../PortalEmpleado/PortalEmpleado.css";
import MenuItem from "../../common/MenuItem";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BsPersonLinesFill } from "react-icons/bs";
import { HiDocumentCheck } from "react-icons/hi2";
import { MdOutlineWorkHistory } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa6";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { GrDocumentTime } from "react-icons/gr";
import { BiSolidCalendarEvent } from "react-icons/bi";





export default function PortalEmpleado() {
  return (
    <div className="w-100 d-flex gap-4">
      <div
        className="d-flex flex-column justify-content-between gap-2"
        style={{ width: "70%", minHeight: "60vh" }}
      >
        <MenuPortalEmpleado />
        <BannerInstitucional />
      </div>
      <BannerLateral />
    </div>
  );
}

function BannerInstitucional() {
  return (
    <Carousel
      controls={true}
      indicators={false}
      interval={6000}
      ride={"ride"}
      style={{
        border: "3px solid black",
        boxShadow: "-4px 4px 10px rgba(0,0,0,0.4)",
        borderRadius: "1.5rem",
      }}
      className="banner-hover w-100"
    >
      <Carousel.Item>
        <img
          className="w-100"
          style={{
            borderRadius: "1.5rem",
            // border: "3px solid black",
            objectFit: "cover",
            height: "auto",
          }}
          src={"promocionMesaTrabajo.png"}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="w-100"
          style={{
            borderRadius: "1.5rem",
            // border: "3px solid black",
            objectFit: "cover",
            height: "auto",
          }}
          src={"promocionMesaTrabajo.png"}
        />
      </Carousel.Item>
    </Carousel>

    // <img
    //   style={{
    //     borderRadius: "1.5rem",
    //     border: "3px solid black",
    //     objectFit: "cover",
    //     height: "auto",
    //     boxShadow: "-4px 4px 10px rgba(0,0,0,0.4)",
    //   }}
    //   className={"banner-hover w-100 my-4"}
    //   src={"promocionMesaTrabajo.png"}
    // />
  );
}

function BannerLateral() {
  return (
    <Carousel
      controls={true}
      indicators={false}
      interval={4000}
      ride={"ride"}
      style={{
        width: "30%",
        boxShadow: "3px 3px 10px rgba(0,0,0,0.5)",
        alignSelf: "flex-start",
        borderRadius: "1rem",
      }}
      className="banner-hover"
    >
      <Carousel.Item>
        <img
          src={"mejoradu.jpg"}
          style={{
            borderRadius: "1rem",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={"mejoradu.jpg"}
          style={{
            borderRadius: "1rem",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </Carousel.Item>
    </Carousel>
  );
}

function MenuPortalEmpleado() {
  return (
    <div className="defaultMenuGrid">
      <MenuItem
        linkTo={"licencias-permisos"}
        title={"LICENCIAS Y PERMISOS"}
        icon={<HiDocumentCheck style={{ transform: "scale(1.4)" }} />}
      />
      <MenuItem
        linkTo={"datos-personales"}
        title={"DATOS PERSONALES"}
        icon={<BsPersonLinesFill style={{ transform: "scale(1.4)" }} />}
      />
      <MenuItem
        linkTo={"historial-laboral"}
        title={"HISTORIAL LABORAL"}
        icon={<MdOutlineWorkHistory style={{ transform: "scale(1.4)" }} />}
      />
      <MenuItem
        linkTo={"historial-curricular"}
        title={"HISTORIAL CURRICULAR"}
        icon={<FaUserGraduate style={{ transform: "scale(1.4)" }} />}
      />
      <MenuItem
        linkTo={"nomina"}
        title={"NÓMINAS"}
        icon={<FaMoneyCheckDollar style={{ transform: "scale(1.4)" }} />}
      />
      <MenuItem
        linkTo={"tarjeta-checadora"}
        title={"TARJETA CHECADORA"}
        icon={<GrDocumentTime style={{ transform: "scale(1.4)" }} />}
      />
      <MenuItem
        linkTo={"historial-faltas"}
        title={"HISTORIAL DE FALTAS"}
        icon={<BiSolidCalendarEvent style={{ transform: "scale(1.4)" }} />}
      />


      {/* <Link to={"licencias-permisos"}>
        <button>Licencias y Permisos Registrados</button>
      </Link>
      <Link to={"ejemplo"}>
        <button>Sub Rutina 2</button>
      </Link>
      <Link to={"ejemplo"}>
        <button>Sub Rutina 3</button>
      </Link>
      <Link to={"ejemplo"}>
        <button>Sub Rutina 4</button>
      </Link> */}

      {/* <Form.Select>
        <option>Seleccionar:</option>
        <option>Opcion 1</option>
        <option>Opcion 2</option>
      </Form.Select> */}
    </div>
  );
}

function ImageSlider() {
  return (
    <Carousel
      controls={false}
      indicators={false}
      interval={3000}
      className="w-60 h-100"
      fade={true}
      ride={"ride"}
    >
      <Carousel.Item style={{ height: "100%" }}>
        <img
          className="d-block w-100 h-100"
          src={"PENDING"}
          style={{ objectFit: "cover", height: "100%" }}
        />
      </Carousel.Item>
    </Carousel>
  );
}
