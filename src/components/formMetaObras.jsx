import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap';
import axios from 'axios';
import apiUrl from '../config';

const FormMetaObras = ({ id }) => {

  const [metaObra, setMetaObra] = useState('');
  const [metaNumber, setMetaNumber] = useState('');

  const [formData, setFormData] = useState({
    relObra: id,
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
      const response = await fetch(`${apiUrl}/metaObra`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      await response.json();
    } catch (error) {
      console.error('Erro ao cadastrar Meta:', error);
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
      await axios.put(`${apiUrl}/metaObra/${metaObra[0]._id}`, formUpdate);
    } catch (error) {
      console.error('Erro ao Atualizar Meta da Obra:', error);
    }

  }

  useEffect(() => {
    const fetchObra = async () => {
      try {
        const responseMetaObra = await axios.get(`${apiUrl}/metaObra/${id}`);
        setMetaObra(responseMetaObra.data.metaObra);
        if (responseMetaObra.data.metaObra.length > 0) {
          setMetaNumber(responseMetaObra.data.metaObra[0].valorMeta)
        }
      } catch (error) {
        console.error('Erro ao buscar dados', error);
      }
    };
    fetchObra();
    // eslint-disable-next-line
  }, []);

  return (
    <Col>
      {
        metaObra && metaObra.length === 0 && (
          <Form onSubmit={handleSubmit}>
            <FormGroup as={Row} >
              <FormLabel column xl={1} htmlFor='valorMeta' className="text-center">Meta:</FormLabel>
              <Col xl={1} className='px-0'>
                <FormControl className='input-number' type="number" id='valorMeta' name='valorMeta' value={formData.valorMeta} onChange={handleChange} required/>
              </Col>
              <Col xl={2} className='px-0'>
                <Button variant='link' type='submit'>Definir</Button>
              </Col>
            </FormGroup>
          </Form>
        )
      }
      {
        metaObra && metaObra.length > 0 && (
          <Form onSubmit={atualizaDados}>
            <FormGroup as={Row} >
              <FormLabel column xl={1} htmlFor='valorMeta' className="text-center">Meta:</FormLabel>
              <Col xl={1} className='px-0'>
                <FormControl className='form-control input-number' type="number" id='valorMeta' name="valorMeta" value={metaNumber} onChange={handleUpdate} required/>
              </Col>
              <Col xl={2} className='px-0'>
                <Button variant='link' type='submit'>Definir</Button>
              </Col>
            </FormGroup>
          </Form>
        )
      }
    </Col>
  )
}
export default FormMetaObras;