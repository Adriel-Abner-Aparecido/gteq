import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from 'react-bootstrap';
import LateralNav from '../../components/lateralNav';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../obra/index.css'
import FormUnidadesObra from '../../components/formUnidadesObra';
import apiUrl from '../../config';
import EntregasObra from '../../components/tableEntregasObra';
import FormMetaObras from '../../components/formMetaObras';
import FormServicoPrestado from '../../components/formServicoPrestado';
import ServicosPrestados from '../../components/tableServicosPrestados';
import UnidadesObra from '../../components/unidadesObra';


const ViewObra = () => {

  const { id } = useParams();

  const [obra, setObra] = useState([]);
  const [metaObra, setMetaObra] = useState([]);


  useEffect(() => {
    const fetchObra = async () => {
      try {
        const responseObra = await axios.get(`${apiUrl}/obra/${id}`);

        setObra(responseObra.data.obra);

      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchObra();
  }, [id]);

  return (
    <Container className='p-0 h-100'>
      <Row className='p-0 m-0 '>
        <LateralNav />
        <Col sm={12} md={10} xxl={10} className="p-5 h-100">
          <Card>
            <CardHeader>
              <h1>{obra && obra.nomeObra}</h1>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xl={12}>
                  <Row className='mb-3'>
                    <Col xxl={3}>
                      Endereço: {obra && obra.enderecoObra}
                    </Col>
                    <Col xxl={2}>
                      n°: {obra && obra.numeroRua}
                    </Col>
                    <Col xxl={3}>
                      Cidade: {obra && obra.cidadeObra}
                    </Col>
                    <Col xxl={4}>
                      Complemento: {obra && obra.complementoObra}
                    </Col>
                  </Row>
                  <Row>
                    <Col className='mb-3'>
                      Tipo de Obra: {obra && obra.tipoObra}
                    </Col>
                  </Row>
                  <Row className='mb-3'>
                    <Col>
                      Serviços prestados: {obra && obra.servicoPrestado}
                    </Col>
                  </Row>
                  <Row className='mb-3'>
                    <Col>
                      Descrição: {obra && obra.descricaoObra}
                    </Col>
                  </Row>
                  <Row>
                    <FormMetaObras id={id} metaObra={metaObra} setMetaObra={setMetaObra} />
                  </Row>
                  <Row className='mt-5'>
                    <Col xl={2}>
                      <Button className='w-100' href={`./editarObra/${obra._id}`} variant='primary'>Editar</Button>
                      {/* <Button variant='danger' className='mx-3' onClick={handleShow}>Apagar</Button> */}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card className='mt-5'>
            <CardBody>
              <UnidadesObra refObra={id} />
            </CardBody>
          </Card>
          <FormServicoPrestado refObra={id} />
          <ServicosPrestados refObra={id} />
          <FormUnidadesObra refObra={id} />
          <EntregasObra id={id} />
        </Col>
      </Row>
    </Container>

  );
};

export default ViewObra;