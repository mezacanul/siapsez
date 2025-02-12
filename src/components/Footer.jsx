import { BsTwitterX, BsInstagram } from "react-icons/bs";
import { FaFacebookSquare } from "react-icons/fa";

export default function Footer() {
  return (
    <div id="Footer" className="bg-red-500">
      <div className="custom-container align-items-center">
        <Goto />
        <Directorio />
      </div>
    </div>
  );
}

function Goto() {
  return (
    <div className="d-flex align-items-center">
      <img
        src="/logo-2021-2027.png"
        style={{
          width: "13rem",
          // height: "auto",
          objectFit: "cover",
          borderRight: "1px solid white",
          paddingRight: "1rem",
        }}
      />
      <Divider />
      <a href="https://maps.app.goo.gl/XT5FcKra8VnktYyV6" target="_blank" id="LinkToMap" style={{width: "15rem", fontSize: "0.9rem", paddingLeft: "1.2rem", color: "white", fontWeight: "lighter", marginBottom: "0.4rem"}}>
        Lateral López Portillo No. 305, Fracc. Dependencias Federales,
        Guadalupe, Zac., C.P. 98618
      </a>
    </div>
  );
}

function Divider() {
  return <div className="border-bottom" />;
}

function Directorio() {
  return (
    <div id="Directorio" className="d-flex flex-column gap-1 align-items-end">
      <b
        className="text-white"
        style={{ fontSize: "1rem", fontWeight: "500" }}
      >
        Directorio
      </b>
      <p className="directorioLink" style={{ fontSize: "0.9rem" }}>
        +52 492 923 9600
      </p>
      <p className="directorioLink" style={{ fontSize: "0.9rem" }}>
        contacto@seduzac.com
      </p>
      <SocialMenu />
    </div>
  );
}

function SocialMenu() {
  return (
    <div id="SocialMenu" className="d-flex mt-1" style={{ gap: "0.6rem" }}>
      <BsTwitterX className="directorioIcon" />
      <BsInstagram className="directorioIcon" />
      <FaFacebookSquare className="directorioIcon" />
    </div>
  );
}
