import { useEffect, useState } from "react"
import { ProgressBar } from "react-bootstrap"
import Counter from "./contador"
import apiUrl from '../config'
import axios from "axios"

const ProgressObras = ({ id }) => {

    const [entregas, setEntregas] = useState(0)
    const [pegaMeta, setPegaMeta] = useState([])
    const [diasUteis, setDiasUteis] = useState([])
    const [numerosObra, setNumerosObra] = useState(0)
    const [valor, setValor] = useState(0)

    //Define a meta por padrão usa Meta Global definida no CardMeta
    useEffect(() => {
        const buscaMeta = async () => {
            try {
                const response = await axios.get(`${apiUrl}/metaObra/${id}`)
                const global = await axios.get(`${apiUrl}/meta`)
                setPegaMeta(global.data.meta[0].valorMeta)
                setDiasUteis(global.data.meta[0].diasUteis)
                if (response.data.metaObra.length !== 0) {
                    setPegaMeta(response.data.metaObra[0].valorMeta)
                }
            } catch (error) {
                console.error(error)
            }
        }
        buscaMeta();
    }, [id])

    //Calcula numero de Unidades da Obra
    useEffect(() => {
        const unidadesObra = async () => {
            try {
                const response = await axios.get(`${apiUrl}/numerosObra/${id}`)
                const somaNumerosObra = response.data.numerosObra;

                if (somaNumerosObra.length > 0) {
                    const soma = somaNumerosObra.reduce((acc, numeros) => {
                        const andares = numeros.numeroAndares;
                        const unidades = numeros.numeroUnidades;
                        return acc + (andares * unidades)
                    }, 0)
                    setNumerosObra(soma);
                }
            } catch (error) {
                console.error(error)
            }
        }
        unidadesObra();
    }, [id])


    //Calcula as entregas Feitas
    useEffect(() => {
        const pegaObra = async () => {
            try {
                const response = await axios.get(`${apiUrl}/entregaServicoObra/${id}`)
                const entregasFeitas = response.data.entregaServico

                if (entregasFeitas.length > 0) {

                    const calculaEntregas = entregasFeitas.reduce((acc, entrega) => {
                        if (entrega.statusEntrega === 'aceito') {
                            return acc + (1 * (entrega.percentual / 100))
                        }
                        return acc
                    }, 0)
                    setEntregas(calculaEntregas)

                    const valoraReceber = entregasFeitas.reduce((acc, entrega) => {
                        if (entrega.statusEntrega === 'aceito') {
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

    const meta = (entregas * 100) / numerosObra;
    const calculaMetaDiaria = (pegaMeta / diasUteis)
    const metaDiaria = ((valor * 100) / calculaMetaDiaria)

    return (
        <>
            <div style={{ background: '#E9ECEF' }}>
                <ProgressBar now={meta} className='progress-30 rounded-0 progress-bar-anim' label={<Counter finalNumber={meta} />} />
            </div>
            <div style={{ background: '#E9ECEF' }}>
                <ProgressBar variant="success" now={metaDiaria} className='rounded-0 progress-bar-anim mb-2' label={<Counter finalNumber={metaDiaria} />} />
            </div>
        </>
    )
}
export default ProgressObras