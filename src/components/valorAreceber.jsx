import { useState, useEffect } from "react";
import axios from "axios";
import apiUrl from "../config";

const ValorAreceber = ({ userId }) => {
    const [areceber, setAreceber] = useState(0)

    useEffect(() => {

        const fetchServicos = async () => {
            try {
                const response = await axios.get(`${apiUrl}/entregaServico/${userId}`);
                const entregaServico = response.data.entregaServico;

                const mes = new Date().getMonth();

                const calculaValor = entregaServico.reduce((acc, item) => {
                    const esteMes = new Date(item.createdAt).getMonth();
                    if (item.statusEntrega === "aceito" && mes === esteMes){
                        return acc + (item.servicoObra.valoraPagar * (item.percentual / 100));
                    }
                    return acc;
                }, 0);

                setAreceber(calculaValor);

            } catch (error) {
                console.error(error)
            }
        }
        fetchServicos();
    }, [userId]);

    const aReceber = areceber.toFixed(2).replace('.', ',');

    return (
        <>
            {aReceber}
        </>
    )
}
export default ValorAreceber;