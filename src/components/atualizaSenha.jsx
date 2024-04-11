import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Form,
  FormControl,
  FormLabel,
  Button,
} from "react-bootstrap";
import apiUrl from "../config";
import axios from "axios";

const AtualizaSenha = ({ id }) => {
  const [formData, setFormData] = useState({
    senhaUsuario: "",
    confirmaSenha: "",
  });

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleUpdate = async () => {
    try {
      axios
        .put(`${apiUrl}/usuarios/atualizaSenha/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${settoken}`,
          },
        })
        .then((response) => response.json);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  return (
    <Card className="mt-5">
      <CardHeader>Alterar Senha:</CardHeader>
      <CardBody>
        <Form onSubmit={handleUpdate}>
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
            Alterar Senha
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};
export default AtualizaSenha;
