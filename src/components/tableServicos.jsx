import { Table, Card, CardHeader, CardBody, Button } from "react-bootstrap"
import axios from "axios";
import { BsTrashFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import './style/style.css'
import apiUrl from "../config";
import Tempo from "./calculaTempo";

const TableServicos = () => {

    const [servicos, setServicos] = useState([])

    useEffect(()=>{
        listaObras();
    }, []);

    const listaObras = async () =>{
        try {
            const response = await axios.get(`${apiUrl}/servicos`);
            setServicos(response.data.servicos);
        }catch{
            console.log("Erro ao buscar os dados");
        }
    }

    var c = 1;

    const handleDelete = async (servicosId) => {
        try {
          await axios.delete(`${apiUrl}/deleteServico/${servicosId}`);
          listaObras(); // Atualiza a lista após a exclusão
        } catch (error) {
          console.error(error);
        }
    }

    return (

        <Card>
            <CardHeader>
                Serviços
            </CardHeader>
            <CardBody>
                    {servicos.length > 0 && (
                            <Table striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Tempo</th>
                                    <th className="text-center">Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                            { servicos.map(servicos =>(
                                <tr key={servicos._id}>
                                    <td className="align-middle">{c++}</td>
                                    <td className="align-middle">{servicos.nomeServico}</td>
                                    <td className="align-middle"><Tempo id={servicos._id} porcentagem={false}/> Min</td>
                                    <td className="align-middle text-center"><Button onClick={() => handleDelete(servicos._id)} variant="link" className="p-0 m-0"><h5><BsTrashFill/></h5></Button></td>
                                </tr>
                            ))
                            }
                                    </tbody>
                                </Table>
                            )
                        }
                        {servicos.length === 0 && (
                            <p className="text-center my-auto">Não há dados cadastrados</p>
                        )}
            </CardBody>
        </Card>
        
    )
}
export default TableServicos;