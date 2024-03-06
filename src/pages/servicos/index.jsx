import { Container, Row, Col } from "react-bootstrap"
import LateralNav from "../../components/lateralNav"
import TableServicos from "../../components/tableServicos"
import FormServico from '../../components/formServico';


const ViewServicos =()=>{
    return(
        <Container className='p-0 h-100'>
            <Row className='p-0 m-0 '>
                <LateralNav/>
                <Col sm={12} md={10} xxl={10} className="p-5 h-100">
                    <Row>
                        <Col>
                            <FormServico/>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <TableServicos/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
export default ViewServicos;