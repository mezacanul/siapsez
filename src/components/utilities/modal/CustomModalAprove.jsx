import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "./customModal.css";
import { IoMdClose } from "react-icons/io";
import { IconButton } from "@mui/material";


const CustomModal = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: props.width || "50%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>{props.messageButton}</Button> */}
      <Modal
        open={props.open}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="d-flex justify-content-between">
            <h5>{props.title}</h5>
            <IconButton onClick={props.close} aria-label="delete">
              <IoMdClose />
            </IconButton>
          </div>
          {props.children}
          <hr />
          <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-success mx-2"onClick={props.close}> 
                  Aprobar
                </button>
            <button className="btn btn-danger mx-2" onClick={props.close}>
              Cancelar
            </button>
            {props.messageButtonOk && <button className="btn btn-primary" onClick={props.ok}>{props.messageButtonOk}</button>}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
