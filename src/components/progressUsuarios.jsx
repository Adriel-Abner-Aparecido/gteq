import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import apiUrl from "../config";
import axios from "axios";
import Counter from "./contador";

const ProgressUsuarios = ({ id }) => {
  const [pegaMeta, setPegaMeta] = useState(0);
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
        setDiasUteis(global.data.meta.diasUteis);
        if (response) {
          setPegaMeta(response.data.metaUser.valorMeta);
        }
      } catch {}
    };
    buscaMeta();
    // eslint-disable-next-line
  }, []);

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
    // eslint-disable-next-line
  }, []);

  const meta = pegaMeta > 0 ? (valor * 100) / pegaMeta : 0;
  const metaDiaria = pegaMeta / diasUteis;
  const hoje = new Date().getDate();
  const metaHoje = metaDiaria * hoje;

  return (
    <ProgressBar className="progress-30 rounded-0">
      <ProgressBar
        now={meta}
        variant={metaHoje > valor ? "danger" : "primary"}
        className="progress-bar-anim"
        label={<Counter finalNumber={meta} />}
      />
    </ProgressBar>
  );
};
export default ProgressUsuarios;
