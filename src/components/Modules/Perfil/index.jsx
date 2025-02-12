import { FaUserGraduate } from "react-icons/fa6";
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";

export default function Perfil() {
  const { getAccessToken, getBasicUserInfo } = useAuthContext();
  const [accesToken, setAccesToken] = useState(false);
  const [userDetails, setUserDetails] = useState(false);

  useEffect(() => {
    getAccessToken()
      .then((accessToken) => {
        setAccesToken(accessToken);
      })
      .catch((error) => {
        console.log(error);
      });

    getBasicUserInfo()
      .then((basicUserDetails) => {
        const array = Object.entries(basicUserDetails);
        setUserDetails(array);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <UserName />

      <BasicUserInfo userDetails={userDetails} />

      <AccessToken accesToken={accesToken} />
    </div>
  );
}

function UserName() {
  return (
    <div className="d-flex align-items-center mb-4">
      <FaUserGraduate
        className="me-3"
        style={{ fontSize: "1.98rem", color: "#4f100c" }}
      />
      <h1 className="m-0">Nombre Apellido</h1>
    </div>
  );
}

function BasicUserInfo({ userDetails }) {
  return (
    <div className="mb-5">
      <h3 className="mb-3 text-decoration-underline">getBasicUserInfo</h3>
      {userDetails &&
        userDetails.map((detail) => {
          return (
            <p key={detail[0]}>
              <b>{detail[0]}: </b>
              <span>{detail[1]}</span>
            </p>
          );
        })}
    </div>
  );
}

function AccessToken({ accesToken }) {
  return (
    <div>
      <h4 className="mb-3 text-decoration-underline">getAccessToken</h4>
      <p>
        <b>Access Token: </b>
      </p>
      <textarea
        style={{ width: "60rem", height: "20rem" }}
        defaultValue={accesToken}
      />
    </div>
  );
}
