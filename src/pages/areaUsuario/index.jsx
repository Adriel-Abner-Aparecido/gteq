import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import ValorAreceber from "../../components/valorAreceber";
import apiUrl from "../../config";
import FormEntregasUsuario from "../../components/formEntregasUsuario";
import ProgressAreaUsuarios from "../../components/progressAreaUsuario";
import Avatar from "../../components/avatar";

const AreaUsuario = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    return navigate("/login");
  };

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const userId = tokenPayload?.userId;
  const userName = tokenPayload?.userName;
  const settoken = tokenPayload?.token;

  const [entregaServico, setEntregaServico] = useState();

  const fetchServicos = async () => {
    try {
      const responseEntregaServico = await axios.get(
        `${apiUrl}/entregas/entregaServicoUsuario/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${settoken}`,
          },
        }
      );
      setEntregaServico(responseEntregaServico.data.entregaServico);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchServicos();
    // eslint-disable-next-line
  }, []);

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    const hora = ("0" + data.getHours()).slice(-2);
    const minutos = ("0" + data.getMinutes()).slice(-2);
    const dia = ("0" + data.getDate()).slice(-2);
    const mes = ("0" + (data.getMonth() + 1)).slice(-2);
    const ano = data.getFullYear();
    return `${hora}:${minutos} - ${dia}/${mes}/${ano}`;
  };

  return (
    <Container className="pb-5 p-0">
      <Row className="bg-light pt-5 pb-3 m-0">
        <Col>
          <Row>
            <Col className="d-flex justify-content-center">
              <a href="/configusuario">
                <Avatar id={userId} />
              </a>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center p-2">
              <h3 className="my-auto">{userName}</h3>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <Button variant="link" onClick={handleLogout}>
                Sair
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="p-0 m-0">
        <div
          className="p-0 m-0"
          style={{ background: "#E9ECEF", height: "5px" }}
        >
          <ProgressAreaUsuarios id={userId} />
        </div>
      </Row>
      <Row className="d-flex justify-content-center mb-5 mt-5 m-0">
        <Col xxl={4}>
          <Card>
            <CardHeader className="text-center">A receber</CardHeader>
            <CardBody>
              <ValorAreceber id={userId} />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center m-0">
        <Col xxl={4}>
          <Card>
            <CardHeader className="text-center">Entregar</CardHeader>
            <CardBody>
              <FormEntregasUsuario userId={userId} atualiza={fetchServicos} />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center m-0">
        <Col xxl={4}>
          {entregaServico && entregaServico.length > 0 && (
            <Card className="mt-5">
              <CardHeader>Atualizações</CardHeader>
              <CardBody>
                <Table striped>
                  <thead>
                    <tr>
                      <th>Etapa</th>
                      <th>Bloco</th>
                      <th>Uni</th>
                      <th>Data</th>
                      <th className="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entregaServico.map((servico) => (
                      <tr key={servico._id}>
                        <td className="align-middle">
                          {servico.etapaEntregue &&
                            servico.etapaEntregue.nomeEtapa}
                        </td>
                        <td className="align-middle">
                          {servico.blocoObra && servico.blocoObra.numeroBloco}
                        </td>
                        <td className="align-middle">{servico.unidadeObra}</td>
                        <td className="align-middle">
                          {servico.createdAt && formatarData(servico.createdAt)}
                        </td>
                        <td className="align-middle text-center">
                          {servico.statusEntrega === "pendente" ? (
                            <BsCircleFill className="text-warning" />
                          ) : servico.statusEntrega === "aceito" ? (
                            <BsCircleFill className="text-success" />
                          ) : (
                            <BsCircleFill className="text-danger" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          )}
          {entregaServico && entregaServico.length === 0 && (
            <Card className="mt-5">
              <CardBody>
                <p className="text-center my-auto">Ainda não entregou nada</p>
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default AreaUsuario;
