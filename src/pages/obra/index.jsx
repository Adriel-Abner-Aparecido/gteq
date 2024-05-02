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
import axios from "axios";
import { useParams } from "react-router-dom";
import "../obra/index.css";
import FormUnidadesObra from "../../components/formUnidadesObra";
import apiUrl from "../../config";
import EntregasObra from "../../components/tableEntregasObra";
import FormMetaObras from "../../components/formMetaObras";
import FormServicoPrestado from "../../components/formServicoPrestado";
import ServicosPrestados from "../../components/tableServicosPrestados";
import UnidadesObra from "../../components/unidadesObra";
import ProgressObra from "../../components/progressObra";
import App from "../../layout/app";

const ViewObra = () => {
  const { id } = useParams();

  const [obra, setObra] = useState([]);
  const [metaObra, setMetaObra] = useState([]);

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  useEffect(() => {
    const fetchObra = async () => {
      try {
        const responseObra = await axios.get(`${apiUrl}/obras/obra/${id}`, {
          headers: {
            Authorization: `Bearer ${settoken}`,
          },
        });

        setObra(responseObra.data.obra);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchObra();
  }, [id, settoken]);

  return (
    <App>
      <Card>
        <CardHeader>
          <h1>{obra.nomeObra}</h1>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xl={12}>
              <Row className="mb-3">
                <Col xxl={3}>Endereço: {obra.enderecoObra}</Col>
                <Col xxl={2}>n°: {obra.numeroRua}</Col>
                <Col xxl={3}>Cidade: {obra.cidadeObra}</Col>
                <Col xxl={4}>Complemento: {obra.complementoObra}</Col>
              </Row>
              <Row>
                <Col className="mb-3">Tipo de Obra: {obra.tipoObra}</Col>
              </Row>
              <Row className="mb-3">
                <Col>Serviços prestados: {obra.servicoPrestado}</Col>
              </Row>
              <Row className="mb-3">
                <Col>Descrição: {obra.descricaoObra}</Col>
              </Row>
              <Row>
                <FormMetaObras
                  id={id}
                  metaObra={metaObra}
                  setMetaObra={setMetaObra}
                />
              </Row>
              <Row className="mt-5">
                <Col xl={2}>
                  <Button
                    className="w-100"
                    href={`./editarObra/${obra._id}`}
                    variant="primary"
                  >
                    Editar
                  </Button>
                  {/* <Button variant='danger' className='mx-3' onClick={handleShow}>Apagar</Button> */}
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <ProgressObra id={id} />
        </CardFooter>
      </Card>
      <FormServicoPrestado refObra={id} />
      <ServicosPrestados refObra={id} />
      <FormUnidadesObra refObra={id} />
      <Card className="mt-5">
        <CardBody>
          <UnidadesObra refObra={id} />
        </CardBody>
      </Card>
      <EntregasObra id={id} />
    </App>
  );
};

export default ViewObra;
