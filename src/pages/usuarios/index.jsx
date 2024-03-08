import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TableUsuarios from '../../components/tableUsuarios';
import LateralNav from '../../components/lateralNav';


const ViewUsuarios = () => {
  // Dados de exemplo para a lista

  return (
    <Container className='p-0 h-100'>
      <Row className='p-0 m-0 '>
        <LateralNav/>
          <Col sm={12} md={10} xxl={10} className="p-5 h-100">
            <TableUsuarios/>
          </Col>
      </Row>
    </Container>
  );
};

export default ViewUsuarios;