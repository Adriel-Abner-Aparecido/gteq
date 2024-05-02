import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import FormEditaUsuarios from "../../components/formEditaUsuarios";
import FormAvatar from "../../components/formAvatar";
import AtualizaSenha from "../../components/atualizaSenha";
import App from "../../layout/app";

const ConfigPage = () => {
  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const id = tokenPayload?.userId;

  return (
    <App>
      <Row className="px-5 mb-5">
        <Col>
          <FormAvatar id={id} />
        </Col>
      </Row>
      <Row className="px-5">
        <Col>
          <FormEditaUsuarios id={id} />
        </Col>
      </Row>
      <Row className="px-5">
        <Col>
          <AtualizaSenha id={id} />
        </Col>
      </Row>
    </App>
  );
};

export default ConfigPage;
