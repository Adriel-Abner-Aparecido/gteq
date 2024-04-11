import {
  Form,
  FormLabel,
  FormControl,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import apiUrl from "../config";

const FormAvatar = ({ id }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      console.error(
        "Por favor, selecione um arquivo e insira o ID do usuário."
      );
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", id);

    const token = localStorage.getItem("token");
    const tokenPayload = JSON.parse(token);
    const settoken = tokenPayload?.token;

    try {
      await axios.post(`${apiUrl}/avatar/avatar`, formData, {
        headers: {
          Authorization: `Bearer ${settoken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUploaded(true);
    } catch (error) {
      console.error("Erro ao enviar arquivo:", error);
    }
  };

  return (
    <Card>
      <CardHeader>Avatar</CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormLabel>Enviar uma foto:</FormLabel>
          <FormControl type="file" onChange={handleFileChange} />
          <Button type="submit" className="mt-3">
            Enviar
          </Button>
        </Form>
        {uploaded && (
          <p className="mt-1 text-center">Arquivo enviado com sucesso!</p>
        )}
      </CardBody>
    </Card>
  );
};
export default FormAvatar;
