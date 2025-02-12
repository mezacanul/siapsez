import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmacionMasivaModal = ({ show, onHide, onConfirm, loading }) => {
  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Sincronización Masiva</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Estás seguro de que deseas forzar la sincronización masiva de todos los movimientos
          pendientes? Esta acción es irreversible y podría afectar a múltiples empleados.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={onConfirm} disabled={loading}>
          {loading ? "Procesando..." : "Confirmar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmacionMasivaModal;
