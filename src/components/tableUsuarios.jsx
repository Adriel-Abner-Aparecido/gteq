import { Table, Card, CardHeader, CardBody, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./style/style.css";
import axios from "axios";
import { BsEyeFill } from "react-icons/bs";
import apiUrl from "../config";
import ProgressUsuarios from "./progressUsuarios";

const TableUsuarios = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    listaUsers();
    // eslint-disable-next-line
  }, []);

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  const listaUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/usuarios/usuarios`, {
        headers: {
          Authorization: `Bearer ${settoken}`,
        },
      });
      setUsers(response.data.users);
    } catch {
      console.log("Erro ao buscar os dados");
    }
  };

  return (
    <Card>
      <CardHeader>
        Colaboradores
        <div className="float-end">
          <Button
            href="/usuarios/cadastroUsuario"
            variant="link"
            className="p-0 m-0"
          >
            <span className="material-symbols-outlined">add_circle</span>
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        {users.length > 0 && (
          <Table className="table-personalized-1" striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Progresso</th>
                <th className="text-center">Ação</th>
              </tr>
            </thead>
            <tbody>
              {users.map((users, index) => (
                <tr key={index + 1}>
                  <td className="align-middle">{index + 1}</td>
                  <td className="align-middle">{users.nomeUsuario}</td>
                  <td className="align-middle">{users.emailUsuario}</td>
                  <td className="align-middle">
                    <ProgressUsuarios id={users._id} />
                  </td>
                  <td className="align-middle text-center">
                    <Button
                      href={`/usuarios/usuario/${users._id}`}
                      variant="link"
                      className="p-0 m-0"
                    >
                      <h5>
                        <BsEyeFill />
                      </h5>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {users.length === 0 && (
          <p className="text-center">Não há dados cadastrados</p>
        )}
      </CardBody>
    </Card>
  );
};
export default TableUsuarios;
