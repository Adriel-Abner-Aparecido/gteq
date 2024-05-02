import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  FormControl,
  FormLabel,
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
      <CardHeader>Adicionar Descontos</CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormLabel htmlFor="descricao">Descrição:</FormLabel>
          <FormControl
            type="text"
            name="descricao"
            id="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
          />
          <FormLabel htmlFor="valorDesconto">Valor:</FormLabel>
          <FormControl
            type="number"
            className="input-number"
            name="valorDesconto"
            id="valorDesconto"
            value={formData.valorDesconto}
            onChange={handleChange}
            required
          />
          <Button type="submit" className="w-100 mt-3">
            Cadastrar
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};
export default FormDescontos;
