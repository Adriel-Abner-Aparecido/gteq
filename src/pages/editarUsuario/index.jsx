import React from "react";
import FormEditaUsuarios from "../../components/formEditaUsuarios";
import { useParams } from "react-router-dom";
import AtualizaSenha from "../../components/atualizaSenha";
import App from "../../layout/app";

const EditaUsuario = () => {
  const { id } = useParams();

  return (
    <App>
      <FormEditaUsuarios id={id} />
      <AtualizaSenha id={id} />
    </App>
  );
};

export default EditaUsuario;
