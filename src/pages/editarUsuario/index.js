import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LateralNav from '../../components/lateralNav';
import FormUsuarios from '../../components/formUsuarios';


const EditaUsuario = () => {
  // Dados de exemplo para a lista

  return (
    <Container className='p-0 h-100'>
      <Row className='p-0 m-0 '>
        <LateralNav/>
          <Col sm={12} md={10} xxl={10} className="p-5 h-100">
            <FormUsuarios/>
          </Col>
      </Row>
    </Container>
  );
};

export default EditaUsuario;