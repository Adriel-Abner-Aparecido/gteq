import axios from "axios";
import { useEffect, useState } from "react";
import apiUrl from "../config";
import { Col } from "react-bootstrap";


const UnidadesObra = ({ refObra }) => {

    const [numerosObra, setNumerosObra] = useState([]);

    useEffect(()=>{
        const fetchUnidadesObra = async()=>{
            try{
                const response = await axios.get(`${apiUrl}/numerosObra/${refObra}`);
                setNumerosObra(response.data.numerosObra);
            } catch(err){
                console.log(err)
            }
        }
        fetchUnidadesObra();
    }, [refObra]);

    const calculoUnidades = () =>{
        if(numerosObra.length > 0){
            const a = parseInt(numerosObra[0].numeroAndares);
            const b = parseInt(numerosObra[0].numeroUnidades);
            return a * b;
        }return 0;
        
    }

    const unidades = calculoUnidades();


    return (
        <>
            {
                numerosObra.length > 0 && (
                    <>
                                    {
                                        numerosObra.map((numero, index) => (
                                            <Col xxl={2} key={index + 1}>
                                                Bloco: {numero.numeroBloco} Unidades: {unidades}
                                            </Col>
                                        ))
                                    }
                    </>
                )
            }
            {
                numerosObra.length === 0 && (<></>)
            }
        </>
    )
}
export default UnidadesObra