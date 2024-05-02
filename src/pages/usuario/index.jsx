import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
} from "react-bootstrap";
import Avatar from "../../components/avatar";
import axios from "axios";
import { useParams } from "react-router-dom";
import apiUrl from "../../config";
import FormMetaUsers from "../../components/formMetaUsers";
import EntregasUsuarios from "../../components/tableEntregasUsuario";
import ValorAreceber from "../../components/valorAreceber";
import ProgressUsuarios from "../../components/progressUsuarios";
import FormDescontos from "../../components/formDescontos";
import TableDescontos from "../../components/tableDescontos";
import App from "../../layout/app";

const ViewUsuario = () => {
  const { id } = useParams();

  const [usuario, setUsuario] = useState([]);

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const responseUsuario = await axios.get(
          `${apiUrl}/usuarios/usuario/${id}`,
          {
            headers: {
              Authorization: `Bearer ${settoken}`,
            },
          }
        );
        setUsuario(responseUsuario.data.usuario);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      }
    };
    fetchUsuario();
  }, [id, settoken]);

  return (
    <App>
      <Card>
        <CardHeader>Usuario</CardHeader>
        <CardBody>
          <Row>
            <Col xxl={3} className="d-flex justify-content-center">
              <Avatar id={id} />
            </Col>
            <Col xxl={5}>
              <Row className="mb-3">
                <Col>Nome: {usuario.nomeUsuario}</Col>
              </Row>
              <Row>
                <Col className="mb-3">
                  Nome Completo: {usuario.nomeCompleto}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>Email: {usuario.emailUsuario}</Col>
              </Row>
              <Row className="mb-3">
                <Col>Tipo de usuario: {usuario.nivelUsuario}</Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  Função:{" "}
                  {usuario.funcaoUsuario === ""
                    ? "Não definido!"
                    : usuario.funcaoUsuario}
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormMetaUsers id={id} />
                </Col>
              </Row>
              <Row className="mt-3 p-0 m-0">
                <Col className="m-o p-0">
                  <Button
                    className="w-50"
                    href={`/usuarios/usuario/editarUsuario/${id}`}
                    variant="primary"
                  >
                    Editar
                  </Button>
                </Col>
                {/* <Col xxl={2} xs={6}>
                      <Button className='w-100' variant="danger">Apagar</Button>
                    </Col> */}
              </Row>
            </Col>
            <Col xxl={4}>
              {/* <Row>
                    <Col xxl={6}>
                      Meta:
                      <ProgressUsuariosMes id={id} />
                    </Col>
                  </Row> */}
              <Row>
                <ValorAreceber id={id} />
              </Row>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <ProgressUsuarios id={id} />
        </CardFooter>
      </Card>
      <Row>
        <Col xxl={4}>
          <FormDescontos id={id} />
        </Col>
        <Col xxl={8}>
          <TableDescontos id={id} />
        </Col>
      </Row>
      <EntregasUsuarios id={id} />
    </App>
  );
};

export default ViewUsuario;
