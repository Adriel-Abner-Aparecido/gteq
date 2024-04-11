import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Table } from "react-bootstrap";
import apiUrl from "../config";
import { BsTrashFill } from "react-icons/bs";

const ServicosPrestados = ({ refObra }) => {
  const [servicoPrestado, getServicoPrestado] = useState([]);

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  let deleteInProgress = false;

  useEffect(() => {
    fetchServicoPrestado();
    // eslint-disable-next-line
  }, []);

  const fetchServicoPrestado = async () => {
    const response = await axios.get(
      `${apiUrl}/servicosPrestados/servicosPrestados/${refObra}`,
      {
        headers: {
          Authorization: `Bearer ${settoken}`,
        },
      }
    );
    getServicoPrestado(response.data.getServicoPrestado);
  };

  const handleDelete = async (servicosId) => {
    if (deleteInProgress) return;
    try {
      deleteInProgress = true;
      await axios.delete(
        `${apiUrl}/servicosPrestados/deleteServicoPrestado/${servicosId}`,
        {
          headers: {
            Authorization: `Bearer ${settoken}`,
          },
        }
      );
      fetchServicoPrestado();
    } catch (error) {
      console.error(error);
    } finally {
      deleteInProgress = false;
    }
  };

  return (
    <Card className="mt-5">
      <CardHeader>Serviços Realizados</CardHeader>
      <CardBody>
        {servicoPrestado.length > 0 && (
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Serviço</th>
                <th>A receber</th>
                <th>A pagar</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {servicoPrestado.map((servico, index) => (
                <tr key={(index += 1)}>
                  <td className="align-middle">{(index += 1)}</td>
                  <td className="align-middle">
                    {servico.servicoPrestado.nomeServico}
                  </td>
                  <td className="align-middle">{servico.valoraReceber}</td>
                  <td className="align-middle">{servico.valoraPagar}</td>
                  <td className="align-middle">
                    <Button
                      variant="link"
                      onClick={() => handleDelete(servico._id)}
                    >
                      <BsTrashFill />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {servicoPrestado.length === 0 && (
          <p className="text-center my-auto">Nenhum Serviço cadastrado</p>
        )}
      </CardBody>
    </Card>
  );
};
export default ServicosPrestados;
