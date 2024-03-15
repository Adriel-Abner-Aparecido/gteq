import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Form, FormGroup, FormControl, FormLabel, Table, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import LateralNav from '../../components/lateralNav';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BsSquare } from 'react-icons/bs';
import '../obra/index.css'
import FormUnidadesObra from '../../components/formUnidadesObra';
import apiUrl from '../../config';
import UnidadesObra from '../../components/unidadesObra';


const ViewObra = () => {

  const { id } = useParams();

  const [obra, setObra] = useState([]);
  const [entregaServico, setEntregaServico] = useState([]);
  const [metaObra, setMetaObra] = useState();
  const [metaNumber, setMetaNumber] = useState();

  const [formData, setFormData] = useState({
    relObra: '',
    valorMeta: '',
  });

  const [formUpdate, setFormUpdate] = useState({
    valorMeta: '',
  })

  useEffect(() => {
    const fetchObra = async () => {
      try {
        const responseObra = await axios.get(`${apiUrl}/obra/${id}`);
        const responseEntregaServico = await axios.get(`${apiUrl}/entregaServicoObra/${id}`);
        const responseMetaObra = await axios.get(`${apiUrl}/metaObra/${id}`);
        setObra(responseObra.data.obra);
        setEntregaServico(responseEntregaServico.data.entregaServico);
        setMetaObra(responseMetaObra.data.metaObra);
        setMetaNumber(responseMetaObra.data.metaObra[0].valorMeta)
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchObra();
  }, [id]);

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    const dataToSend = {
      ...formData,
      relObra: obra._id,
    };

    try {
      const response = await fetch(`${apiUrl}/metaObra`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });
      await response.json();
    } catch (error) {
      console.error('Erro ao cadastrar Meta:', error);
    }
  }

  const handleUpdate = async (event) => {
    if (!event.target.value) {
      setMetaNumber('')
    } else {
      setMetaNumber(event.target.value);
    }
    setFormUpdate({ valorMeta: `${event.target.value}` });
  }

  const atualizaDados = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${apiUrl}/metaObra/${metaObra[0]._id}`, formUpdate);

    } catch (error) {
      console.error('Erro ao cadastrar Obra:', error);
    }

  }

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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                    <Col>
                      <Row xxl={12} className='gap-2 mb-3'>
                          <UnidadesObra refObra={obra && obra._id} />
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {
                        metaObra && metaObra.length === 0 && (
                          <Form onSubmit={handleSubmit}>
                            <input type='hidden' id='relObra' name='relObra' value={obra && obra._id} onChange={handleChange} />
                            <FormGroup as={Row} >
                              <FormLabel column xl={1} htmlFor='valorMeta' className="text-center">Meta:</FormLabel>
                              <Col xl={1} className='px-0'>
                                <FormControl className='input-number' type="number" id='valorMeta' name='valorMeta' value={formData.valorMeta} onChange={handleChange} required />
                              </Col>
                              <Col xl={2} className='px-0'>
                                <Button variant='link' type='submit'>Definir</Button>
                              </Col>
                            </FormGroup>
                          </Form>
                        )
                      }
                      {
                        metaObra && metaObra.length > 0 && (
                          <Form onSubmit={atualizaDados} id='formUpdate'>
                            <FormGroup as={Row} >
                              <FormLabel column xl={1} htmlFor='valorMeta' className="text-center">Meta:</FormLabel>
                              <Col xl={1} className='px-0'>
                                <input className='form-control input-number' type="number" id='valorMeta' name="valorMeta" value={metaNumber} onChange={handleUpdate} required />
                              </Col>
                              <Col xl={2} className='px-0'>
                                <Button variant='link' type='submit'>Definir</Button>
                              </Col>
                            </FormGroup>
                          </Form>
                        )
                      }
                    </Col>
                  </Row>
                  <Row className='mt-5'>
                    <Col>
                      <Button href={`./editaObra/${obra._id}`} variant='primary'>Editar</Button>
                      <Button variant='danger' className='mx-3' onClick={handleShow}>Apagar</Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <FormUnidadesObra refObra={obra && obra._id} />
          {
            entregaServico.length > 0 && (
              <Card className='mt-5'>
                <CardHeader>
                  Atualizações
                </CardHeader>
                <CardBody>

                  <Table striped>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Etapa</th>
                        <th>Data</th>
                        <th>Status</th>
                        <th>Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        entregaServico.map(servico => (

                          <tr key={servico._id}>
                            <td className='align-middle'>{i++}</td>
                            <td className='align-middle'>{servico.etapaEntregue}</td>
                            <td className='align-middle'>{formatarData(servico.createdAt)}</td>
                            <td className='align-middle'>{servico.statusEntrega}</td>
                            <td className='align-middle'><Button variant='link'><BsSquare /></Button></td>
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
            entregaServico.length === 0 && (
              <Card className='mt-5'>
                <CardBody>
                  <p className='text-center my-auto'>Ainda não entregou nada</p>
                </CardBody>
              </Card>
            )
          }
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} animation={true} centered>
        <Modal.Header closeButton>
          <Modal.Title><h1>Alerta</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>Você tem certeza?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Sim
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Não
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>

  );
};

export default ViewObra;