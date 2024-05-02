import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Row, Col } from "react-bootstrap";

import CardProgress from "../../components/cardProgress";
import CardMeta from "../../components/cardMeta";
import CardTotal from "../../components/cardTotal";
import TableObras from "../../components/tableObras";
import Entregas from "../../components/tableEntregas";

import TableUsuarios from "../../components/tableUsuarios";
import App from "../../layout/app";

const DashboardPage = () => {
  return (
    <App>
      <Row className="px-4 m-0">
        <Col sm={12} md={4} xxl={4}>
          <CardProgress />
        </Col>
        <Col sm={12} md={4} xxl={4}>
          <CardMeta />
        </Col>
        <Col sm={12} md={4} xxl={4}>
          <CardTotal />
        </Col>
      </Row>
      <Row className="px-5">
        <Col xl={12} className="pt-5 p-0">
          <TableObras />
        </Col>
        <Col xl={12} className="pt-5 p-0">
          <Entregas />
        </Col>
        <Col xl={12} className="pt-5 p-0">
          <TableUsuarios />
        </Col>
      </Row>
    </App>
  );
};

export default DashboardPage;
