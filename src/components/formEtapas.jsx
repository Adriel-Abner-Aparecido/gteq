import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormControl,
  FormSelect,
  Row,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "../config";

const FormEtapas = () => {
  const [formData, setFormData] = useState({
    nomeEtapa: "",
    refEtapa: "",
    tempoExecucao: "",
  });

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/etapas/cadastroEtapa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${settoken}`,
        },
        body: JSON.stringify(formData),
      });
      await response.json();
    } catch (error) {
      console.error("Erro ao cadastrar Serviço:", error);
    }
  };

  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    listaServicos();
    // eslint-disable-next-line
  }, []);

  const listaServicos = async () => {
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
    <Card>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xl={3}>
              <FormSelect
                id="refEtapa"
                name="refEtapa"
                value={formData.refEtapa}
                onChange={handleChange}
                required
              >
                <option value="0">Serviço Relacionado</option>
                {servicos.map((servicos) => (
                  <option key={servicos._id} value={servicos._id}>
                    {servicos.nomeServico}
                  </option>
                ))}
              </FormSelect>
            </Col>
            <Col xl={3}>
              <FormControl
                id="nomeEtapa"
                name="nomeEtapa"
                placeholder="Etapa"
                value={formData.nomeEtapa}
                onChange={handleChange}
                required
              />
            </Col>
            <Col xl={2}>
              <FormControl
                id="tempoExecucao"
                name="tempoExecucao"
                placeholder="Tempo"
                value={formData.tempoExecucao}
                onChange={handleChange}
                required
              />
            </Col>
            <Col xl={1}>
              <Button type="submit">Cadastrar</Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};
export default FormEtapas;
