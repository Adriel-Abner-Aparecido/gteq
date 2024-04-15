import { useState } from "react";
import {
  Row,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormControl,
  FormLabel,
  FormGroup,
  Col,
  Button,
} from "react-bootstrap";
import apiUrl from "../config";

const FormDescontos = ({ id }) => {
  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  const [formData, setFormData] = useState({
    relUser: id,
    descricao: "",
    valorDesconto: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await fetch(`${apiUrl}/descontos/desconto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${settoken}`,
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="mt-5">
      <CardHeader>Descontos</CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup as={Row}>
            <Col xxl="auto" className="text-xxl-end p-xxl-1">
              <FormLabel htmlFor="descricao">Descrição:</FormLabel>
            </Col>
            <Col xxl={6}>
              <FormControl
                type="text"
                name="descricao"
                id="descricao"
                value={formData.descricao}
                onChange={handleChange}
                required
              />
            </Col>
            <Col xxl="auto" className="text-xxl-end p-xxl-1">
              <FormLabel htmlFor="valorDesconto">Valor:</FormLabel>
            </Col>
            <Col xxl={2}>
              <FormControl
                type="number"
                className="input-number"
                name="valorDesconto"
                id="valorDesconto"
                value={formData.valorDesconto}
                onChange={handleChange}
                required
              />
            </Col>
            <Col xxl={2}>
              <Button type="submit">Cadastrar</Button>
            </Col>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
};
export default FormDescontos;
