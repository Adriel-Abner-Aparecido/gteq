import React, { useState, useEffect } from "react";
import { Col, Form, FormControl, FormLabel, Button } from "react-bootstrap";
import axios from "axios";
import apiUrl from "../config";

const FormMetaObras = ({ id }) => {
  const [formData, setFormData] = useState({
    relObra: id,
    valorMeta: "",
  });

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/meta/metaObra`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${settoken}`,
        },
        body: JSON.stringify(formData),
      });
      await response.json();
    } catch (error) {
      console.error("Erro ao cadastrar Meta:", error);
    }
  };

  useEffect(() => {
    const metaObra = async () => {
      try {
        const response = await axios.get(`${apiUrl}/meta/metaObra/${id}`, {
          headers: {
            Authorization: `Bearer ${settoken}`,
          },
        });
        setFormData({
          relObra: response.data.metaObra.relObra,
          valorMeta: response.data.metaObra.valorMeta,
        });
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      }
    };
    metaObra();
    // eslint-disable-next-line
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <Col>
      <Form onSubmit={handleSubmit}>
        <FormLabel htmlFor="valorMeta" className="text-center">
          Meta:
        </FormLabel>
        <Col xxl={1} className="px-0">
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
        <Col xxl={2} className="px-0">
          <Button variant="link" type="submit">
            Definir
          </Button>
        </Col>
      </Form>
    </Col>
  );
};
export default FormMetaObras;
