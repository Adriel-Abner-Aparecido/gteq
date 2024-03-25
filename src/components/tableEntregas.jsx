import { Card, CardHeader, CardBody, Table, Button } from "react-bootstrap";
import { BsFillHandThumbsDownFill, BsFillHandThumbsUpFill, BsCircleFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import axios from "axios";
import apiUrl from "../config";


const Entregas = () => {

    const [entregaServico, setEntregaServico] = useState([]);

    const handleClick = async (id, status) => {
        try {
            await axios.put(`${apiUrl}/atualizaStatusEntrega/${id}`, { statusEntrega: status })
            fetchEntregas();
        }
        catch {
            console.log('Erro ao atualizar este dado!')
        }
    }

    const fetchEntregas = async () => {
        try {
            const responseEntregaServico = await axios.get(`${apiUrl}/entregas`);
            setEntregaServico(responseEntregaServico.data.entregaServico);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    useEffect(() => {
        fetchEntregas();
    }, []);

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
        <Card>
            <CardHeader>
                Atualizações
            </CardHeader>
            <CardBody>
                {
                    entregaServico && entregaServico.length > 0 && (

                        <Table striped responsive>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Colaborador</th>
                                    <th>Obra</th>
                                    <th>Bloco</th>
                                    <th>Unidade</th>
                                    <th>Etapa</th>
                                    <th>Data</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-center">Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    entregaServico && entregaServico.map((servico, index) => (

                                        <tr key={index + 1}>
                                            <td className='align-middle'>{index + 1}</td>
                                            <td className="align-middle">{servico.refUsuario && servico.refUsuario.nomeCompleto}</td>
                                            <td className="align-middle">{servico.refObra && servico.refObra.nomeObra}</td>
                                            <td className="align-middle">{servico.blocoObra && servico.blocoObra.numeroBloco}</td>
                                            <td className="align-middle">{servico.unidadeObra}</td>
                                            <td className='align-middle'>{servico.etapaEntregue && servico.etapaEntregue.nomeEtapa}</td>
                                            <td className='align-middle'>{servico.createdAt && formatarData(servico.createdAt)}</td>
                                            <td className='align-middle text-center'>
                                                {servico.statusEntrega === 'pendente' ?
                                                    (<BsCircleFill className="text-warning" />) : servico.statusEntrega === 'aceito' ?
                                                        (<BsCircleFill className="text-success" />) : (<BsCircleFill className="text-danger" />)
                                                }
                                            </td>
                                            <td className='align-middle text-center'>
                                                <Button variant='link' onClick={() => handleClick(servico._id, 'aceito')}><BsFillHandThumbsUpFill /></Button>
                                                <Button variant="link" className="text-danger" onClick={() => handleClick(servico._id, 'rejeitado')}><BsFillHandThumbsDownFill /></Button>
                                            </td>
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
export default Entregas;