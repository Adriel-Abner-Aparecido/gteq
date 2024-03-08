import React, { useState } from 'react';
import { Button, FormLabel, FormControl, Container, Card, CardHeader, CardBody } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    nomeUsuario: '', 
    senhaUsuario: ''
  });
  const navigate = useNavigate();

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value});
  }

  const handleSubmit = async (event) => {

    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false){
      event.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);

    try{
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
      });

      if(response.ok){
        const { token, nivelUsuario, userId, userName } = await response.json();

        const tokenPayLoad = {token, nivel: nivelUsuario, userId: userId, userName: userName};
        localStorage.setItem('token', JSON.stringify(tokenPayLoad));
        
        if(nivelUsuario === 'user'){
          navigate('/areaUsuario');
        }
        if(nivelUsuario === 'adm'){
          navigate('/dashboard')
        }
        
      }else{
        alert('Usuario ou senha Ivalidos');
      }



    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Verifique o console para mais informações.');
    }

  };

  return (
    <Container className="container-fluid bg-dark h-100 d-flex">
      <Card className="h-600 m-auto">
        <CardHeader className=" text-center">
          <h1 className="text-primary">Login</h1>
        </CardHeader>
          <CardBody>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              
                <FormLabel htmlFor="nomeUsuario">Usuário:</FormLabel>
                <FormControl type="text" className="form-control" id="nomeUsuario" name='nomeUsuario' value={formData.nomeUsuario} onChange={handleChange} required/>
              
              
                <FormLabel htmlFor="senhaUsuario">Senha:</FormLabel>
                <FormControl type="password" className="form-control" id="senhaUsuario" name='senhaUsuario' value={formData.senhaUsuario} onChange={handleChange} required/>
             
              
              <div className='mt-3'>
                <Button type="submit" color="primary" className='btn'>Login</Button>
                {/* <Button color="primary" href="./dashboard">Login</Button> */}
                <a href="./cadastro" className="btn btn-link">Cadastrar-se</a>
              </div>
            </Form>
          </CardBody>
      </Card>
    </Container>
  );
};

export default LoginPage;