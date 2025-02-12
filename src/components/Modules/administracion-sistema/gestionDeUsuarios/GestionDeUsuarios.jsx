import React, { useState } from 'react'
import Layout from '../../../Layout'
import Card from '../../../utilities/card/Card'
import Table from "../../../utilities/table/Table";
import Modal from 'react-bootstrap/Modal';
import Form from '../../../utilities/form/Form';
import InformacionUsuario from './informacion-usuario/InformacionUsuario';

const GestionDeUsuarios = () => {

  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [toUpdate, setToUpdate] = useState(null);

  const desplegarUsuario = (id) => {
    setUpdateModal(true);
  }



  return (
    <>
      <Card title='Gestion de usuarios' btn='Crear usuario' btnFunction={() => setCreateModal(true)}>
        <Table selectUser={desplegarUsuario}/>
      </Card>
      <Modal
        dialogClassName="modal-xl-custom"
        show={createModal}
        onHide={() => setCreateModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Crear Usuario
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form actionText='Crear Usuario'/>
        </Modal.Body>
      </Modal>

      <Modal
        dialogClassName="modal-xl-custom"
        show={updateModal}
        onHide={() => setUpdateModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Usuario: Mauricio Alejandro Hernández Gómez
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InformacionUsuario/>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default GestionDeUsuarios