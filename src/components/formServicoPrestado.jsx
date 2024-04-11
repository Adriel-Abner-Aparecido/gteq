import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Col,
  FormSelect,
  Row,
  Button,
} from "react-bootstrap";
import apiUrl from "../config";
import axios from "axios";
import "./style/style.css";

const FormServicoPrestado = ({ refObra }) => {
  const [servicos, setServicos] = useState([]);
  const [formData, setFormData] = useState({
    refObra: refObra,
    servicoPrestado: "",
    valoraReceber: "",
    valoraPagar: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  const handleSubmit = async () => {
    try {
      await fetch(`${apiUrl}/servicosPrestados/servicoPrestado`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${settoken}`,
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error("Erro ao cadastrar Obra:", error);
    }
  };

  useEffect(() => {
    listaObras();
    // eslint-disable-next-line
  }, []);

  const listaObras = async () => {
    try {
      const response = await axios.get(`${apiUrl}/servicos/servicos`, {
        headers: {
          Authorization: `Bearer ${settoken}`,
        },
      });
      setServicos(response.data.servicos);
    } catch {
      console.log("Erro ao buscar os dados");
    }
  };

  return (
    <Card className="mt-5">
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup as={Row} className="g-sm-3 g-xxl-3">
            <Col xxl="auto" className="text-xxl-end p-xxl-1">
              <FormLabel htmlFor="servicoPrestado">Servico:</FormLabel>
            </Col>
            <Col className="p-0">
              <FormSelect
                name="servicoPrestado"
                onChange={handleChange}
                required
              >
                <option></option>
                {servicos.map((servico, index) => (
                  <option key={(index += 1)} value={servico._id}>
                    {servico.nomeServico}
                  </option>
                ))}
              </FormSelect>
            </Col>
            <Col xxl="auto" className="text-xxl-end p-xxl-1 ms-xxl-2">
              <FormLabel htmlFor="valoraReceber" className="my-auto">
                Valor a Receber:
              </FormLabel>
            </Col>
            <Col className="p-0">
              <FormControl
                className="input-number"
                type="number"
                name="valoraReceber"
                onChange={handleChange}
                required
              />
            </Col>
            <Col xxl="auto" className="text-xxl-end p-xxl-1 ms-xxl-2">
              <FormLabel htmlFor="valoraPagar ms-xxl-2">
                Valor a Pagar:
              </FormLabel>
            </Col>
            <Col className="p-0">
              <FormControl
                className="input-number"
                type="number"
                name="valoraPagar"
                onChange={handleChange}
                required
              />
            </Col>
            <Col xxl="auto" sm={12} className="px-xxl-3 mt-xs-3 px-0">
              <Button className="w-100" type="submit">
                Cadastrar
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
};
export default FormServicoPrestado;
