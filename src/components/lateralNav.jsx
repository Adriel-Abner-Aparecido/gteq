import { Button, Col, Row, } from "react-bootstrap";
import NavLateral from "./navbar";
import Avatar from '../images/avatar.jpg';
import {useNavigate} from 'react-router-dom';


const LateralNav =()=> {

     const navigate = useNavigate(); 

    const handleLogout = () => {
      // Remove o token do localStorage
      localStorage.removeItem('token');
      // Redireciona o usuário para a página de login
      return navigate("/login");
    };

    const token = localStorage.getItem('token');
    const tokenPayload = JSON.parse(token);
    const userName = tokenPayload?.userName;


    return(
        <Col xxl={2} md={2} sm={12} className="p-0 bg-light">
          <Row className='p-5 m-0'>
            <img src={Avatar} className='avatar rounded rounded-circle p-2 m-auto' alt={Avatar}/>
          </Row>
          <Row className='text-center p-0 m-0'>
            <span>{userName}</span>
          </Row>
          <Row className='p-0 m-0'>
            <Button onClick={handleLogout} variant="link">Sair</Button>
          </Row>
          <NavLateral/>
        </Col>
    )
}
export default LateralNav;