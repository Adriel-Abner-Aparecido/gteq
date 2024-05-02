import { Row, Col } from "react-bootstrap";
import TableServicos from "../../components/tableServicos";
import FormServico from "../../components/formServico";
import EditaServico from "../../components/editarServico";
import { useState } from "react";
import App from "../../layout/app";

const ViewServicos = () => {
  const [idSelecionado, setIdSelecionado] = useState(null);

  const handleSelecionarId = (id) => {
    setIdSelecionado(id);
  };

  return (
    <App>
      <Row>
        <Col>
          {idSelecionado ? (
            <EditaServico id={idSelecionado} />
          ) : (
            <FormServico />
          )}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <TableServicos onSelecionarId={handleSelecionarId} />
        </Col>
      </Row>
    </App>
  );
};
export default ViewServicos;
