import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Form, FormControl, FormLabel, Button } from 'react-bootstrap'
import apiUrl from '../config';
import  axios  from 'axios';

const AtualizaSenha = ({ id }) => {

    const [formData, setFormData] = useState({
        senhaUsuario: '',
        confirmaSenha: '',
    });

    const [validated, setValidated] = useState(false);

    const handleChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    useEffect(() => {
        const pegaUsuario = async () => {
            const response = await axios.get(`${apiUrl}/usuarios/usuario/${id}`)
            setFormData({
                senhaUsuario: response.data.usuario.senhaUsuario,
                confirmaSenha: response.data.usuario.senhaUsuario,
            })
        }
        pegaUsuario();
    }, [id])

    const handleUpdate = async event => {

        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }
        setValidated(true);

        try {
            axios.put(`${apiUrl}/usuario/atualizaSenha/${id}`, formData);
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
        }
    };

    return (
        <Card className='mt-5'>
            <CardHeader>
                Alterar Senha:
            </CardHeader>
            <CardBody>
                <Form validated={validated} onSubmit={handleUpdate}>
                    <div className="mb-3">
                        <FormLabel htmlFor="senhaUsuario">Senha:</FormLabel>
                        <FormControl type="password" id="senhaUsuario" name="senhaUsuario" value={formData.senhaUsuario} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <FormLabel htmlFor="confirmaSenha">Confirmar Senha:</FormLabel>
                        <FormControl type="password" id="confirmaSenha" name="confirmaSenha" value={formData.confirmaSenha} onChange={handleChange} />
                    </div>
                    <Button type="submit" color='primary'>Alterar Senha</Button>
                </Form>
            </CardBody>
        </Card>
    )
}
export default AtualizaSenha