import axios from "axios";
import { useEffect, useState } from "react";
import apiUrl from "../config";
import { Button, Card, CardBody, CardHeader, Table } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

const TableDescontos = ({ id }) => {
  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  const [descontos, setDescontos] = useState([]);

  useEffect(() => {
    pegaDescontos();
    // eslint-disable-next-line
  }, []);

  const pegaDescontos = async () => {
    const response = await axios.get(`${apiUrl}/descontos/desconto/${id}`, {
      headers: {
        Authorization: `Bearer ${settoken}`,
      },
    });
    setDescontos(response.data.desconto);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/descontos/apagadesconto/${id}`, {
        headers: {
          Authorization: `Bearer ${settoken}`,
        },
      });
      pegaDescontos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="mt-5">
      <CardHeader>Descontos</CardHeader>
      <CardBody>
        {descontos.length > 0 && (
          <Table responsive>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {descontos.map((desconto, index) => (
                <tr key={index}>
                  <td className="align-middle">{desconto.descricao}</td>
                  <td className="align-middle">
                    R$ {desconto.valorDesconto.toFixed(2).replace(".", ",")}
                  </td>
                  <td className="align-middle">
                    <Button variant="link">
                      <h5>
                        <BsPencilSquare />
                      </h5>
                    </Button>
                    <Button
                      variant="link"
                      onClick={() => handleDelete(desconto._id)}
                    >
                      <h5>
                        <BsTrash />
                      </h5>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {descontos.length === 0 && (
          <p className="text-center m-0">Não ha descontos cadastrados!</p>
        )}
      </CardBody>
    </Card>
  );
};
export default TableDescontos;
