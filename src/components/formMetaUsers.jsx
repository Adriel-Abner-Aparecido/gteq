import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  FormControl,
  FormLabel,
  Button,
} from "react-bootstrap";
import axios from "axios";
import apiUrl from "../config";

const FormMetaUsers = ({ id }) => {
  const [metaUser, setMetaUser] = useState();
  const [metaNumber, setMetaNumber] = useState(null);

  const [formData, setFormData] = useState({
    relUser: id,
    valorMeta: "",
  });

  const [formUpdate, setFormUpdate] = useState({
    valorMeta: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/meta/metaUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${settoken}`,
        },
        body: JSON.stringify(formData),
      });
      await response.json();
    } catch (error) {
      console.error("Erro ao Cadastrar Meta do Usuario!:", error);
    }
  };

  const handleUpdate = async (event) => {
    if (!event.target.value) {
      setMetaNumber("");
    } else {
      setMetaNumber(event.target.value);
    }
    setFormUpdate({ valorMeta: `${event.target.value}` });
  };

  const atualizaDados = async () => {
    try {
      await axios.put(
        `${apiUrl}/meta/metaUser/${metaUser[0]._id}`,
        formUpdate,
        {
          headers: {
            Authorization: `Bearer ${settoken}`,
          },
        }
      );
    } catch (error) {
      console.error("Erro ao Atualizar meta do Usuario:", error);
    }
  };

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const responseMetaUser = await axios.get(
          `${apiUrl}/meta/metaUser/${id}`,
          {
            headers: {
              Authorization: `Bearer ${settoken}`,
            },
          }
        );
        setMetaUser(responseMetaUser.data.metaUser);
        if (responseMetaUser.data.metaUser.length > 0) {
          setMetaNumber(responseMetaUser.data.metaUser[0].valorMeta);
        }
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      }
    };
    fetchUsuario();
    // eslint-disable-next-line
  }, []);

  return (
    <Col className="">
      {metaUser && metaUser.length === 0 && (
        <Form onSubmit={handleSubmit}>
          <FormLabel column htmlFor="valorMeta">
            Meta:
          </FormLabel>
          <Col>
            <FormControl
              className="input-number"
              type="number"
              id="valorMeta"
              name="valorMeta"
              value={formData.valorMeta}
              onChange={handleChange}
              required
            />
          </Col>
          <Col>
            <Button variant="link" type="submit">
              Definir
            </Button>
          </Col>
        </Form>
      )}
      {metaUser && metaUser.length > 0 && (
        <Form onSubmit={atualizaDados}>
          <FormLabel htmlFor="valorMeta" className="text-center">
            Meta:
          </FormLabel>
          <Row>
            <Col xxl={4}>
              <FormControl
                type="number"
                className="input-number"
                id="valorMeta"
                name="valorMeta"
                value={metaNumber}
                onChange={handleUpdate}
                required
              />
            </Col>
            <Col>
              <Button variant="link" type="submit">
                Definir
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Col>
  );
};
export default FormMetaUsers;
