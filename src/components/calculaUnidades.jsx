import axios from "axios";
import { useEffect, useState } from "react";
import apiUrl from "../config";

const Unidades = ({ id }) => {
  const [numerosObra, setNumerosObra] = useState([]);
  const [unidades, setUnidades] = useState(0);

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  useEffect(() => {
    const fetchUnidadesObra = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/numerosObra/numerosObra/${id}`,
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
    fetchUnidadesObra();
  }, [id, settoken]);

  useEffect(() => {
    const somaunidades = numerosObra.reduce((acc, numeros) => {
      const a = parseInt(numeros.numeroAndares);
      const b = parseInt(numeros.numeroUnidades);
      return acc + a * b;
    }, 0);
    setUnidades(somaunidades);
  }, [numerosObra]);

  return <>{unidades}</>;
};
export default Unidades;
