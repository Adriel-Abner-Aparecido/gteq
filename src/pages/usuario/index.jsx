import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from 'react-bootstrap';
import Avatar from '../../images/avatar.jpg'
import LateralNav from '../../components/lateralNav';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import apiUrl from '../../config';
import FormMetaUsers from '../../components/formMetaUsers';
import EntregasUsuarios from '../../components/tableEntregasUsuario';



const ViewUsuario = () => {

  const { id } = useParams();

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const responseUsuario = await axios.get(`${apiUrl}/usuario/${id}`);
        setUsuario(responseUsuario.data.usuario);
      } catch (error) {
        console.error('Erro ao buscar dados', error);
      }
    };
    fetchUsuario();
  }, [id]);

  return (
    <Container className='p-0 h-100'>
      <Row className='p-0 m-0 '>
        <LateralNav />
        <Col sm={12} md={10} xxl={10} className="p-5 h-100">
          <Card>
            <CardHeader>
              Usuario
            </CardHeader>
            <CardBody>
              <Row>
                <Col xl={3} className='d-flex justify-content-center'>
                  <img src={Avatar} className='avatar rounded rounded-circle p-2 my-auto' alt={Avatar} />
                </Col>
                <Col xl={9}>
                  <Row className='mb-3'>
                    <Col>
                      Nome: {usuario && usuario.nomeUsuario}
                    </Col>
                  </Row>
                  <Row>
                    <Col className='mb-3'>
                      Nome Completo: {usuario && usuario.nomeCompleto}
                    </Col>
                  </Row>
                  <Row className='mb-3'>
                    <Col>
                      Email: {usuario && usuario.emailUsuario}
                    </Col>
                  </Row>
                  <Row className='mb-3'>
                    <Col>
                      Tipo de usuario: {usuario && usuario.nivelUsuario}
                    </Col>
                  </Row>
                  <Row className='mb-3'>
                    <Col>
                      Função: {usuario && usuario.funcaoUsuario}
                    </Col>
                  </Row>
                  <Row>
                    <FormMetaUsers id={id} />
                  </Row>
                  <Row className='mt-3'>
                    <Col xxl={2} xs={6} >
                      <Button className='w-100' href={`/usuarios/usuario/editarUsuario/${id}`} variant="primary">Editar</Button>
                    </Col>
                    {/* <Col xxl={2} xs={6}>
                      <Button className='w-100' variant="danger">Apagar</Button>
                    </Col> */}
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <EntregasUsuarios id={id} />
        </Col>
      </Row>
    </Container>
  );
};

export default ViewUsuario;