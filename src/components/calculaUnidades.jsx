import axios from "axios"
import { useEffect, useState } from "react"
import apiUrl from "../config"

const Unidades = ({ id }) => {

    const [numerosObra, setNumerosObra] = useState([]);

    useEffect(()=>{
        const fetchUnidadesObra = async()=>{
            try{
                const response = await axios.get(`${apiUrl}/numerosObra/${id}`);
                setNumerosObra(response.data.numerosObra);
            } catch(err){
                console.log(err)
            }
        }
        fetchUnidadesObra();
    }, [id]);

    const calculoUnidades = () =>{
        if(numerosObra.length > 0){
            const a = parseInt(numerosObra[0].numeroAndares);
            const b = parseInt(numerosObra[0].numeroUnidades);
            return a * b;
        }return 0;
        
    }

    const unidades = calculoUnidades() * numerosObra.length;

    

    return (
        <>{(unidades)}</>
    )
}
export default Unidades