import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LateralNav from '../../components/lateralNav';
import FormEditaUsuarios from '../../components/formEditaUsuarios';
import { useParams } from 'react-router-dom';


const EditaUsuario = () => {
  
  const {id} = useParams();

  return (
    <Container className='p-0 h-100'>
      <Row className='p-0 m-0 '>
        <LateralNav/>
          <Col sm={12} md={10} xxl={10} className="p-5 h-100">
            <FormEditaUsuarios id={id}/>
          </Col>
      </Row>
    </Container>
  );
};

export default EditaUsuario;