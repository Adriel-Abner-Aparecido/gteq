import { Table, Card, CardHeader, CardBody, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { BsTrashFill } from "react-icons/bs"
import axios from "axios"

import './style/style.css'
import apiUrl from "../config"

const TableEtapas = () => {

    const [etapas, setEtapas] = useState([])

    useEffect(()=>{
        listaEtapas();
    }, []);

    const listaEtapas = async () =>{
        try {
            const response = await axios.get(`${apiUrl}/etapas`);
            setEtapas(response.data.etapas);
        }catch{
            console.log("Erro ao buscar os dados");
        }
    }

    var c = 1;

    const handleDelete = async (servicosId) => {
        try {
          await axios.delete(`${apiUrl}/deleteEtapa/${servicosId}`);
          listaEtapas();
        } catch (error) {
          console.error(error);
        }
    }

    return (

        <Card>
            <CardHeader>
                Etapas
            </CardHeader>
            <CardBody>
                        {etapas.length > 0 && (
                            <Table striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Rel</th>
                                    <th className="text-center">Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                            { etapas.map(etapas =>(
                                <tr key={etapas._id}>
                                    <td className="align-middle">{c++}</td>
                                    <td className="align-middle">{etapas.nomeEtapa}</td>
                                    <td className="align-middle">{etapas.refEtapas}</td>
                                    <td className="align-middle text-center"><Button onClick={() => handleDelete(etapas._id)} variant="link" className="p-0 m-0"><h5><BsTrashFill/></h5></Button></td>
                                </tr>
                            ))
                            }
                                    </tbody>
                                </Table>
                            )
                        }
                        {etapas.length === 0 && (
                            <p className="text-center my-auto">Não há dados cadastrados</p>
                        )}
            </CardBody>
        </Card>
        
    )
}
export default TableEtapas;