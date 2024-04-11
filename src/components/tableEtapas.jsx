import { Table, Card, CardHeader, CardBody, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { BsPencilSquare, BsTrashFill } from "react-icons/bs";
import axios from "axios";

import "./style/style.css";
import apiUrl from "../config";
import Tempo from "./calculaTempo";

const TableEtapas = ({ onSelecionarId }) => {
  const [etapas, setEtapas] = useState([]);
  const handleClick = (id) => {
    onSelecionarId(id);
  };

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  useEffect(() => {
    listaEtapas();
    // eslint-disable-next-line
  }, []);

  const listaEtapas = async () => {
    try {
      const response = await axios.get(`${apiUrl}/etapas/etapas`, {
        headers: {
          Authorization: `Bearer ${settoken}`,
        },
      });
      setEtapas(response.data.etapas);
    } catch {
      console.log("Erro ao buscar os dados");
    }
  };

  const handleDelete = async (servicosId) => {
    try {
      await axios.delete(`${apiUrl}/etapas/deleteEtapa/${servicosId}`, {
        headers: {
          Authorization: `Bearer ${settoken}`,
        },
      });
      listaEtapas();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>Etapas</CardHeader>
      <CardBody>
        {etapas.length > 0 && (
          <Table striped responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Rel</th>
                <th>Tempo Exec</th>
                <th>%</th>
                <th className="text-center">Ação</th>
              </tr>
            </thead>
            <tbody>
              {etapas.map((etapa, index) => (
                <tr key={(index += 1)}>
                  <td className="align-middle">{(index += 1)}</td>
                  <td className="align-middle">{etapa.nomeEtapa}</td>
                  <td className="align-middle">
                    {etapa.refEtapa && etapa.refEtapa.nomeServico}
                  </td>
                  <td className="align-middle">{etapa.tempoExecucao} Min</td>
                  <td className="align-middle">
                    <Tempo
                      id={etapa.refEtapa && etapa.refEtapa._id}
                      porcentagem={true}
                      index={etapa._id}
                    />{" "}
                    %
                  </td>
                  <td className="align-middle text-center">
                    <Button
                      variant="link"
                      className="p-0 m-0 px-2"
                      onClick={() => handleClick(etapa._id)}
                    >
                      <h5>
                        <BsPencilSquare />
                      </h5>
                    </Button>
                    <Button
                      onClick={() => handleDelete(etapa._id)}
                      variant="link"
                      className="p-0 m-0 px-2"
                    >
                      <h5>
                        <BsTrashFill />
                      </h5>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {etapas.length === 0 && (
          <p className="text-center my-auto">Não há dados cadastrados</p>
        )}
      </CardBody>
    </Card>
  );
};
export default TableEtapas;
