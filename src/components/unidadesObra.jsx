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


    return (
        <>
            {
                numerosObra.length > 0 && (
                    <>
                                    {
                                        numerosObra.map((numero, index) => (
                                            <Col xxl={2} key={index + 1}>
                                                Bloco: {numero.numeroBloco} Unidades: {parseInt(numero.numeroAndares) * parseInt(numero.numeroUnidades)}
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