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

const EditaEtapas = ({ id }) => {
  const [formData, setFormData] = useState({
    nomeEtapa: "",
    refEtapa: "",
    tempoExecucao: "",
  });

  const [servicos, setServicos] = useState([]);

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  useEffect(() => {
    const pegaEtapas = async () => {
      try {
        const response = await axios.get(`${apiUrl}/etapas/refEtapa/${id}`, {
          headers: {
            Authorization: `Bearer ${settoken}`,
          },
        });
        setFormData({
          nomeEtapa: response.data.etapa.nomeEtapa,
          refEtapa: response.data.etapa.refEtapa._id,
          tempoExecucao: response.data.etapa.tempoExecucao,
        });
      } catch (error) {
        console.log(error);
      }
    };
    listaServicos();
    pegaEtapas();
    // eslint-disable-next-line
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
      await axios.put(`${apiUrl}/etapas/atualizaEtapa/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${settoken}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

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
        <Form onSubmit={handleUpdate}>
          <Row>
            <Col xl={3}>
              <FormSelect
                id="refEtapa"
                name="refEtapa"
                value={formData.refEtapa}
                onChange={handleChange}
                required
              >
                <option></option>
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
export default EditaEtapas;
