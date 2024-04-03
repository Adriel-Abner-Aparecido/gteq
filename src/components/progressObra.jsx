import { useEffect, useState } from "react"
import { ProgressBar } from "react-bootstrap"
import Counter from "./contador"
import apiUrl from '../config'
import axios from "axios"

const ProgressObra = ({ id }) => {

    const [entregas, setEntregas] = useState(0)
    const [numerosObra, setNumerosObra] = useState(0)

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
                }
            } catch (error) {
                console.error(error);
            }
        }
        pegaObra();
    }, [id])

    const meta = (entregas * 100) / numerosObra;

    return (
        <>
            <div style={{ background: '#E9ECEF' }}>
                <ProgressBar now={meta} className='progress-30 rounded-0 progress-bar-anim' label={<Counter finalNumber={meta} />} />
            </div>
        </>
    )
}
export default ProgressObra