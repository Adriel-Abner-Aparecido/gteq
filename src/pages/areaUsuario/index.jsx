import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormControl, FormLabel, FormSelect, Row, Table } from "react-bootstrap";
import Avatar from '../../images/avatar.png'
import { useNavigate } from "react-router-dom";
import { BsCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import ValorAreceber from "../../components/valorAreceber";

const AreaUsuario = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('token');
      return navigate("/login");
    };

    const token = localStorage.getItem('token');
    const tokenPayload = JSON.parse(token);
    const userId = tokenPayload?.userId;
    const userName = tokenPayload?.userName;

    const [entregaServico, setEntregaServico] = useState();

    useEffect(()=>{
        const fetchServicos = async()=>{
        try {
            const responseEntregaServico = await axios.get(`localhost:3000/entregaServico/${userId}`);
            setEntregaServico(responseEntregaServico.data.entregaServico);
        }catch{

        }
        }
        fetchServicos();
    }, [userId]);

    const formatarData = (dataString) => {
        const data = new Date(dataString);
        // const hora = ("0" + data.getHours()).slice(-2);
        // const minutos = ("0" + data.getMinutes()).slice(-2);
        const dia = ("0" + data.getDate()).slice(-2);
        const mes = ("0" + (data.getMonth() + 1)).slice(-2);
        const ano = data.getFullYear();
        return `${dia}-${mes}-${ano}`;
      };


    return(
            <Container className="pb-5">
                <Row className="bg-light pt-5 pb-3">
                    <Col>
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <img src={Avatar} alt={Avatar} className="avatar rounded rounded-circle p-2"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-center p-2">
                                <h3 className="my-auto">{userName}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <Button variant="link" onClick={handleLogout}>Sair</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center mb-5 mt-5">
                    <Col xxl={4}>
                        <Card>
                            <CardHeader className="text-center">
                                A receber
                            </CardHeader>
                            <CardBody>
                                <p className="valor text-success text-center">R$<ValorAreceber userId={userId}/>,00</p>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col xxl={4}>
                        <Card>
                            <CardHeader className="text-center">
                                Entregar
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <FormLabel htmlFor="nomeObra">Obra:</FormLabel>
                                    <FormSelect className="mb-2" name="nomeObra">
                                        <option></option>
                                        <option value="obra 1">Obra 1</option>
                                        <option value="obra 2">Obra 2</option>
                                    </FormSelect>
                                    <FormLabel htmlFor="blocoObra">Bloco:</FormLabel>
                                    <FormSelect className="mb-2" name="blocoObra">
                                        <option></option>
                                        <option value="bloco 1">Bloco 1</option>
                                        <option value="bloco 2">Bloco 2</option>
                                    </FormSelect>
                                    <FormLabel htmlFor="etapaEntregue">Etapa:</FormLabel>
                                    <FormSelect className="mb-2" name="etapaEntregue">
                                        <option></option>
                                        <option value="etapa 1">Etapa 1</option>
                                        <option value="etapa 2">Etapa 2</option>
                                    </FormSelect>
                                    <FormLabel htmlFor="unidadeObra">Unidade:</FormLabel>
                                    <FormControl className="mb-2" type="text" name="unidadeObra"/>
                                    <Button className="w-100" variant="primary" type="submit">Entregar</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col xxl={4}>
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
                                            <th>Etapa</th>
                                            <th>Data</th>
                                            <th className="text-center">Status</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            entregaServico.map(servico=>(
                                                <tr key={servico._id}>
                                                    <td className='align-middle'>{servico.etapaEntregue}</td>
                                                    <td className='align-middle'>{formatarData(servico.createdAt)}</td>
                                                    <td className='align-middle text-center'>{servico.statusEntrega === 'pendente' ? 
                                                    (<BsCircleFill className="text-warning"/>) : servico.statusEntrega === 'aceito'?
                                                    (<BsCircleFill className="text-success"/>) : (<BsCircleFill className="text-danger"/>)
                                                    }</td>
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
    )
}
export default AreaUsuario;