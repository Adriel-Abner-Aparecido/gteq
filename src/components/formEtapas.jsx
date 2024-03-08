import { Button, Card, CardBody, Col, Form, FormControl, FormSelect, Row } from "react-bootstrap"
import { useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "../config";

const FormEtapas = () => {

    const [formData, setFormData]= useState({
        nomeEtapa: '',
        relEtapa: ''
    });
    
    const handleChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async() =>{
        try {
            const response = await fetch(`${apiUrl}/cadastroEtapa`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
            });
            await response.json();
          } catch (error) {
            console.error('Erro ao cadastrar Serviço:', error);
          }
    }

    const [servicos, setServicos] = useState([])

    useEffect(()=>{
        listaServicos();
    }, []);

    const listaServicos = async () =>{
        try {
            const response = await axios.get(`${apiUrl}/servicos`);
            setServicos(response.data.servicos);
        }catch{
            console.log("Erro ao buscar os dados");
        }
    }


    return(
        <Card>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col xl={4}>
                            <FormSelect  id="relEtapa" name="relEtapa" value={formData.relEtapa} onChange={handleChange} required>
                                <option value="0">Serviço Relacionado</option>
                                { servicos.map(servicos=>(
                                        <option key={servicos._id} value={servicos.nomeServico}>{servicos.nomeServico}</option>
                                    )) 
                                }
                            </FormSelect>
                        </Col>
                        <Col xl={4}>
                            <FormControl id="nomeEtapa" name="nomeEtapa" placeholder="Etapa" value={formData.nomeEtapa} onChange={handleChange} required/>
                        </Col>
                        <Col xl={1}>
                            <Button type="submit">Cadastrar</Button>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    )
}
export default FormEtapas;