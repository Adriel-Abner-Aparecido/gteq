import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import LateralNav from '../../components/lateralNav';
import FormEditaUsuarios from '../../components/formEditaUsuarios';
import FormAvatar from '../../components/formAvatar';



const ConfigPage = () => {

    const token = localStorage.getItem('token');
    const tokenPayload = JSON.parse(token);
    const id = tokenPayload?.userId;

    return (
        <Container className='p-0 h-100'>
            <Row className='p-0 m-0'>
                <LateralNav />
                <Col sm={12} md={10} xxl={10} className="m-0 h-100 pt-5 pb-5">
                    <Row className='px-5 mb-5'>
                        <Col>
                            <FormAvatar />
                        </Col>
                    </Row>
                    <Row className='px-5'>
                        <Col>
                            <FormEditaUsuarios id={id} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default ConfigPage;