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
import { useEffect, useState } from "react";
import apiUrl from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormEditaUsuarios = ({ id }) => {
  const [formData, setFormData] = useState({
    nomeUsuario: "",
    nomeCompleto: "",
    emailUsuario: "",
    nivelUsuario: "",
    funcaoUsuario: "",
    status: "",
  });

  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  useEffect(() => {
    const pegaUsuario = async () => {
      const response = await axios.get(`${apiUrl}/usuarios/usuario/${id}`, {
        headers: {
          Authorization: `Bearer ${settoken}`,
        },
      });
      setFormData({
        nomeUsuario: response.data.usuario.nomeUsuario,
        nomeCompleto: response.data.usuario.nomeCompleto,
        emailUsuario: response.data.usuario.emailUsuario,
        nivelUsuario: response.data.usuario.nivelUsuario,
        funcaoUsuario: response.data.usuario.funcaoUsuario,
        status: response.data.usuario.status,
      });
    };
    pegaUsuario();
  }, [id, settoken]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);

    try {
      axios.put(`${apiUrl}/usuarios/atualizaUsuario/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${settoken}`,
        },
      });
      navigate(`/usuarios/usuario/${id}`);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  return (
    <Card>
      <CardHeader>Dados do Usuario</CardHeader>
      <CardBody>
        <Form noValidate validated={validated} onSubmit={handleUpdate}>
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
              <option value="Não definido!">Não definido!</option>
              <option value="Pintor">Pintor</option>
              <option value="Ajudante">Ajudante</option>
              <option value="Azulegista">Azulegista</option>
            </FormSelect>
          </div>
          <div className="mb-3">
            <FormLabel htmlFor="status">Liberar Acesso:</FormLabel>
            <FormSelect
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option></option>
              <option value="false">Não Autorizado</option>
              <option value="true">Autorizado</option>
            </FormSelect>
          </div>
          <Button type="submit" color="primary">
            Cadastrar
          </Button>
          <Button
            href={`/usuarios/usuario/${id}`}
            variant="danger"
            className="mx-2"
          >
            Cancelar
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};
export default FormEditaUsuarios;
