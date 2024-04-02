import { useEffect, useState } from "react"
import { ProgressBar } from "react-bootstrap"
import apiUrl from '../config'
import axios from "axios"

const ProgressAreaUsuarios = ({ id }) => {


    const [pegaMeta, setPegaMeta] = useState([])
    const [diasUteis, setDiasUteis] = useState([])
    const [valor, setValor] = useState(0)

    //Define a meta por padrão usa Meta Global definida no CardMeta
    useEffect(() => {
        const buscaMeta = async () => {
            try {
                const response = await axios.get(`${apiUrl}/metaUser/${id}`)
                const global = await axios.get(`${apiUrl}/meta`)
                setPegaMeta(global.data.meta[0].valorMeta)
                setDiasUteis(global.data.meta[0].diasUteis)
                if (response.data.metaUser.length !== 0) {
                    setPegaMeta(response.data.metaUser[0].valorMeta)
                }
            } catch (error) {
                console.error(error)
            }
        }
        buscaMeta();
    }, [id])

    //Calcula as entregas Feitas
    useEffect(() => {
        const pegaObra = async () => {
            try {
                const response = await axios.get(`${apiUrl}/entregaServico/${id}`)
                const entregasFeitas = response.data.entregaServico;

                const hoje = new Date().getDate();

                if (entregasFeitas.length > 0) {

                    const valoraReceber = entregasFeitas.reduce((acc, entrega) => {
                        const entregaHoje = new Date(entrega.createdAt).getDate();
                        if (entrega.statusEntrega === 'aceito' && hoje === entregaHoje) {
                            return acc + (entrega.servicoObra.valoraReceber * (entrega.percentual / 100));
                        }
                        return acc
                    }, 0)
                    setValor(valoraReceber);
                }
            } catch (error) {
                console.error(error);
            }
        }
        pegaObra();
    }, [id])

    const calculaMetaDiaria = (pegaMeta / diasUteis)
    const metaDiaria = ((valor * 100) / calculaMetaDiaria)

    return (
        <>
            <ProgressBar style={{height: '5px'}} now={metaDiaria} className='rounded-0 progress-bar-anim' />
        </>
    )
}
export default ProgressAreaUsuarios