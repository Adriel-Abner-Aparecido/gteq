import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Button,
  Row,
  Col,
  Pagination,
} from "react-bootstrap";
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
  BsCircleFill,
} from "react-icons/bs";
import { useState, useEffect } from "react";
import axios from "axios";
import apiUrl from "../config";

const EntregasUsuarios = ({ id, items }) => {
  const [entregaServico, setEntregaServico] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = items === undefined ? 10 : items;

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  const handleClick = async (id, status) => {
    try {
      await axios.put(
        `${apiUrl}/entregas/atualizaStatusEntrega/${id}`,
        { statusEntrega: status },
        {
          headers: {
            Authorization: `Bearer ${settoken}`,
          },
        }
      );
      fetchEntregas();
    } catch {
      console.log("Erro ao atualizar este dado!");
    }
  };

  const fetchEntregas = async () => {
    try {
      const responseEntregaServico = await axios.get(
        `${apiUrl}/entregas/entregaServicoUsuario/${id}`,
        {
          headers: {
            Authorization: `Bearer ${settoken}`,
          },
        }
      );
      setEntregaServico(responseEntregaServico.data.entregaServico);
    } catch (error) {
      console.error("Erro ao buscar dados", error);
    }
  };

  useEffect(() => {
    fetchEntregas();
    // eslint-disable-next-line
  }, []);

  //Formata a Data

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    const hora = ("0" + data.getHours()).slice(-2);
    const minutos = ("0" + data.getMinutes()).slice(-2);
    const dia = ("0" + data.getDate()).slice(-2);
    const mes = ("0" + (data.getMonth() + 1)).slice(-2);
    const ano = data.getFullYear();
    return `${hora}:${minutos} - ${dia}/${mes}/${ano}`;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = entregaServico.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(Math.ceil(entregaServico.length / itemsPerPage));
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(entregaServico.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Card className="mt-5">
      <CardHeader>Atualizações</CardHeader>
      {entregaServico && entregaServico.length > 0 && (
        <CardBody>
          <Table responsive striped>
            <thead>
              <tr>
                <th></th>
                <th>Obra</th>
                <th>Bloco</th>
                <th>Unidade</th>
                <th>Etapa</th>
                <th>Data</th>
                <th className="text-center">Status</th>
                <th className="text-center">Ação</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((servico, index) => (
                <tr key={index + 1}>
                  <td className="align-middle">{index + 1}</td>
                  <td className="align-middle">
                    {servico.refObra && servico.refObra.nomeObra}
                  </td>
                  <td className="align-middle">
                    {servico.blocoObra && servico.blocoObra.numeroBloco}
                  </td>
                  <td className="align-middle">{servico.unidadeObra}</td>
                  <td className="align-middle">
                    {servico.etapaEntregue && servico.etapaEntregue.nomeEtapa}
                  </td>
                  <td className="align-middle">
                    {servico.createdAt && formatarData(servico.createdAt)}
                  </td>
                  <td className="align-middle text-center">
                    {servico.statusEntrega === "pendente" ? (
                      <BsCircleFill className="text-warning" />
                    ) : servico.statusEntrega === "aceito" ? (
                      <BsCircleFill className="text-success" />
                    ) : (
                      <BsCircleFill className="text-danger" />
                    )}
                  </td>
                  <td className="align-middle text-center">
                    <Button
                      variant="link"
                      onClick={() => handleClick(servico._id, "aceito")}
                    >
                      <BsFillHandThumbsUpFill />
                    </Button>
                    <Button
                      variant="link"
                      className="text-danger"
                      onClick={() => handleClick(servico._id, "rejeitado")}
                    >
                      <BsFillHandThumbsDownFill />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {pageNumbers.length > 0 && (
            <Row>
              <Col>
                <Pagination className="justify-content-center">
                  <Pagination.First onClick={handleFirstPage} />
                  {pageNumbers.map((number) => (
                    <Pagination.Item
                      key={number}
                      onClick={() => handlePageChange(number)}
                    >
                      {number}
                    </Pagination.Item>
                  ))}
                  <Pagination.Last onClick={handleLastPage} />
                </Pagination>
              </Col>
            </Row>
          )}
        </CardBody>
      )}
      {entregaServico && entregaServico.length === 0 && (
        <CardBody>
          <p className="text-center my-auto">Ainda não entregou nada</p>
        </CardBody>
      )}
    </Card>
  );
};
export default EntregasUsuarios;
