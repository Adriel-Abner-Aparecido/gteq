import { Row, Col } from "react-bootstrap";
import TableEtapas from "../../components/tableEtapas";
import FormEtapas from "../../components/formEtapas";
import EditaEtapas from "../../components/editarEtapa";
import { useState } from "react";
import App from "../../layout/app";

const ViewEtapas = () => {
  const [idSelecionado, setIdSelecionado] = useState(null);

  const handleSelecionarId = (id) => {
    setIdSelecionado(id);
  };

  return (
    <App>
      <Row>
        <Col>
          {idSelecionado ? <EditaEtapas id={idSelecionado} /> : <FormEtapas />}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <TableEtapas onSelecionarId={handleSelecionarId} />
        </Col>
      </Row>
    </App>
  );
};
export default ViewEtapas;
