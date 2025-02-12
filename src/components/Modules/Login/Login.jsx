// DEV: Old Login UI Imports
import backgroundImage from "../../../assets/img/bg-login.jpg";
import logoWhite from "../../../assets/img/EDUCACION_VEDA_338x85.png";
import escudo from "../../../assets/img/logo-white-recortado.png";
// import "./login.css";
// import { useEffect, useState, useCallback } from "react";

// DEV: New Login UI imports
// import { MdCast } from "react-icons/md";
// import { useLocation } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import { Carousel, Image, Button, Container } from "react-bootstrap";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";

export default function Login() {
  const {
    signIn,
    // state,
    // signOut,
    // getIDToken,
    // getBasicUserInfo,
    // getDecodedIDToken,
    // on,
  } = useAuthContext();

  return (
    // <OldLoginUI />
    <LoginUI />
  );
}

function LoginUI() {
  return (
    <div className="d-flex" style={{ height: "100vh", width: "100vw" }}>
      <LoginForm />
      <ImageSlider />
    </div>
  );
}

function ImageSlider() {
  const slides = [
    "bg-login.jpg",
    "slider/slide-1.jpg",
    "slider/slide-2.jpg",
    "slider/slide-3.jpg",
    "slider/slide-4.jpg",
    "slider/slide-5.jpg",
  ];
  return (
    <Carousel
      controls={false}
      indicators={false}
      interval={3000}
      className="w-60 h-100"
      fade={true}
      ride={"ride"}
    >
      {slides.map((slide) => (
        <Carousel.Item key={slide} style={{ height: "100%" }}>
          <img
            className="d-block w-100 h-100"
            src={slide}
            style={{ objectFit: "cover", height: "100%" }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

function LoginForm() {
  return (
    <div className="d-flex justify-content-center align-items-center w-40 h-100 bg-red-500 text-white">
      <Container className="d-flex flex-column align-items-center w-40 gap-4">
        <LogoLogin />

        <LoginButton />

        <Image
          src="logo-2021-2027.png"
          style={{ width: "10rem", marginTop: "3rem" }}
        />
      </Container>
      {/* <LoginButton /> */}
    </div>
  );
}

function LoginButton() {
  const { signIn } = useAuthContext();

  return (
    <Button
      className="px-4 py-2 fw-bold fs-6 shadow-lg text-red-400 bg-white"
      style={{
        borderRadius: "0.5rem",
        transition: "0.3s",
        borderColor: "transparent",
      }}
      onClick={() => {
        signIn();
      }}
    >
      <span style={{ color: "#6e1b10" }}>COMENZAR</span>
    </Button>
  );
}

function LogoLogin() {
  return (
    <div className="d-flex align-items-center mainLogo">
      <CastForEducationIcon
        style={{ fontSize: "3rem", color: "white" }}
        className="me-3"
      />

      <h1
        style={{
          fontSize: "3rem",
          letterSpacing: "12px",
          color: "white",
          margin: 0,
        }}
      >
        SIAPSEZ
      </h1>
    </div>
  );
}

function OldLoginUI() {
  const {
    // state,
    signIn,
    // signOut,
    // getBasicUserInfo,
    // getIDToken,
    // getDecodedIDToken,
    // on,
  } = useAuthContext();

  // const [hasAuthenticationErrors, setHasAuthenticationErrors] = useState(false);
  // const [hasLogoutFailureError, setHasLogoutFailureError] = useState();

  // const search = useLocation().search;
  // const stateParam = new URLSearchParams(search).get("state");
  // const errorDescParam = new URLSearchParams(search).get("error_description");

  // const url = import.meta.env.VITE_WSO2_URL;

  // const startLogin = () => {
  //   window.location.href = `${url}/oauth2/authorization`;
  // };

  // const handleLogin = useCallback(() => {
  //   setHasLogoutFailureError(false);
  //   signIn().catch(() => setHasAuthenticationErrors(true));
  // }, [signIn]);

  // useEffect(() => {
  //   on(Hooks.SignOut, () => {
  //     setHasLogoutFailureError(false);
  //   });

  //   on(Hooks.SignOutFailed, () => {
  //     if (!errorDescParam) {
  //       handleLogin();
  //     }
  //   });
  // }, [on, handleLogin, errorDescParam]);

  return (
    <div
      className="bg-login"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="login-card">
        <h2>SIAPSEZ</h2>
        <div className="d-flex flex-column align-items-center">
          <img src={escudo} alt="" className="img-fluid" />
          <img src={logoWhite} alt="" className="img-fluid inverted-color" />
        </div>
        <button
          className="login-btn"
          onClick={() => {
            signIn();
          }}
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
}
