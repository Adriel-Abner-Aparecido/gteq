import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import apiUrl from "../config";
import axios from "axios";

const ProgressAreaUsuarios = ({ id }) => {
  const [pegaMeta, setPegaMeta] = useState([]);
  const [valor, setValor] = useState(0);
  const [diasUteis, setDiasUteis] = useState(0);

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  //Define a meta por padrão usa Meta Global definida no CardMeta
  useEffect(() => {
    const buscaMeta = async () => {
      try {
        const response = await axios.get(`${apiUrl}/meta/metaUser/${id}`, {
          headers: {
            Authorization: `Bearer ${settoken}`,
          },
        });
        const global = await axios.get(`${apiUrl}/meta/meta`, {
          headers: {
            Authorization: `Bearer ${settoken}`,
          },
        });
        setPegaMeta(global.data.meta.valorMeta);
        setDiasUteis(global.data.meta.diasUteis);
        if (response.data.metaUser.length !== 0) {
          setPegaMeta(response.data.metaUser.valorMeta);
        }
      } catch (error) {
        console.error(error);
      }
    };
    buscaMeta();
  }, [id, settoken]);

  //Calcula as entregas Feitas
  useEffect(() => {
    const pegaObra = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/entregas/entregaServicoUsuario/${id}`,
          {
            headers: {
              Authorization: `Bearer ${settoken}`,
            },
          }
        );
        const entregasFeitas = response.data.entregaServico;

        const hoje = new Date().getMonth();

        if (entregasFeitas.length > 0) {
          const valoraReceber = entregasFeitas.reduce((acc, entrega) => {
            const entregaHoje = new Date(entrega.createdAt).getMonth();

            if (entrega.statusEntrega === "aceito" && hoje === entregaHoje) {
              return (
                acc +
                entrega.servicoObra.valoraPagar * (entrega.percentual / 100)
              );
            }
            return acc;
          }, 0);
          setValor(valoraReceber);
        }
      } catch (error) {
        console.error(error);
      }
    };
    pegaObra();
  }, [id, settoken]);

  const metaMensal = (valor * 100) / pegaMeta;
  const metaDiaria = pegaMeta / diasUteis;
  const hoje = new Date().getDate();
  const metaHoje = metaDiaria * hoje;

  return (
    <>
      <ProgressBar
        style={{ height: "5px" }}
        variant={metaHoje > valor ? "danger" : "primary"}
        now={metaMensal}
        className="rounded-0 progress-bar-anim"
      />
    </>
  );
};
export default ProgressAreaUsuarios;
