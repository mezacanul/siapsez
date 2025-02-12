import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { FaUserGraduate } from "react-icons/fa6";
import { RiMenu5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function Navbar({handleShow}) {
  const { getBasicUserInfo, getIDToken, getDecodedIDToken } = useAuthContext();

  useEffect(() => {
    getDecodedIDToken()
      .then((decodedIDToken) => {
        console.log(decodedIDToken);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div
      id="NavBar"
      className="bg-red-500"
      style={{ height: "6vh", overflowX: "hidden" }}
    >
      <div className="custom-container d-flex align-items-center justify-content-between">
        <LogoNavbar/>
        <NavMenu handleShow={handleShow}/>
      </div>
    </div>
  );
}

function LogoNavbar() {
  return (
    <Link to={"/"}>
      <div className="logo d-flex align-items-center mainLogo">
        <CastForEducationIcon
          style={{ fontSize: "1.5rem", color: "white" }}
          className="me-2"
        />

        <h1
          style={{
            fontSize: "1.3rem",
            letterSpacing: "4px",
            color: "white",
            margin: 0,
            fontWeight: "300",
          }}
        >
          SIAPSEZ
        </h1>
      </div>
    </Link>
  );
}

function NavMenu({handleShow}) {
  return (
    <Nav className="d-flex align-items-center gap-4" style={{ height: "100%" }}>
      <NavPerfil />
      <RiMenu5Fill onClick={handleShow} className="navMenuIcon" />
    </Nav>
  );
}

function NavPerfil() {
  return (
    <Link to="/perfil">
      <div className="navMenuIcon navPerfilItem d-flex align-items-center gap-2">
        <p
          className="m-0 p-0 text-white"
          style={{ fontSize: "1rem", fontWeight: "lighter" }}
        >
          Nombre Apellido
        </p>
        <FaUserGraduate style={{ fontSize: "1.2rem" }} />
      </div>
    </Link>
  );
}
