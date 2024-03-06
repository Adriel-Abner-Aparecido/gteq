import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Form, FormGroup, FormControl, FormLabel, Table, Button } from 'react-bootstrap';
import Avatar from '../../images/avatar.jpg'
import LateralNav from '../../components/lateralNav';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BsSquare } from 'react-icons/bs';



const ViewUsuario = () => {

  const {id} = useParams();

  const [usuario, setUsuario] = useState(null);
  const [entregaServico, setEntregaServico] = useState([]);
      
    useEffect(() => {
      const fetchUsuario = async () => {
        try {
          const responseUsuario = await axios.get(`http://localhost:3000/usuario/${id}`);
          const responseEntregaServico = await axios.get(`http://localhost:3000/entregaServico/${id}`);
            setUsuario(responseUsuario.data.usuario);
            setEntregaServico(responseEntregaServico.data.entregaServico);
            console.log(setEntregaServico);
        } catch (error) {
          console.error('Erro ao buscar usuário:', error);
        }
      };
      fetchUsuario();
    }, [id]);

    var i = 1;
    

    //Formata a Data
    
    const formatarData = (dataString) => {
      const data = new Date(dataString);
      const hora = ("0" + data.getHours()).slice(-2);
      const minutos = ("0" + data.getMinutes()).slice(-2);
      const dia = ("0" + data.getDate()).slice(-2);
      const mes = ("0" + (data.getMonth() + 1)).slice(-2);
      const ano = data.getFullYear();
      return `${hora}:${minutos} ${dia}-${mes}-${ano}`;
    };
  
  return (
    <Container className='p-0 h-100'>
      <Row className='p-0 m-0 '>
        <LateralNav/>
          <Col sm={12} md={10} xxl={10} className="p-5 h-100">
            <Card>
              <CardHeader>
                  Usuario
              </CardHeader>
              <CardBody>
                  <Row>
                      <Col xl={3} className='d-flex justify-content-center'>
                          <img src={Avatar} className='avatar rounded rounded-circle p-2' alt={Avatar}/>
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
                          <Row>
                            <Col className=''>
                                <Form>
                                {/* <FormControl type='hidden' id='refUser' name='refUser' value={usuario && usuario._id}/> */}
                                <FormGroup as={Row} >
                                  <FormLabel column xxl={1} xl={2} md={2} htmlFor='metaUsuario' className="text-center">Meta:</FormLabel>
                                  <Col xxl={1} xl={2} md={2} className='px-0'>
                                    <FormControl type="text" id='metaUsuario' name='metaUsuario'/>
                                  </Col>
                                  <Col xxl={2} xl={2} className='px-0'>
                                    <Button variant='link' type='submit'>Definir</Button>
                                  </Col>
                                </FormGroup>
                              </Form>
                            </Col>
                          </Row>
                      </Col>
                  </Row>
              </CardBody>
            </Card>
            {
            entregaServico && entregaServico.length > 0 && (
            <Card className='mt-5'>
              <CardHeader>
                Atualizações
              </CardHeader>
              <CardBody>
                  
                      <Table striped>
                        <thead>
                          <tr>
                            <th></th>
                            <th>Nome</th>
                            <th>Obra</th>
                            <th>Etapa</th>
                            <th>Data</th>
                            <th>Status</th>
                            <th>Ação</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            entregaServico.map(servico=>(

                              <tr key={servico._id}>
                                <td className='align-middle'>{i++}</td>
                                <td className='align-middle'>{servico.nomeUsuario}</td>
                                <td className='align-middle'>{servico.nomeObra}</td>
                                <td className='align-middle'>{servico.etapaEntregue}</td>
                                <td className='align-middle'>{formatarData(servico.createdAt)}</td>
                                <td className='align-middle'>{servico.statusEntrega}</td>
                                <td className='align-middle'><Button variant='link'><BsSquare/></Button></td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </Table>
              </CardBody>
            </Card>
            )
          }
          {
            entregaServico && entregaServico.length === 0 && (
              <Card className='mt-5'>
                <CardBody>
                  <p className='text-center my-auto'>Ainda não entregou nada</p>
                </CardBody>
              </Card>
            )
          }
          </Col>
      </Row>
    </Container>
  );
};

export default ViewUsuario;