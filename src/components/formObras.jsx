import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import "./style/style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiUrl from "../config";

const FormObras = () => {
  const [formData, setFormData] = useState({
    nomeObra: "",
    enderecoObra: "",
    cidadeObra: "",
    numeroRua: "",
    complementoObra: "",
    descricaoObra: "",
  });

  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);

    try {
      const response = await fetch(`${apiUrl}/obras/cadastroObras`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${settoken}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.id) {
          const { id } = data;
          navigate(`/obras/obra/${id}`);
        }
      } else {
        console.error("erro ao buscar o id");
      }
    } catch (error) {
      console.error("Erro ao cadastrar Obra:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <h1>Cadastro Obras</h1>
      </CardHeader>
      <CardBody>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col xl={4}>
              <FormLabel htmlFor="nomeObra">Nome da Obra:</FormLabel>
              <FormControl
                type="text"
                id="nomeObra"
                name="nomeObra"
                value={formData.nomeObra}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>
          <Row className="pt-3">
            <Col xl={4}>
              <FormLabel htmlFor="enderecoObra">Endereço:</FormLabel>
              <FormControl
                type="text"
                id="enderecoObra"
                name="enderecoObra"
                value={formData.enderecoObra}
                onChange={handleChange}
                required
              />
            </Col>
            <Col xl={3}>
              <FormLabel htmlFor="cidadeObra">Cidade:</FormLabel>
              <FormControl
                type="text"
                id="cidadeObra"
                name="cidadeObra"
                value={formData.cidadeObra}
                onChange={handleChange}
                required
              />
            </Col>
            <Col xl={2}>
              <FormLabel htmlFor="numeroRua">N°:</FormLabel>
              <FormControl
                className="input-number"
                type="number"
                id="numeroRua"
                name="numeroRua"
                value={formData.numeroRua}
                onChange={handleChange}
                required
              />
            </Col>
            <Col xl={3}>
              <FormLabel htmlFor="complementoObra">Complemento:</FormLabel>
              <FormControl
                type="text"
                id="complementoObra"
                name="complementoObra"
                value={formData.complementoObra}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>
          <Row className="pt-3">
            <Col xl={4}>
              <FormLabel htmlFor="tipoObra">Tipo de obra:</FormLabel>
              <FormSelect
                id="tipoObra"
                name="tipoObra"
                value={formData.tipoObra}
                onChange={handleChange}
                required
              >
                <option></option>
                <option value="Condominio de Apartamentos">
                  Condominio de Apartamentos
                </option>
                <option value="Condominio de casas">Condominio de casas</option>
                <option value="Condominio de casas + Apartamentos">
                  Condominio de casas + Apartamentos
                </option>
                <option value="Condominio Comercial">
                  Condominio Comercial
                </option>
                <option value="Apartamento">Apartamento</option>
                <option value="Casa">Casa</option>
                <option value="Sobrado">Sobrado</option>
                <option value="Barracão">Barracão</option>
              </FormSelect>
            </Col>
          </Row>
          <Row className="pt-3">
            <Col xl={12}>
              <FormLabel htmlFor="descricaoObra">Descrição:</FormLabel>
              <FormControl
                as="textarea"
                rows={4}
                id="descricaoObra"
                name="descricaoObra"
                value={formData.descricaoObra}
                onChange={handleChange}
                required
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xl={12}>
              <Button type="submit">Cadastrar Obra</Button>
              <Button
                href="/obras"
                className="mx-3"
                variant="danger"
                type="reset"
              >
                Cancelar
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};
export default FormObras;
