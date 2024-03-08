import { useState, useEffect } from "react";
import axios from "axios";
import apiUrl from "../config";

const ValorAreceber = ({userId}) =>{
    const [entregaServico, setEntregaServico] = useState();

    useEffect(()=>{
        const fetchServicos = async()=>{
        try {
            const responseEntregaServico = await axios.get(`${apiUrl}/entregaServico/${userId}`);
            setEntregaServico(responseEntregaServico.data.entregaServico);
        }catch{
            
        }
        }
        fetchServicos();
    }, [userId]);

    const aReceber = entregaServico && entregaServico.reduce((acc, item)=>{
        if (item.etapaEntregue === "finalizado" && item.statusEntrega === "aceito"){
            acc++;
        }
        return acc;
    }, 0)*1000;
    

    return(
        <>
        {entregaServico !== null ?(<>{aReceber}</>): '0'}
        </>
    )
}
export default ValorAreceber;