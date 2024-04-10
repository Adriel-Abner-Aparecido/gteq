import { useEffect, useState } from "react"
import { ProgressBar } from "react-bootstrap"
import apiUrl from '../config'
import axios from "axios"
import Counter from "./contador"

const ProgressUsuariosMes = ({ id }) => {


    const [pegaMeta, setPegaMeta] = useState([])
    const [valor, setValor] = useState(0)

    //Define a meta por padrão usa Meta Global definida no CardMeta
    useEffect(() => {
        const buscaMeta = async () => {
            try {
                const response = await axios.get(`${apiUrl}/meta/metaUser/${id}`)
                const global = await axios.get(`${apiUrl}/meta/meta`)
                setPegaMeta(global.data.meta[0].valorMeta)
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
                const response = await axios.get(`${apiUrl}/entregas/entregaServicoUsuario/${id}`)
                const entregasFeitas = response.data.entregaServico;

                const mes = new Date().getMonth();

                if (entregasFeitas.length > 0) {
                    const valoraReceber = entregasFeitas.reduce((acc, entrega) => {
                        const esteMes = new Date(entrega.createdAt).getMonth();

                        if (entrega.statusEntrega === 'aceito' && mes === esteMes) {
                            return acc + (entrega.servicoObra.valoraPagar * (entrega.percentual / 100))
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

    const metaDiaria = (valor * 100) / pegaMeta;

    return (
        <>
            <div style={{ background: '#E9ECEF' }}>
                <ProgressBar now={metaDiaria} className='rounded-0 progress-bar-anim' label={<Counter finalNumber={metaDiaria} />} />
            </div>
        </>
    )
}
export default ProgressUsuariosMes