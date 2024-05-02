import { useState, useEffect } from "react";
import axios from "axios";
import apiUrl from "../config";
import { Col, Row } from "react-bootstrap";

const ValorAreceber = ({ id }) => {
  const [areceber, setAreceber] = useState(0);
  const [descontos, setDescontos] = useState([]);
  const [descontosCalculados, setDescontosCalculados] = useState(0);

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/entregas/entregaServicoUsuario/${id}`,
          {
            headers: {
              Authorization: `Bearer ${settoken}`,
            },
          }
        );
        const entregaServico = response.data.entregaServico;

        const mes = new Date().getMonth();

        const calculaValor = entregaServico.reduce((acc, item) => {
          const esteMes = new Date(item.createdAt).getMonth();
          if (item.statusEntrega === "aceito" && mes === esteMes) {
            return acc + item.servicoObra.valoraPagar * (item.percentual / 100);
          }
          return acc;
        }, 0);

        setAreceber(calculaValor);
      } catch (error) {
        console.error(error);
      }
    };
    fetchServicos();

    const pegaDescontos = async () => {
      try {
        const response = await axios.get(`${apiUrl}/descontos/desconto/${id}`, {
          headers: {
            Authorization: `Bearer ${settoken}`,
          },
        });
        setDescontos(response.data.desconto);
      } catch (error) {
        console.error(error);
      }
    };
    pegaDescontos();
  }, [id, settoken]);

  useEffect(() => {
    const calculaDescontos = descontos.reduce((acc, desconto) => {
      return acc + desconto.valorDesconto;
    }, 0);
    setDescontosCalculados(calculaDescontos);
  }, [descontos]);

  const aReceber = areceber.toFixed(2);
  const valorDescontos = descontosCalculados.toFixed(2);
  const salarioLiquido = aReceber - valorDescontos;

  return (
    <Col>
      <Row>
        <Col>
          Salario:
          <h3 className="text-success">
            R$ {salarioLiquido.toFixed(2).replace(".", ",")}
          </h3>
        </Col>
      </Row>
      <Row>
        <Col xxl={6}>
          Salario Bruto:
          <h5 className="text-success">R$ {aReceber.replace(".", ",")}</h5>
        </Col>
        <Col xxl={6}>
          Descontos:
          <h5 className="text-danger">R$ {valorDescontos.replace(".", ",")}</h5>
        </Col>
      </Row>
    </Col>
  );
};
export default ValorAreceber;
