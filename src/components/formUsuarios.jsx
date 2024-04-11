import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormLabel,
  FormControl,
  Button,
  FormSelect,
} from "react-bootstrap";
import { useState } from "react";
import apiUrl from "../config";

const FormUsuarios = () => {
  const [formData, setFormData] = useState({
    nomeUsuario: "",
    nomeCompleto: "",
    emailUsuario: "",
    nivelUsuario: "",
    senhaUsuario: "",
    confirmaSenha: "",
    funcaoUsuario: "",
  });

  const [validated, setValidated] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);

    try {
      const response = await fetch(`${apiUrl}/usuarios/cadastro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${settoken}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  return (
    <Card>
      <CardHeader className=" text-center">
        <h1 className="text-primary">Cadastrar-se</h1>
      </CardHeader>
      <CardBody>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div className="mb-3">
            <FormLabel htmlFor="nomeUsuario">Usuario:</FormLabel>
            <FormControl
              type="text"
              id="nomeUsuario"
              name="nomeUsuario"
              value={formData.nomeUsuario}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Insira um nome de usuario!
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <FormLabel htmlFor="nomeCompleto">Nome Completo:</FormLabel>
            <FormControl
              type="text"
              id="nomeCompleto"
              name="nomeCompleto"
              value={formData.nomeCompleto}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Insira um nome completo!
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <FormLabel htmlFor="emailUsuario">Email:</FormLabel>
            <FormControl
              type="email"
              id="emailUsuario"
              name="emailUsuario"
              value={formData.emailUsuario}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Insira um email valido!
            </Form.Control.Feedback>
          </div>
          {/* <div className="mb-3">
                      <FormLabel htmlFor="companyUsuario">Empresa:</FormLabel>
                      <FormControl type='text' id='companyUsuario' name='companyUsuario' value={formData.companyUsuario} onChange={handleChange} required/>
                    </div> */}
          <div className="mb-3">
            <FormLabel htmlFor="nivelUsuario">Tipo de Usuario:</FormLabel>
            <FormSelect
              id="nivelUsuario"
              name="nivelUsuario"
              value={formData.nivelUsuario}
              onChange={handleChange}
            >
              <option value="user">Usuario</option>
              <option value="gestor">Gestor</option>
              <option value="adm">Adm</option>
            </FormSelect>
          </div>
          <div className="mb-3">
            <FormLabel htmlFor="funcaoUsuario">
              Função do Colaborador:
            </FormLabel>
            <FormSelect
              id="funcaoUsuario"
              name="funcaoUsuario"
              value={formData.funcaoUsuario}
              onChange={handleChange}
            >
              <option></option>
              <option value="user">Pintor</option>
              <option value="gestor">Ajudante</option>
              <option value="adm">Azulegista</option>
            </FormSelect>
          </div>
          <div className="mb-3">
            <FormLabel htmlFor="senhaUsuario">Senha:</FormLabel>
            <FormControl
              type="password"
              id="senhaUsuario"
              name="senhaUsuario"
              value={formData.senhaUsuario}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Informe uma senha!
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <FormLabel htmlFor="confirmaSenha">Confirmar Senha:</FormLabel>
            <FormControl
              type="password"
              id="confirmaSenha"
              name="confirmaSenha"
              value={formData.confirmaSenha}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" color="primary">
            Cadastrar
          </Button>
          <Button href="/usuarios" variant="danger" className="mx-2">
            Cancelar
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};
export default FormUsuarios;
