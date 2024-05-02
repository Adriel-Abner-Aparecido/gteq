import { Button, Col, Row } from "react-bootstrap";
import NavLateral from "./navbar";
import Avatar from "./avatar";
// import Avatar from '../images/avatar.jpg';
import { useNavigate } from "react-router-dom";

const LateralNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove o token do localStorage
    localStorage.removeItem("token");
    // Redireciona o usuário para a página de login
    return navigate("/login");
  };

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const id = tokenPayload?.userId;
  const userName = tokenPayload?.userName;

  return (
    <Col className="p-0">
      <Row className="p-5 m-0">
        <Avatar id={id} />
      </Row>
      <Row className="text-center p-0 m-0">
        <span>{userName}</span>
      </Row>
      <Row className="p-0 m-0">
        <Button onClick={handleLogout} variant="link">
          Sair
        </Button>
      </Row>
      <NavLateral />
    </Col>
  );
};
export default LateralNav;
