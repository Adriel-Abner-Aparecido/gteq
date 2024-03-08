import { Button, FormLabel, FormControl, Container, Card, CardHeader, CardBody } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiUrl from '../../config';


const SignupPage = () => {

  const [formData, setFormData] = useState({
    nomeUsuario: '',
    nomeCompleto: '',
    emailUsuario: '',
    senhaUsuario: '',
    // companyUsuario: '',
    confirmaSenha: '',
  });

  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

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
      // Redirecionar ou fazer outras operações após o cadastro
      navigate('/');

    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  return (
    <Container className="container-fluid h-100 d-flex bg-dark">
        <Card className="card h-600 m-auto">
            <CardHeader className="card-header text-center">
                <h1 className="text-primary">Cadastrar-se</h1>
            </CardHeader>
            <CardBody className="card-body">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <FormLabel htmlFor="nomeUsuario">Usuario:</FormLabel>
                        <FormControl type="text" id="nomeUsuario" name="nomeUsuario" value={formData.nomeUsuario} onChange={handleChange} required/>
                        <Form.Control.Feedback type="invalid">
                            Insira um nome de usuario!
                        </Form.Control.Feedback>
                    </div>
                    <div className="mb-3">
                        <FormLabel htmlFor="nomeCompleto">Nome Completo:</FormLabel>
                        <FormControl type="text" id="nomeCompleto" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} required/>
                        <Form.Control.Feedback type="invalid">
                            Insira um nome completo!
                        </Form.Control.Feedback>
                    </div>
                    <div className="mb-3">
                      <FormLabel htmlFor="emailUsuario">Email:</FormLabel>
                      <FormControl type="email" id="emailUsuario" name='emailUsuario' value={formData.emailUsuario} onChange={handleChange} required/>
                      <Form.Control.Feedback type="invalid">
                            Insira um email valido!
                      </Form.Control.Feedback>
                    </div>
                    {/* <div className="mb-3">
                      <FormLabel htmlFor="companyUsuario">Empresa:</FormLabel>
                      <FormControl type='text' id='companyUsuario' name='companyUsuario' value={formData.companyUsuario} onChange={handleChange} required/>
                    </div> */}
                    <div className="mb-3">
                      <FormLabel htmlFor="senhaUsuario">Senha:</FormLabel>
                      <FormControl type="password" id="senhaUsuario" name='senhaUsuario' value={formData.senhaUsuario} onChange={handleChange} required/>
                      <Form.Control.Feedback type="invalid">
                            Informe uma senha!
                      </Form.Control.Feedback>
                    </div>
                    <div className="mb-3">
                      <FormLabel htmlFor="confirmaSenha">Confirmar Senha:</FormLabel>
                      <FormControl type="password" id="confirmaSenha" name='confirmaSenha' value={formData.confirmaSenha} onChange={handleChange} required/>
                      
                    </div>
                    <Button type="submit" color='primary'>Cadastrar</Button>
                    <a href="./" className="btn btn-link">Logar</a>
                  </Form>
            </CardBody>
        </Card>
    </Container>
  );
};

export default SignupPage;