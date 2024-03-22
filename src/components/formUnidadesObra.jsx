import { Button, Card, CardBody, Col, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { useState } from "react";
import apiUrl from "../config";

const FormUnidadesObra = ({refObra})=>{

    const [formData, setFormData] = useState({
        refObra: '',
        numeroBloco: '',
        numeroAndares: '',
        numeroUnidades: '',
    })

    const handleChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };

      const handleSubmit = async() => {
        const dataToSend = {
            ...formData,
            refObra: refObra,
          };

        try {
            const response = await fetch(`${apiUrl}/cadastroNumerosObra`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(dataToSend)
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
                        <FormGroup as={Row} className="g-sm-3 g-xxl-3">
                            <Col xxl="auto" className="text-xxl-end p-xxl-1">
                                <FormLabel htmlFor="numeroBloco" className="my-auto">N° BLoco:</FormLabel>
                            </Col>
                            <Col className="p-0">
                                <FormControl name="numeroBloco" onChange={handleChange} required/>
                            </Col>
                            <Col xxl="auto" className="text-xxl-end p-xxl-1 ms-xxl-2">
                                <FormLabel htmlFor="numeroAndares">N° Andares:</FormLabel>
                            </Col>
                            <Col  className="p-0">
                                <FormControl name="numeroAndares" onChange={handleChange} required/>
                            </Col>
                            <Col xxl="auto" className="text-xxl-end p-xxl-1 ms-xxl-2">
                                <FormLabel htmlFor="numeroUnidades" className="my-auto">N° Unidades:</FormLabel>
                            </Col>
                            <Col  className="p-0">
                                <FormControl name="numeroUnidades" onChange={handleChange} required/>
                            </Col>
                            <Col xxl="auto" className="px-xxl-3 p-0">
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
