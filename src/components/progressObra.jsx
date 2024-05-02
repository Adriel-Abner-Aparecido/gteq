import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import Counter from "./contador";
import apiUrl from "../config";
import axios from "axios";

const ProgressObra = ({ id }) => {
  const [entregas, setEntregas] = useState(0);
  const [numerosObra, setNumerosObra] = useState(0);
  const [tempoObra, setTempoObra] = useState(0);
  const [diasUteis, setDiasUteis] = useState(0);

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  //pegar dias Uteis
  useEffect(() => {
    const pegaMeta = async () => {
      try {
        const response = await axios.get(`${apiUrl}/meta/meta`, {
          headers: {
            Authorization: `Bearer ${settoken}`,
          },
        });
        if (response.ok) {
          setDiasUteis(response.data.meta.diasUteis);
        }
      } catch (error) {
        console.error(error);
      }
    };
    pegaMeta();
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
    const pegaEntregas = async () => {
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
        }
      } catch (error) {
        console.error(error);
      }
    };
    pegaEntregas();
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

        if (servicosPrestados.length > 0) {
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
  const metaDiaria = totalTempoObra / diasUteis;
  const hoje = new Date().getDate();
  const metaHoje = metaDiaria * hoje;

  return (
    <ProgressBar className="progress-30 rounded-0">
      <ProgressBar
        now={meta}
        variant={metaHoje > entregas ? "danger" : "primary"}
        className="progress-bar-anim"
        label={<Counter finalNumber={meta} />}
      />
    </ProgressBar>
  );
};
export default ProgressObra;
