import { useState } from "react";
import apiUrl from "../config";
import { Form, FormLabel, FormSelect, FormControl, Button } from "react-bootstrap";


const FormEntregasUsuario = ({userId, userName})=>{

    const [formData, setFormData] = useState({
        refUsuario: userId,
        refObra: '',
        nomeUsuario: userName,
        nomeObra: '',
        blocoObra: '',
        unidadeObra: '',
        etapaEntregue: '',
        statusEntrega: '',
      });
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
          const response = await fetch(`${apiUrl}/cadastro`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
    
          const data = await response.json();
          alert(data.message);
    
        } catch (error) {
          console.error('Erro ao cadastrar usuário:', error);
        }
      };

    return(
        <Form validated={validated} onSubmit={handleSubmit}>
            <FormLabel htmlFor="nomeObra">Obra:</FormLabel>
            <FormSelect className="mb-2" name="nomeObra" onChange={handleChange}>
                <option></option>
                <option value="obra 1">Obra 1</option>
                <option value="obra 2">Obra 2</option>
            </FormSelect>
            <FormLabel htmlFor="blocoObra">Bloco:</FormLabel>
            <FormSelect className="mb-2" name="blocoObra" on onChange={handleChange}>
                <option></option>
                <option value="bloco 1">Bloco 1</option>
                <option value="bloco 2">Bloco 2</option>
            </FormSelect>
            <FormLabel htmlFor="etapaEntregue">Etapa:</FormLabel>
            <FormSelect className="mb-2" name="etapaEntregue" onChange={handleChange}>
                <option></option>
                <option value="etapa 1">Etapa 1</option>
                <option value="etapa 2">Etapa 2</option>
            </FormSelect>
            <FormLabel htmlFor="unidadeObra">Unidade:</FormLabel>
            <FormControl className="mb-2" type="text" name="unidadeObra"/>
            <Button className="w-100" variant="primary" type="submit">Entregar</Button>
        </Form>
    )
}
export default FormEntregasUsuario;