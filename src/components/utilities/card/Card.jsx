import { IconButton } from "@mui/material";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { CSSTransition } from "react-transition-group";
import "./card.css";

const Card = (props) => {
  return (
    <div className="main-card">
      <div className="card-header">
        {props.back && (
          <IconButton
            type="link"
            className="button-options"
            onClick={props.back}
          >
            <IoArrowBackCircleOutline
              style={{ fontSize: "35px", color: "#000000" }}
            />
          </IconButton>
        )}
        <h3 className="mx-2">{props.title}</h3>
        {props.btn && (
          <button
            className="btn btn-custom-primary"
            onClick={props.btnFunction}
          >
            Crear usuario
          </button>
        )}
      </div>
      
        <div className="card-body">{props.children}</div>
      
    </div>
  );
};

export default Card;
