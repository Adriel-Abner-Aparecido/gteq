import { Container, Row, Col } from "react-bootstrap";
import LateralNav from "../../components/lateralNav";
import FormObras from "../../components/formObras";

const CadastroObras = () => {
    return(
        <Container className='p-0'>
            <Row className='p-0 m-0'>
                <LateralNav/>
                <Col sm={12} md={10} xxl={10} className="m-0 h-100 pt-5 pb-5">
                    <Col xl={12} className='p-5'>
                        <FormObras/>
                    </Col>
                </Col>
                </Row>
        </Container>
    )
}
export default CadastroObras;