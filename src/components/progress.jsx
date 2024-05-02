import { useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "../config";
import Counter from "./contador";
import { ProgressBar } from "react-bootstrap";

const Progress = () => {
  const [meta, setMeta] = useState(0);
  const [metaDia, setMetaDia] = useState(0);
  const [diasUteis, setDiasUteis] = useState(0);
  const [valor, setValor] = useState(0);
  const [tempoServico, setTempoServico] = useState(0);
  const [valorServico, setValorServico] = useState(0);

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  useEffect(() => {
    const pegaMeta = async () => {
      try {
        const response = await axios.get(`${apiUrl}/meta/meta`, {
          headers: {
            Authorization: `Bearer ${settoken}`,
          },
        });
        setMeta(response.data.meta.valorMeta);
        setDiasUteis(response.data.meta.diasUteis);
      } catch (error) {
        console.error(error);
      }
    };
    pegaMeta();
  }, [settoken]);

  useEffect(() => {
    const pagaEntregas = async () => {
      try {
        const response = await axios.get(`${apiUrl}/entregas/entregas`, {
          headers: {
            Authorization: `Bearer ${settoken}`,
          },
        });
        const entregasData = response.data.entregaServico;
        const today = new Date().getDate();

        if (entregasData.length > 0) {
          const soma = entregasData.reduce((acc, entrega) => {
            if (entrega.statusEntrega === "aceito") {
              return (
                acc +
                entrega.servicoObra.valoraReceber * (entrega.percentual / 100)
              );
            }
            return acc;
          }, 0);

          setValor(soma);
        }

        if (entregasData.length > 0) {
          const soma = entregasData.reduce((acc, entrega) => {
            const entregaDay = new Date(entrega.createdAt).getDate();
            if (entrega.statusEntrega === "aceito" && entregaDay === today) {
              return (
                acc +
                entrega.servicoObra.valoraReceber * (entrega.percentual / 100)
              );
            }
            return acc;
          }, 0);
          setMetaDia(soma);
        }
      } catch (error) {
        console.error(error);
      }
    };

    pagaEntregas();
  }, [settoken]);

  useEffect(() => {
    const pegaServicosPrestados = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/servicosPrestados/servicosPrestados`,
          {
            headers: {
              Authorization: `Bearer ${settoken}`,
            },
          }
        );
        const servicosprestados = response.data.servicos;

        if (servicosprestados.length > 0) {
          let valorServico = 0;
          let tempoEntregue = 0;
          for (const servico of servicosprestados) {
            const etapa = servico.servicoPrestado._id;
            const responseEtapa = await axios.get(
              `${apiUrl}/etapas/refEtapas/${etapa}`,
              {
                headers: {
                  Authorization: `Bearer ${settoken}`,
                },
              }
            );

            valorServico += servico.valoraReceber;

            const etapaData = responseEtapa.data.etapas;
            for (const etapa of etapaData) {
              tempoEntregue += etapa.tempoExecucao;
            }
          }
          setValorServico(valorServico);
          setTempoServico(tempoEntregue);
        }
      } catch (error) {
        console.error(error);
      }
    };
    pegaServicosPrestados();
  }, [settoken]);

  const metaGeral = (valor * 100) / meta;
  const metaDiaria = meta / diasUteis;
  const diaria = (metaDia * 100) / metaDiaria;
  const hoje = new Date().getDate();
  const metaHoje = metaDiaria * hoje;
  const faltaMeta = 100 - (valor * 100) / metaHoje;

  console.log(valorServico, tempoServico);

  return (
    <>
      Meta do Mês: R$ {meta.toFixed(2).replace(".", ",")}
      <ProgressBar className="progress-30 p-0 rounded-0">
        <ProgressBar
          now={metaGeral}
          variant={metaHoje > valor ? "danger" : "primary"}
          className="progress-bar-anim"
          label={<Counter finalNumber={metaGeral} />}
        />
        <ProgressBar
          now={faltaMeta}
          variant="warning"
          className="progress-bar-anim"
          label={<Counter finalNumber={faltaMeta} />}
        />
      </ProgressBar>
      <ProgressBar className="progress-30 rounded-0">
        <ProgressBar
          variant="success"
          now={diaria}
          className=" progress-bar-anim"
          label={<Counter finalNumber={diaria} />}
        />
      </ProgressBar>
    </>
  );
};
export default Progress;
