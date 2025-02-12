import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import { useAuthContext } from "@asgardeo/auth-react";

import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
// import Sidebar from "./Sidebar"
import { useEffect, useState } from "react";
import { Breadcrumb, Container } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { use } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BsFillFileEarmarkBarGraphFill, BsPeopleFill } from "react-icons/bs";
import { RiGraduationCapFill } from "react-icons/ri";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import {
  FaFileSignature,
  FaMoneyCheckDollar,
  FaRegCalendarCheck,
} from "react-icons/fa6";
import { LuSettings2 } from "react-icons/lu";

export default function Layout({ props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {/* <OldLayout /> */}
      <div id="Layout">
        <Navbar handleShow={handleShow} />

        <Motor>
          <Outlet />
        </Motor>

        <Footer />
      </div>

      <SideMenu handleClose={handleClose} show={show} />
    </>
  );
}

function LogoMenu() {
  return (
    <div className=" d-flex align-items-center mainLogo">
      <CastForEducationIcon
        style={{ fontSize: "1.6rem", color: "#6e1b10" }}
        className="me-2"
      />

      <h1
        style={{
          fontSize: "1.5rem",
          letterSpacing: "4px",
          margin: 0,
          fontWeight: "400",
        }}
      >
        SIAPSEZ
      </h1>
    </div>
  );
}

function SideMenu({ handleClose, show }) {
  const { signOut } = useAuthContext();

  return (
    <Offcanvas
      className={"p-3"}
      show={show}
      onHide={handleClose}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <LogoMenu />
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="my-2 d-flex flex-column gap-3">
        <Link className="sideBarMenuLink" to={"/administracion-de-personal"}>
          <BsPeopleFill />
          <span>Administracion de personal</span>
        </Link>

        <Link className="sideBarMenuLink" to={"/nomina"}>
          <MdOutlineAttachMoney style={{ transform: "scale(1.4)" }} />
          <span>Nóminas</span>
        </Link>

        <Link className="sideBarMenuLink" to={"/portal-empleado"}>
          <RiGraduationCapFill />
          <span>Portal del Empleado</span>
        </Link>

        <Link className="sideBarMenuLink" to={"/gestion-plazas"}>
          <FaChalkboardTeacher />
          <span>Gestión de Plazas</span>
        </Link>

        <Link className="sideBarMenuLink" to={"/pagos"}>
          <FaMoneyCheckDollar />
          <span>Pagos</span>
        </Link>

        <Link className="sideBarMenuLink" to={"/portal-control-asistencias"}>
          <FaRegCalendarCheck />
          <span>Control de Asistencia</span>
        </Link>
        <Link className="sideBarMenuLink" to={"/informes"}>
          <BsFillFileEarmarkBarGraphFill />
          <span>Informes</span>
        </Link>

        <Link className="sideBarMenuLink" to={"/administracion-sistema"}>
          <LuSettings2 style={{ transform: "scale(1.2)" }} />
          <span>Administracion del sistema</span>
        </Link>

        <Link className="sideBarMenuLink" to={"/firma-electronica"}>
          <FaFileSignature />
          <span>Firma Electrónica</span>
        </Link>

        <button onClick={()=>{signOut()}} className="SEZ-btn my-3">Cerrar Sesión</button>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

function Motor({ children }) {
  const [currentBreadcrumbs, setCurrentBreadcrumbs] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setCurrentTitle("Menu Principal");
        setCurrentBreadcrumbs(["Inicio"]);
        break;
      case "/perfil":
        setCurrentTitle("Mi Perfil");
        setCurrentBreadcrumbs(["Inicio", "Perfil"]);
        break;
      case "/portal-empleado":
        setCurrentTitle("Portal del Empleado");
        setCurrentBreadcrumbs(["Inicio", "Portal del Empleado"]);
        break;
      case "/portal-empleado/licencias-permisos":
        setCurrentTitle("Licencias y Permisos Registrados");
        setCurrentBreadcrumbs(["Inicio", "Portal del Empleado", "Licencias y Permisos"]);
        break;
      case "/portal-empleado/historial-laboral":
        setCurrentTitle("Historial Laboral");
        setCurrentBreadcrumbs(["Inicio", "Portal del Empleado", "Historial Laboral"]);
        break;
      case "/portal-control-asistencias":
        setCurrentTitle("Portal de Control de Asistencia");
        setCurrentBreadcrumbs(["Inicio", "Portal de Control de Asistencia"]);
        break;
      case "/administracion-de-personal":
        setCurrentTitle("Administración de Personal");
        setCurrentBreadcrumbs(["Inicio", "Administración de Personal"]);
        break;
      case "/administracion-de-personal/movimientos":
        setCurrentTitle("Movimientos de Personal");
        setCurrentBreadcrumbs([
          "Inicio",
          "Administración de Personal",
          "Movimientos",
        ]);
        break;
      case "/nomina":
        setCurrentTitle("Administración de Nómina");
        setCurrentBreadcrumbs(["Inicio", "Nómina"]);
        break;
      default:
        break;
    }
  }, [location]);

  return (
    <div id="MotorSIAPSEZ" className="custom-container">
      <Breadcrumb style={{ marginBottom: "-0.5rem" }}>
        {currentBreadcrumbs.map((breadcrumb, index) => {
          return (
            <Breadcrumb.Item
              key={breadcrumb}
              active={index === currentBreadcrumbs.length - 1}
            >
              {breadcrumb}
            </Breadcrumb.Item>
          );
        })}

        {/* <Breadcrumb.Item href="/category">Category</Breadcrumb.Item>
        <Breadcrumb.Item active>Current Page</Breadcrumb.Item>  */}
      </Breadcrumb>

      <h2 className="mb-4">{currentTitle}</h2>
      {children}
    </div>
  );
}

function OldLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="">
      <Navbar />
      <div className="d-flex">
        <Sidebar collapsed={collapsed} onCollapseToggle={toggleCollapse} />
        <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
          <div className="page-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
