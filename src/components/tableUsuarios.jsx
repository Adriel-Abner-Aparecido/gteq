import { Table, Card, CardHeader, CardBody, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import './style/style.css'
import axios from "axios"
import { BsEyeFill } from "react-icons/bs"
import apiUrl from "../config"

const TableUsuarios = () => {


    const [users, setUsers] = useState([])

    useEffect(()=>{
        listaUsers();
    }, []);

    const listaUsers = async () =>{
        try {
            const response = await axios.get(`${apiUrl}/usuarios`);
            setUsers(response.data.users);
        }catch{
            console.log("Erro ao buscar os dados");
        }
    }

    var c = 1;

    return (

        <Card>
            <CardHeader>
                Usuários
                <div className="float-end">
                <Button href="./usuarios/cadastroUsuario" variant='link' className="p-0 m-0"><span className="material-symbols-outlined">add_circle</span></Button>
                </div>
            </CardHeader>
            <CardBody>
                {users.length > 0 && (
                    <Table striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th className="text-center">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            { users.map(users =>(
                                    <tr key={users._id}>
                                        <td className="align-middle">{c++}</td>
                                        <td className="align-middle">{users.nomeUsuario}</td>
                                        <td className="align-middle">{users.emailUsuario}</td>
                                        <td className="align-middle text-center"><Button href={`./usuarios/usuario/${users._id}`} variant="link" className="p-0 m-0"><h5><BsEyeFill/></h5></Button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                )}
                {users.length === 0 && (
                    <p className="text-center">Não há dados cadastrados</p>
                )}
            </CardBody>
        </Card>
        
    )
}
export default TableUsuarios;