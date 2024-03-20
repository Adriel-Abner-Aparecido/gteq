import axios from "axios"
import { useEffect, useState } from "react"
import apiUrl from "../config"

const Tempo = ({ id, porcentagem, index }) => {

    const [tempo, setTempo] = useState([])
    const [somaTempo, setSomaTempo] = useState(0);
    const [percentual, setPercentual] = useState(0);

    useEffect(() => {
        const fetchTempo = async () => {
            try {
                const response = await axios.get(`${apiUrl}/refEtapas/${id}`);
                setTempo(response.data.etapas)
            } catch (err) {
                console.log(err)
            }
        }
        fetchTempo();
    }, [id])

    useEffect(() => {
        if (tempo.length > 0 && index >= 0 && index < tempo.length) {
            setPercentual(tempo[index].tempoExecucao);
        }
    }, [tempo, index]);

    useEffect(() => {
        if (porcentagem === true){
            const soma = tempo.reduce((acc, tempoItem) => acc + parseInt(tempoItem.tempoExecucao), 0)
            const percentuais = ((parseInt(percentual) * 100) / soma).toFixed(2);
            setSomaTempo(percentuais);
        } else {
            const soma = tempo.reduce((acc, tempoItem) => acc + parseInt(tempoItem.tempoExecucao), 0)
            setSomaTempo(soma)
        }
    }, [tempo, porcentagem, percentual])

    return (
        <>{(somaTempo)}</>
    )
}
export default Tempo