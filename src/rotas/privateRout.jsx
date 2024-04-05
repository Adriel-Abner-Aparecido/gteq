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
    const status = tokenPayload?.status;
    if (nivelUsuario === 'user' && status === true) {
      return <Navigate to="/areaUsuario" />;
    }
    return children;
  }
  return <Navigate to="/login" />;

}
export default PrivateRoute;