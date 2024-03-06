import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormControl, FormLabel, FormSelect, Row, Table } from "react-bootstrap";
import Avatar from '../../images/avatar.jpg'
import { useNavigate } from "react-router-dom";
import { Bs0CircleFill } from "react-icons/bs";

const AreaUsuario = () => {

    const navigate = useNavigate(); 

    const handleLogout = () => {
      localStorage.removeItem('token');
      return navigate("/login");
    };

    return(
            <Container className="pb-5">
                <Row className="bg-light p-5">
                    <Col>
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <img src={Avatar} alt={Avatar} className="avatar rounded rounded-circle p-2"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-center">
                                User
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <Button variant="link" onClick={handleLogout}>Sair</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center py-xxl-5 py-md-5">
                    <Col xxl={4}>
                        <Card>
                            <CardHeader className="text-center">
                                A receber
                            </CardHeader>
                            <CardBody>
                                <p className="valor text-success text-center">R$1500,00</p>
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
                <Row className="d-flex justify-content-center mt-5">
                    <Col xxl={4}>
                        <Card>
                            <CardHeader className="text-center">
                                Ultimas entregas
                            </CardHeader>
                            <CardBody>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Etapa</th>
                                            <th>Data</th>
                                            <th className="text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Lixa</td>
                                            <td>01-04-2004</td>
                                            <td className="text-center"><Bs0CircleFill className="btn bg-danger"/></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
    )
}
export default AreaUsuario;