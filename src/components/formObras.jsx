import { Button, Card, CardBody, CardHeader, Col, Form, FormControl, FormLabel, FormSelect, Row } from "react-bootstrap"
import { BsPlusCircle } from "react-icons/bs";
import './style/style.css';
import { useState, useEffect } from "react";
import axios from "axios";

const FormObras =()=>{


    const [formData, setFormData] = useState({
        nomeObra:'',
        enderecoObra: '',
        cidadeObra: '',
        numeroRua: '',
        complementoObra: '',
        tipoObra: '',
        qtdBlocos: '',
        qtdAndares: '',
        qtdApartamentos: '',
        servicoPrestado:'',
        precoServico: '',
        descricaoObra:'',
        // formDados: [],
    })

    // const[formDados, setFormDados] = useState([])

    // const handleDados = () => {
    //     setFormDados(...formDados, )
    //     setFormDados()
    // }
    
    const [validated, setValidated] = useState(false);
    const handleChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };
    
    const handleSubmit = async event => {
        
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
          setValidated(true);
          return;
        }
        setValidated(true);
        
        try {
          const response = await fetch('http://localhost:3000/cadastroObras', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
    
          const data = await response.json();
          alert(data.message);
    
        } catch (error) {
          console.error('Erro ao cadastrar Obra:', error);
        }
    };

    const [servicos, setServicos] = useState([])

    useEffect(()=>{
        listaServicos();
    }, []);

    const listaServicos = async () =>{
        try {
            const response = await axios.get('http://localhost:3000/servicos');
            setServicos(response.data.servicos);
        }catch{
            console.log("Erro ao buscar os dados");
        }
    }


    return(
         <Card>
                <CardHeader>
                    <h1>Cadastro Obras</h1>
                </CardHeader>
                <CardBody>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row>
                            <Col xl={4}>
                                <FormLabel htmlFor="nomeObra">Nome da Obra:</FormLabel>
                                <FormControl type="text" id="nomeObra" name="nomeObra" value={formData.nomeObra} onChange={handleChange} required/>
                            </Col>
                        </Row>
                        <Row className="pt-3">
                            <Col xl={4}>
                                <FormLabel htmlFor="enderecoObra">Endereço:</FormLabel>
                                <FormControl type="text" id="enderecoObra" name="enderecoObra" value={formData.enderecoObra} onChange={handleChange} required/>
                            </Col>
                            <Col xl={3}>
                                <FormLabel htmlFor="cidadeObra">Cidade:</FormLabel>
                                <FormControl type="text" id="cidadeObra" name="cidadeObra" value={formData.cidadeObra} onChange={handleChange} required/>
                            </Col>
                            <Col xl={2}>
                                <FormLabel htmlFor="numeroRua">N°:</FormLabel>
                                <FormControl className="input-number" type="number" id="numeroRua" name="numeroRua" value={formData.numeroRua} onChange={handleChange} required/>
                            </Col>
                            <Col xl={3}>
                                <FormLabel htmlFor="complementoObra">Complemento:</FormLabel>
                                <FormControl type="text" id="complementoObra" name="complementoObra" value={formData.complementoObra} onChange={handleChange} required/>
                            </Col>
                        </Row>
                        <Row className="pt-3">
                            <Col xl={4}>
                                <FormLabel htmlFor="tipoObra">Tipo de obra:</FormLabel>
                                <FormSelect id="tipoObra" name="tipoObra" value={formData.tipoObra} onChange={handleChange} required>
                                    <option></option>
                                    <option value="Condominio de Apartamentos">Condominio de Apartamentos</option>
                                    <option value="Condominio de casas">Condominio de casas</option>
                                    <option value="Condominio de casas + Apartamentos">Condominio de casas + Apartamentos</option>
                                    <option value="Condominio Comercial">Condominio Comercial</option>
                                    <option value="Apartamento">Apartamento</option>
                                    <option value="Casa">Casa</option>
                                    <option value="Sobrado">Sobrado</option>
                                    <option value="Barracão">Barracão</option>
                                </FormSelect>
                            </Col>
                        </Row>
                        <Row className="pt-3">
                            <Col xl={6}>
                                <Row>
                                    <Col xl={4}>
                                        <FormLabel htmlFor="qtdBlocos">Qtd Blocos:</FormLabel>
                                        <FormControl className="input-number" type="number" id="qtdBlocos" name="qtdBlocos" value={formData.qtdBlocos} onChange={handleChange} required/>
                                    </Col>
                                    <Col xl={4}>
                                        <FormLabel htmlFor="qtdAndares">Qtd Andares:</FormLabel>
                                        <FormControl className="input-number" type="number" id="qtdAndares" name="qtdAndares" value={formData.qtdAndares} onChange={handleChange} required/>
                                    </Col>
                                    <Col xl={4}>
                                        <FormLabel htmlFor="qtdApartamentos">Unidades:</FormLabel>
                                        <FormControl className="input-number" type="number" id="qtdApartamentos" name="qtdApartamentos" value={formData.qtdApartamentos} onChange={handleChange} required/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xl={6} className="d-flex align-middle">
                                <Row className="d-flex align-middle">
                                    <Col xl={4} className="d-flex align-middle">
                                        <Button variant="link" className="p-0 mt-auto text-dark">
                                            <h3><BsPlusCircle/></h3>
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col xl={4}>
                                <Row>
                                    <Col xl={8}>
                                        <FormLabel htmlFor="servicoPrestado">Serviço Prestado:</FormLabel>
                                        <FormSelect id="servicoPrestado" name="servicoPrestado" value={formData.servicoPrestado} onChange={handleChange} required>
                                            <option></option>
                                            { servicos.map(servicos=>(
                                                    <option key={servicos._id} value={servicos.nomeServico}>{servicos.nomeServico}</option>
                                                )) 
                                            }
                                        </FormSelect>
                                    </Col>
                                    <Col xl={4}>
                                        <FormLabel htmlFor="precoServico">Preço:</FormLabel>
                                        <FormControl className="input-number" type="number" id="precoServico" name="precoServico" value={formData.precoServico} onChange={handleChange} required/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xl={6} className="d-flex align-middle">
                                <Row className="d-flex align-middle">
                                    <Col xl={6} className="d-flex align-middle">
                                        <Button variant="link" className="p-0 mt-auto text-dark">
                                            <h3><BsPlusCircle/></h3>
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="pt-3">
                            <Col xl={12}>
                                <FormLabel htmlFor="descricaoObra">Descrição:</FormLabel>
                                <FormControl as="textarea" rows={4} id="descricaoObra" name="descricaoObra" value={formData.descricaoObra} onChange={handleChange} required/>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col xl={12}>
                                <Button  type="submit">Cadastrar Obra</Button>
                                <Button href="../obras" className="mx-3" variant="danger" type="reset">Cancelar</Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
    )
}
export default FormObras;