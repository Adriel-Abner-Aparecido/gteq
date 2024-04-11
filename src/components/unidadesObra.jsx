import axios from "axios";
import { useEffect, useState } from "react";
import apiUrl from "../config";
import { Table, Button } from "react-bootstrap";
import { BsTrashFill } from "react-icons/bs";

const UnidadesObra = ({ refObra }) => {
  const [numerosObra, setNumerosObra] = useState([]);

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  useEffect(() => {
    fetchUnidadesObra();
    // eslint-disable-next-line
  }, []);

  const fetchUnidadesObra = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/numerosObra/numerosObra/${refObra}`,
        {
          headers: {
            Authorization: `Bearer ${settoken}`,
          },
        }
      );
      setNumerosObra(response.data.numerosObra);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (servicosId) => {
    try {
      await axios.delete(`${apiUrl}/numerosObra/apagaNumeros/${servicosId}`, {
        headers: {
          Authorization: `Bearer ${settoken}`,
        },
      });
      fetchUnidadesObra(); // Atualiza a lista após a exclusão
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {numerosObra.length > 0 && (
        <>
          <Table responsive>
            <thead>
              <tr>
                <th>Numero Bloco:</th>
                <th>Qtd Andares:</th>
                <th>Unidade Andar:</th>
                <th>Total Uni:</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {numerosObra.map((numero, index) => (
                <tr key={index}>
                  <td>{numero.numeroBloco}</td>
                  <td>{numero.numeroAndares}</td>
                  <td>{numero.numeroUnidades}</td>
                  <td>
                    {parseInt(numero.numeroAndares) *
                      parseInt(numero.numeroUnidades)}
                  </td>
                  <td>
                    <Button
                      onClick={() => handleDelete(numero._id)}
                      variant="link"
                      className="p-0 m-0"
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
        </>
      )}
      {numerosObra.length === 0 && <></>}
    </>
  );
};
export default UnidadesObra;
