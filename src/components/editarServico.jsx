import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "../config";

const EditaServico = ({ id }) => {
  const [formData, setFormData] = useState({
    nomeServico: "",
  });

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  useEffect(() => {
    const listaServicos = async () => {
      try {
        const response = await axios.get(`${apiUrl}/servicos/servico/${id}`, {
          headers: {
            Authorization: `Bearer ${settoken}`,
          },
        });
        setFormData({
          nomeServico: response.data.servico.nomeServico,
        });
      } catch {
        console.log("Erro ao buscar os dados");
      }
    };
    listaServicos();
  }, [id, settoken]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${apiUrl}/servicos/atualizaServico/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${settoken}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardBody>
        <Form onSubmit={handleUpdate}>
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
            <Col xl={1}>
              <Button type="submit">Cadastrar</Button>
            </Col>
            <Col xl={1}>
              <Button variant="danger" onClick={() => window.location.reload()}>
                Cancelar
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};
export default EditaServico;
