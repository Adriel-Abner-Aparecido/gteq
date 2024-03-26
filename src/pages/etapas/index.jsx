import { Container, Row, Col } from "react-bootstrap"
import LateralNav from "../../components/lateralNav"
import TableEtapas from "../../components/tableEtapas"
import FormEtapas from "../../components/formEtapas"
import EditaEtapas from "../../components/editarEtapa"
import { useState } from "react"


const ViewEtapas = () =>{

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
                                idSelecionado ? <EditaEtapas id={idSelecionado}/> : <FormEtapas/>
                            }
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <TableEtapas onSelecionarId={handleSelecionarId}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
export default ViewEtapas;