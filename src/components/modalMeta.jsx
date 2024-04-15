import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Col,
  Form,
  FormControl,
  FormLabel,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "react-bootstrap";
import apiUrl from "../config";
import axios from "axios";

const ModalMeta = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    valorMeta: "",
    diasUteis: "",
    metaData: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/meta/meta`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${settoken}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        response.json();
      }
    } catch (err) {
      console.log({ Message: "Algo deu errado", err });
    }
  };

  useEffect(() => {
    const pegaMeta = async () => {
      try {
        const response = await axios.get(`${apiUrl}/meta/meta`, {
          headers: {
            Authorization: `Bearer ${settoken}`,
          },
        });

        setFormData({
          valorMeta: response.data.meta.valorMeta,
          diasUteis: response.data.meta.diasUteis,
          metaData: response.data.meta.metaData,
        });
      } catch (error) {
        console.error(error);
      }
    };
    pegaMeta();
  }, [settoken]);

  return (
    <Modal className="fade" show={show} onHide={handleClose} centered>
      <ModalHeader closeButton>
        <h1 className="modal-title fs-5">Meta</h1>
      </ModalHeader>
      <ModalBody>
        <Form
          onSubmit={handleSubmit}
          id="formMeta"
          name="meta"
          method="dialog"
          className="row justify-content-center"
        >
          <Row>
            <Col xl={3}>
              <FormLabel htmlFor="valorMeta">Definir meta:</FormLabel>
              <FormControl
                type="number"
                id="valorMeta"
                name="valorMeta"
                value={formData.valorMeta}
                onChange={handleChange}
                required
              />
            </Col>
            <Col xl={3}>
              <FormLabel htmlFor="diasUteis">Dias Uteis</FormLabel>
              <FormControl
                type="number"
                id="diasUteis"
                name="diasUteis"
                value={formData.diasUteis}
                onChange={handleChange}
              />
            </Col>
            <Col xl={6}>
              <FormLabel htmlFor="metaData">Definir Data:</FormLabel>
              <FormControl
                type="date"
                id="metaData"
                name="metaData"
                value={formData.metaData}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          type="button"
          color="danger"
          className="btn btn-danger"
          onClick={handleClose}
        >
          Cancelar
        </Button>
        <Button type="submit" color="primary" className="btn" form="formMeta">
          Definir
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default ModalMeta;
