import { Container, Row, Col } from "react-bootstrap"
import LateralNav from "../../components/lateralNav"
import TableServicos from "../../components/tableServicos"
import FormServico from '../../components/formServico';
import EditaServico from "../../components/editarServico";
import { useState } from "react";


const ViewServicos = () =>{

    const [idSelecionado, setIdSelecionado] = useState(null);

    const handleSelecionarId = (id) => {
        setIdSelecionado(id)
    }

    return(
        <Container className='p-0 h-100'>
            <Row className='p-0 m-0 '>
                <LateralNav/>
                <Col sm={12} md={10} xxl={10} className="p-5 h-100">
                    <Row>
                        <Col>
                            {
                                idSelecionado ? <EditaServico id={idSelecionado} /> : <FormServico />
                            }
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <TableServicos onSelecionarId={handleSelecionarId}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
export default ViewServicos;