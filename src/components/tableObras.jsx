import { Table, Card, CardHeader, CardBody, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style/style.css";
import { BsEyeFill } from "react-icons/bs";
import apiUrl from "../config";
import Unidades from "./calculaUnidades";

const TableObras = () => {
  const [obras, setObras] = useState([]);

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  useEffect(() => {
    const listaObras = async () => {
      try {
        const response = await axios.get(`${apiUrl}/obras/verObras`, {
          headers: {
            Authorization: `Bearer ${settoken}`,
          },
        });
        setObras(response.data.obras);
      } catch {
        console.log("Erro ao buscar os dados");
      }
    };
    listaObras();
  }, [settoken]);

  return (
    <Card>
      <CardHeader>
        Obras
        <div className="float-end">
          <Button
            href="./obras/cadastroObras"
            variant="link"
            className="btn p-0 m-0"
          >
            <span className="material-symbols-outlined">add_circle</span>
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        {obras.length > 0 && (
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Unidades</th>
                <th className="text-center">Ação</th>
              </tr>
            </thead>
            <tbody>
              {obras.map((obras, index) => (
                <tr key={(index += 1)}>
                  <td className="align-middle">{(index += 1)}</td>
                  <td className="align-middle">{obras.nomeObra}</td>
                  <td className="align-middle">
                    <Unidades id={obras._id} />
                  </td>
                  <td className="align-middle text-center">
                    <Button
                      href={`/obras/obra/${obras._id}`}
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
        {obras.length === 0 && (
          <p className="text-center">Não há dados cadastrados</p>
        )}
      </CardBody>
    </Card>
  );
};
export default TableObras;
