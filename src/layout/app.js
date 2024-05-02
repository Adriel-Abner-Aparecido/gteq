import React from "react";
import Container from "../components/container";
import LateralNav from "../components/lateralNav";
import { Row, Col } from "react-bootstrap";

const App = ({ children }) => {
  return (
    <Row className="p-0 m-0 h-100">
      <Col xxl={2} md={2} sm={12} className="p-0">
        <Col className="h-100 bg-light">
          <LateralNav />
        </Col>
      </Col>
      <Col xxl={10} md={10} sm={12} className="p-5">
        <Container>{children}</Container>
      </Col>
    </Row>
  );
};
export default App;
