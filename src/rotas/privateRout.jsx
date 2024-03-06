import React from "react";
import { Navigate } from "react-router-dom";


const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const tokenPayload = JSON.parse(token);
      const nivelUsuario = tokenPayload?.nivel;
      return nivelUsuario ? true : false;
    }
    return false;
  };

const PrivateRoute =({children})=>{
  
  if (isAuthenticated()) {
    const tokenPayload = JSON.parse(localStorage.getItem("token"));
    const nivelUsuario = tokenPayload?.nivel;
    // Verifica se o nível do usuário é 'user' e redireciona para '/areaUsuario'
    if (nivelUsuario === 'user') {
      return <Navigate to="/areaUsuario" />;
    }
    // Permite acesso a outras rotas para usuários com níveis diferentes de 'user'
    return children;
  }
  // Redireciona para a página de login se o usuário não estiver autenticado
  return <Navigate to="/login" />;

}
export default PrivateRoute;