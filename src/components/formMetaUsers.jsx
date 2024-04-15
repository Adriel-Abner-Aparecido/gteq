import React, { useState, useEffect } from "react";
import { Col, Form, FormControl, FormLabel, Button } from "react-bootstrap";
import axios from "axios";
import apiUrl from "../config";

const FormMetaUsers = ({ id }) => {
  const [formData, setFormData] = useState({
    relUser: id,
    valorMeta: "",
  });

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

  useEffect(() => {
    const metaUsuario = async () => {
      try {
        const response = await axios.get(`${apiUrl}/meta/metaUser/${id}`, {
          headers: {
            Authorization: `Bearer ${settoken}`,
          },
        });
        setFormData({
          relUser: response.data.metaUser.relUser,
          valorMeta: response.data.metaUser.valorMeta,
        });
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      }
    };
    metaUsuario();
    // eslint-disable-next-line
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <Col className="">
      <Form onSubmit={handleSubmit}>
        <FormLabel htmlFor="valorMeta">Meta:</FormLabel>
        <Col xxl={4}>
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
    </Col>
  );
};
export default FormMetaUsers;
