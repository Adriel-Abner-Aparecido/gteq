import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TableUsuarios from "../../components/tableUsuarios";
import App from "../../layout/app";

const ViewUsuarios = () => {
  // Dados de exemplo para a lista

  return (
    <App>
      <TableUsuarios />
    </App>
  );
};

export default ViewUsuarios;
