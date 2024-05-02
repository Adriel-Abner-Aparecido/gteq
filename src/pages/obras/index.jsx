import React from "react";
import { Col } from "react-bootstrap";
import TableObras from "../../components/tableObras";
import App from "../../layout/app";

const ViewObras = () => {
  // Dados de exemplo para a lista
  return (
    <App>
      <Col className="p-xxl-5 h-100">
        <TableObras />
      </Col>
    </App>
  );
};

export default ViewObras;
