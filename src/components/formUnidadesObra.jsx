import { Button, Card, CardBody, Col, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { useState } from "react";

const FormUnidadesObra = ({refObra})=>{

    const [formData, setFormData] = useState({
        relObra: refObra,
        numeroBloco: '',
        numeroAndares: '',
        numeroUnidades: '',
    })

    const handleChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };

      const handleSubmit = async() => {

        try {
            const response = await fetch('http://localhost:3000/cadastroNumerosObra', {
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

    return(
        <>
            <Card className="mt-5">
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup as={Row}>
                            {/* <input type="hidden" name="relObra" value={refObra} onChange={handleChange} required/> */}
                            <Col xxl="auto" className="text-end">
                                <FormLabel htmlFor="numeroBloco" className="my-auto">N° BLoco:</FormLabel>
                            </Col>
                            <Col className="p-0">
                                <FormControl name="numeroBloco" onChange={handleChange} required/>
                            </Col>
                            <Col xxl="auto" className="text-end">
                                <FormLabel htmlFor="numeroAndares">N° Andares:</FormLabel>
                            </Col>
                            <Col className="p-0">
                                <FormControl name="numeroAndares" onChange={handleChange} required/>
                            </Col>
                            <Col xxl="auto" className="text-end">
                                <FormLabel htmlFor="numeroUnidades" className="my-auto">N° Unidades:</FormLabel>
                            </Col>
                            <Col className="p-0">
                                <FormControl name="numeroUnidades" onChange={handleChange} required/>
                            </Col>
                            <Col>
                                <Button type="submit">Cadastrar</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        </>
    )
}
export default FormUnidadesObra;
