import axios from "axios";
import { useEffect, useState } from "react";
import apiUrl from "../config";


const CalculaTotalProduzido = () => {

    // const currentDate = new Date();
    // const currentMounth = currentDate.getMonth() + 1;

    // const [data, setData] = useState(currentMounth);

    const [valor, setValor] = useState(0);

    useEffect(() => {
        const pagaEntregas = async () => {
            try {
                const response = await axios.get(`${apiUrl}/entregas`);
                const entregasData = response.data.entregaServico;
                
                if (entregasData.length > 0) {
                    const soma = entregasData.reduce((acc, entrega) => {
                        if (entrega.statusEntrega === 'aceito') {
                            return acc + (entrega.servicoObra.valoraReceber * (entrega.percentual / 100));
                        }
                        return acc;
                    }, 0);

                    const valorCalculado = soma.toFixed(2).replace('.', ',');
                    setValor(valorCalculado);
                } else {
                    setValor('0,00');
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        pagaEntregas();
    },[])

    return (
        <>
            {valor}
        </>
    )
}
export default CalculaTotalProduzido;