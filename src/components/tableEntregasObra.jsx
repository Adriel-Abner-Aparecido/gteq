import { Card, CardHeader, CardBody, Table, Button } from "react-bootstrap";
import { BsSquare } from "react-icons/bs";
import { useState, useEffect } from "react";
import axios from "axios";
import apiUrl from "../config";


const EntregasObra = ({ id }) => {

    const [entregaServico, setEntregaServico] = useState([]);

    useEffect(() => {
        const fetchObra = async () => {
            try {
                const responseEntregaServico = await axios.get(`${apiUrl}/entregaServicoObra/${id}`);
                setEntregaServico(responseEntregaServico.data.entregaServico);
            } catch(error) {
                console.error('Erro ao buscar dados:', error);
            }
        };
        fetchObra();
    }, [id]);

    const formatarData = (dataString) => {
        const data = new Date(dataString);
        const hora = ("0" + data.getHours()).slice(-2);
        const minutos = ("0" + data.getMinutes()).slice(-2);
        const dia = ("0" + data.getDate()).slice(-2);
        const mes = ("0" + (data.getMonth() + 1)).slice(-2);
        const ano = data.getFullYear();
        return `${hora}:${minutos} - ${dia}/${mes}/${ano}`;
    };

    return (
        <Card className='mt-5'>
            <CardHeader>
                Atualizações
            </CardHeader>
            <CardBody>
                {
                    entregaServico && entregaServico.length > 0 && (

                        <Table striped>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Colaborador</th>
                                    <th>Etapa</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    entregaServico && entregaServico.map((servico, index) => (

                                        <tr key={index + 1}>
                                            <td className='align-middle'>{index + 1}</td>
                                            <td className="align-middle">{servico.refUsuario && servico.refUsuario.nomeCompleto}</td>
                                            <td className='align-middle'>{servico.etapaEntregue && servico.etapaEntregue.nomeEtapa}</td>
                                            <td className='align-middle'>{servico.createdAt && formatarData(servico.createdAt)}</td>
                                            <td className='align-middle'>{servico.statusEntrega}</td>
                                            <td className='align-middle'><Button variant='link'><BsSquare /></Button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    )
                }
                {
                    entregaServico.length === 0 && (
                        <p className='text-center my-auto'>Ainda não entregou nada</p>

                    )
                }
            </CardBody>
        </Card>
    )
}
export default EntregasObra;