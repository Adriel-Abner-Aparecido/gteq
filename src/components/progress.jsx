import { useEffect, useState } from "react"
import axios from "axios"
import apiUrl from "../config"
import Counter from "./contador";
import { ProgressBar } from "react-bootstrap";

const Progress = () => {

    const [meta, setMeta] = useState([])
    const [metaDia, setMetaDia] = useState([])
    const [diasUteis, setDiasUteis] = useState([])
    const [valor, setValor] = useState(0);

    useEffect(() => {
        const pegaMeta = async () => {
            try {
                const response = await axios.get(`${apiUrl}/meta/meta`)
                setMeta(response.data.meta[0].valorMeta);
                setDiasUteis(response.data.meta[0].diasUteis);
            } catch (error) {
                console.error(error);
            }
        }
        pegaMeta();
    }, [])

    useEffect(() => {
        const pagaEntregas = async () => {
            try {
                const response = await axios.get(`${apiUrl}/entregas/entregas`);
                const entregasData = response.data.entregaServico;
                const today = new Date().getDate();
                
                if (entregasData.length > 0) {
                    const soma = entregasData.reduce((acc, entrega) => {
                        if (entrega.statusEntrega === 'aceito') {
                            return acc + (entrega.servicoObra.valoraReceber * (entrega.percentual / 100));
                        }
                        return acc
                    }, 0);

                    
                    setValor(soma);
                }
                
                if(entregasData.length > 0){
                    const soma = entregasData.reduce((acc, entrega) =>{
                        const entregaDay = new Date(entrega.createdAt).getDate();
                        if(entrega.statusEntrega === 'aceito' && entregaDay === today){
                            return acc + (entrega.servicoObra.valoraReceber * (entrega.percentual / 100));
                        }
                        return acc
                    },0);


                    setMetaDia(soma);

                }
            } catch (error) {
                console.error(error);
            }
        };
    
        pagaEntregas();
    }, [])

    const metaGeral = (valor * 100) / meta
    const metaDiaria = meta / diasUteis
    const diaria = (metaDia * 100) / metaDiaria

    return (
        <>
            <div style={{ background: '#fff' }}>
                <ProgressBar now={metaGeral} className="progress-30 rounded-0 mt-2 progress-bar-anim" label={<Counter finalNumber={metaGeral} />} />
            </div>
            <div style={{ background: '#FFF' }}>
                <ProgressBar variant='success' now={diaria} className='rounded-0 progress-bar-anim' label={<Counter finalNumber={diaria} />} />
            </div>
        </>
    )
}
export default Progress