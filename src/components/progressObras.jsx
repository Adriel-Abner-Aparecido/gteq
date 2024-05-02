import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import Counter from "./contador";
import apiUrl from "../config";
import axios from "axios";

const ProgressObras = ({ id }) => {
  const [entregas, setEntregas] = useState(0);
  const [pegaMeta, setPegaMeta] = useState(0);
  const [diasUteis, setDiasUteis] = useState(0);
  const [numerosObra, setNumerosObra] = useState(0);
  const [valor, setValor] = useState(0);
  const [tempoObra, setTempoObra] = useState(0);

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  //Define a meta por padrão usa Meta Global definida no CardMeta
  useEffect(() => {
    const buscaMeta = async () => {
      try {
        const response = await axios.get(`${apiUrl}/meta/metaObra/${id}`, {
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

        if (response.ok) {
          setPegaMeta(response.data.metaObra.valorMeta);
        }
      } catch (error) {
        console.error(error);
      }
    };
    buscaMeta();
  }, [id, settoken]);

  //Calcula numero de Unidades da Obra
  useEffect(() => {
    const unidadesObra = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/numerosObra/numerosObra/${id}`,
          {
            headers: {
              Authorization: `Bearer ${settoken}`,
            },
          }
        );
        const somaNumerosObra = response.data.numerosObra;

        if (somaNumerosObra.length > 0) {
          const soma = somaNumerosObra.reduce((acc, numeros) => {
            const andares = numeros.numeroAndares;
            const unidades = numeros.numeroUnidades;
            return acc + andares * unidades;
          }, 0);
          setNumerosObra(soma);
        }
      } catch (error) {
        console.error(error);
      }
    };
    unidadesObra();
  }, [id, settoken]);

  //Calcula as entregas Feitas
  useEffect(() => {
    const pegaObra = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/entregas/entregaServicoObra/${id}`,
          {
            headers: {
              Authorization: `Bearer ${settoken}`,
            },
          }
        );
        const entregasFeitas = response.data.entregaServico;

        const hoje = new Date().getDate();
        let totalEntregue = 0;

        if (entregasFeitas.length > 0) {
          for (const entregas of entregasFeitas) {
            const pegarServicos = entregas.etapaEntregue._id;
            const etapaEntregue = await axios.get(
              `${apiUrl}/etapas/refEtapa/${pegarServicos}`,
              {
                headers: {
                  Authorization: `Bearer ${settoken}`,
                },
              }
            );
            const etapa = etapaEntregue.data.etapa;

            if (entregas.statusEntrega === "aceito") {
              totalEntregue += etapa.tempoExecucao;
            }

            setEntregas(totalEntregue);
          }

          const valoraReceber = entregasFeitas.reduce((acc, entrega) => {
            const metaHoje = new Date(entrega.createdAt).getDate();
            if (entrega.statusEntrega === "aceito" && hoje === metaHoje) {
              return (
                acc +
                entrega.servicoObra.valoraReceber * (entrega.percentual / 100)
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

  useEffect(() => {
    const pegaServicosPrestados = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/servicosPrestados/servicosPrestados/${id}`,
          {
            headers: {
              Authorization: `Bearer ${settoken}`,
            },
          }
        );
        const servicosPrestados = response.data.getServicoPrestado;

        let tempoTotalObra = 0;

        for (const servico of servicosPrestados) {
          const pegarServicos = servico.servicoPrestado._id;
          const etapaEntregue = await axios.get(
            `${apiUrl}/etapas/refEtapas/${pegarServicos}`,
            {
              headers: {
                Authorization: `Bearer ${settoken}`,
              },
            }
          );
          const etapas = etapaEntregue.data.etapas;

          for (const etapa of etapas) {
            tempoTotalObra += etapa.tempoExecucao;
          }
        }
        setTempoObra(tempoTotalObra);
      } catch (error) {
        console.error(error);
      }
    };
    pegaServicosPrestados();
  }, [id, settoken]);

  const totalTempoObra = tempoObra * numerosObra;
  const meta = totalTempoObra !== 0 ? (entregas * 100) / totalTempoObra : 0;
  const calculaMetaDiaria = pegaMeta / diasUteis;
  const metaDiaria = (valor * 100) / calculaMetaDiaria;
  const hoje = new Date().getDate();
  const metahoje = (totalTempoObra / diasUteis) * hoje;

  return (
    <>
      <ProgressBar className="progress-30 rounded-0">
        <ProgressBar
          className="progress-bar-anim"
          now={meta}
          variant={metahoje > entregas ? "danger" : "primary"}
          label={<Counter finalNumber={meta} />}
        />
      </ProgressBar>
      <ProgressBar className="rounded-0 mb-2 progress-bar-anim">
        <ProgressBar
          variant="success"
          now={metaDiaria}
          label={<Counter finalNumber={metaDiaria} />}
        />
      </ProgressBar>
    </>
  );
};
export default ProgressObras;
