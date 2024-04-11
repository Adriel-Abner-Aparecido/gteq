import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Form,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";
import apiUrl from "../config";

const FormServico = () => {
  const [formData, setFormData] = useState({
    nomeServico: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/servicos/cadastroServico`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${settoken}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Erro ao cadastrar Obra:", error);
    }
  };

  return (
    <Card>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xl={4}>
              <FormControl
                type="text"
                name="nomeServico"
                id="nomeServico"
                placeholder="Serviço"
                value={formData.nomeServico}
                onChange={handleChange}
                required
              />
            </Col>
            <Col>
              <Button type="submit">Cadastrar</Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};
export default FormServico;
