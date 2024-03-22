import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap';
import axios from 'axios';
import apiUrl from '../config';

const FormMetaUsers = ({ id }) => {

  const [metaUser, setMetaUser] = useState();
  const [metaNumber, setMetaNumber] = useState(null);

  const [formData, setFormData] = useState({
    relUser: id,
    valorMeta: '',
  });

  const [formUpdate, setFormUpdate] = useState({
    valorMeta: '',
  })

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/metaUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      await response.json();
    } catch (error) {
      console.error('Erro ao Cadastrar Meta do Usuario!:', error);
    }
  }

  const handleUpdate = async (event) => {
    if (!event.target.value) {
      setMetaNumber('')
    } else {
      setMetaNumber(event.target.value);
    }
    setFormUpdate({ valorMeta: `${event.target.value}` });
  }

  const atualizaDados = async () => {
    try {
      await axios.put(`${apiUrl}/metaUser/${metaUser[0]._id}`, formUpdate);
    } catch (error) {
      console.error('Erro ao Atualizar meta do Usuario:', error);
    }

  }

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const responseMetaUser = await axios.get(`${apiUrl}/metaUser/${id}`);
        setMetaUser(responseMetaUser.data.metaUser);
        if (responseMetaUser.data.metaUser.length > 0) {
          setMetaNumber(responseMetaUser.data.metaUser[0].valorMeta)
        }
      } catch (error) {
        console.error('Erro ao buscar dados', error);
      }
    };
    fetchUsuario();
  }, []);

  return (
    <Col className=''>
      {
        metaUser && metaUser.length === 0 && (
          <Form onSubmit={handleSubmit}>
            <FormGroup as={Row} >
              <FormLabel column xxl={1} xl={2} md={2} htmlFor='valorMeta' className="text-center">Meta:</FormLabel>
              <Col xxl={1} xl={2} md={2} className='px-0'>
                <FormControl className='input-number' type="number" id='valorMeta' name='valorMeta' value={formData.valorMeta} onChange={handleChange} required />
              </Col>
              <Col xxl={2} xl={2} className='px-0'>
                <Button variant='link' type='submit'>Definir</Button>
              </Col>
            </FormGroup>
          </Form>
        )
      }
      {
        metaUser && metaUser.length > 0 && (
          <Form onSubmit={atualizaDados}>
            <FormGroup as={Row} >
              <FormLabel column xxl={1} xl={2} md={2} htmlFor='valorMeta' className="text-center">Meta:</FormLabel>
              <Col xxl={1} xl={2} md={2} className='px-0'>
                <FormControl type='number' className='input-number' id='valorMeta' name='valorMeta' value={metaNumber} onChange={handleUpdate} />
              </Col>
              <Col xxl={2} xl={2} className='px-0'>
                <Button variant='link' type='submit'>Definir</Button>
              </Col>
            </FormGroup>
          </Form>
        )
      }
    </Col>
  )
}
export default FormMetaUsers;