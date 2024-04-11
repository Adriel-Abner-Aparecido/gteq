import axios from "axios";
import { useEffect, useState } from "react";
import apiUrl from "../config";

const Tempo = ({ id, porcentagem, index }) => {
  const [tempo, setTempo] = useState([]);
  const [somaTempo, setSomaTempo] = useState(0);
  const [percentual, setPercentual] = useState(0);

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  useEffect(() => {
    const fetchTempo = async () => {
      try {
        const response = await axios.get(`${apiUrl}/etapas/refEtapas/${id}`, {
          headers: {
            Authorization: `Bearer ${settoken}`,
          },
        });
        setTempo(response.data.etapas);
        if (index !== null) {
          const responseEtapa = await axios.get(
            `${apiUrl}/etapas/refEtapa/${index}`,
            {
              headers: {
                Authorization: `Bearer ${settoken}`,
              },
            }
          );
          setPercentual(responseEtapa.data.etapa.tempoExecucao);
        }
      } catch {
        console.log("Erro ao buscar dados");
      }
    };
    fetchTempo();
  }, [id, index, settoken]);

  useEffect(() => {
    if (porcentagem === true) {
      const soma = tempo.reduce(
        (acc, tempoItem) => acc + parseInt(tempoItem.tempoExecucao),
        0
      );
      const percentuais = ((parseInt(percentual) * 100) / soma).toFixed(2);
      setSomaTempo(percentuais);
    } else {
      const soma = tempo.reduce(
        (acc, tempoItem) => acc + parseInt(tempoItem.tempoExecucao),
        0
      );
      setSomaTempo(soma);
    }
  }, [tempo, porcentagem, percentual]);

  return <>{somaTempo}</>;
};
export default Tempo;
