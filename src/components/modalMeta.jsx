import { useEffect, useState } from "react";
import { Modal, Button, Col, Form, FormControl, FormLabel, ModalBody, ModalFooter, ModalHeader, Row } from "react-bootstrap"
import apiUrl from "../config";
import axios from "axios";

const ModalMeta = ({ show, handleClose }) => {

  const [meta, setMeta] = useState([])
  const [formData, setFormData] = useState({
    meta: '',
    metaData: '',
  })

  const handleChange = event => { setFormData({ ...formData, [event.target.name]: event.target.value }) }

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/meta`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        response.json();
      }
    } catch (err) {
      console.log({ Message: 'Algo deu errado', err })
    }
  }

  useEffect(() => {
    const pegaMeta = async () => {
      try {
        const meta = await axios.get(`${apiUrl}/meta`);
        setMeta(meta.data.meta);
        console.log(meta.data.meta)
      } catch {

      }
    }
    pegaMeta();
  }, [])

  const [metaUpdate, setMetaUpdate] = useState('');
  const [metaDataUpdate, setMetaDataUpdate] = useState('')


  useEffect(() => {
    if (meta.length > 0) {
      setMetaUpdate(meta[0].meta || '');
      setMetaDataUpdate(meta[0].metaData || '');
    }
  }, [meta]);

  const formUpdate = () => ({
    meta: metaUpdate,
    metaData: metaDataUpdate
  })


  const submitUpdate = async () => {
    try {
      await axios.put(`${apiUrl}/meta/${meta[0]._id}`, formUpdate());
    } catch (error) {
      console.error('Erro ao atualizar Meta', error);
    }
  }

  return (
    <Modal className="fade" show={show} onHide={handleClose} centered>
      <ModalHeader closeButton>
        <h1 className="modal-title fs-5">Meta</h1>
      </ModalHeader>
      <ModalBody>
        {
          meta && meta.length === 0 && (
            <Form onSubmit={handleSubmit} id="formMeta" name="meta" method="dialog" className="row justify-content-center">
              <Row>
                <Col xl={6}>
                  <FormLabel htmlFor="meta">Definir meta:</FormLabel>
                  <FormControl type="number" id="meta" name="meta" onChange={handleChange} required />
                </Col>
                <Col xl={6}>
                  <FormLabel htmlFor="metaData">Definir Data:</FormLabel>
                  <FormControl type="date" id="metaData" name="metaData" onChange={handleChange} required />
                </Col>
              </Row>
            </Form>
          )
        }
        {
          meta && meta.length > 0 && (
            <Form onSubmit={submitUpdate} id="formMeta" name="meta" method="dialog" className="row justify-content-center">
              <Row>
                <Col xl={6}>
                  <FormLabel htmlFor="meta">Definir meta:</FormLabel>
                  <FormControl type="number" id="meta" name="meta" value={metaUpdate} onChange={e => setMetaUpdate(e.target.value)} required />
                </Col>
                <Col xl={6}>
                  <FormLabel htmlFor="metaData">Definir Data:</FormLabel>
                  <FormControl type="date" id="metaData" name="metaData" value={metaDataUpdate} onChange={e => setMetaDataUpdate(e.target.value)} required />
                </Col>
              </Row>
            </Form>
          )
        }
      </ModalBody>
      <ModalFooter>
        <Button type="button" color="danger" className="btn btn-danger" onClick={handleClose}>Cancelar</Button>
        <Button type="submit" color="primary" className="btn" form="formMeta">Definir</Button>
      </ModalFooter>
    </Modal>
  )
}
export default ModalMeta;