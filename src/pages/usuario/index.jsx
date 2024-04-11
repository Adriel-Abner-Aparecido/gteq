import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
} from "react-bootstrap";
import Avatar from "../../components/avatar";
import LateralNav from "../../components/lateralNav";
import axios from "axios";
import { useParams } from "react-router-dom";
import apiUrl from "../../config";
import FormMetaUsers from "../../components/formMetaUsers";
import EntregasUsuarios from "../../components/tableEntregasUsuario";
import ValorAreceber from "../../components/valorAreceber";
import ProgressUsuarios from "../../components/progressUsuarios";

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
        console.log(responseUsuario.data.usuario);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      }
    };
    fetchUsuario();
  }, [id, settoken]);

  return (
    <Container className="p-0 h-100">
      <Row className="p-0 m-0 ">
        <LateralNav />
        <Col sm={12} md={10} xxl={10} className="p-5 h-100">
          <Card>
            <CardHeader>Usuario</CardHeader>
            <CardBody>
              <Row>
                <Col xxl={3} className="d-flex justify-content-center">
                  <img
                    src={Avatar}
                    className="avatar rounded rounded-circle p-2 my-auto"
                    alt={Avatar}
                  />
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
                    <Col>Produzido em R$:</Col>
                  </Row>
                  <Row>
                    <Col>
                      <h2 className="text-success">
                        R$ <ValorAreceber userId={id} />
                      </h2>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <ProgressUsuarios id={id} />
            </CardFooter>
          </Card>
          <EntregasUsuarios id={id} />
        </Col>
      </Row>
    </Container>
  );
};

export default ViewUsuario;
