import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col } from 'react-bootstrap';

import CardProgress from '../../components/cardProgress';
import CardMeta from '../../components/cardMeta';
import CardTotal from '../../components/cardTotal';
import TableObras from '../../components/tableObras';

import LateralNav from '../../components/lateralNav';
import TableUsuarios from '../../components/tableUsuarios';



const DashboardPage = () => {
  return (
    <Container className='p-0 h-100'>
      <Row className='p-0 m-0'>
        <LateralNav/>
        <Col sm={12} md={10} xxl={10} className="m-0 h-100 pt-5 pb-5">
          <Row className='px-4 m-0'>
            <Col sm={12} md={4} xxl={4}>
                <CardProgress/>
            </Col>
            <Col sm={12} md={4} xxl={4}>
              <CardMeta/>
            </Col>
            <Col sm={12} md={4} xxl={4}>
              <CardTotal/>
            </Col>
          </Row>
          <Row className='px-5'>
            <Col xl={12} className='pt-5 p-0'>
              <TableObras/>
            </Col>
            <Col xl={12} className='pt-5 p-0'>
              <TableUsuarios/>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;