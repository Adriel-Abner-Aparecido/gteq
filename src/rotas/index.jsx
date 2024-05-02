import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/login";
import SignupPage from "../pages/cadastro/index";
import DashboardPage from "../pages/dashboard/index";
import ViewUsuarios from "../pages/usuarios/index";
import Projetos from "../pages/obras/index";
import ViewServicos from "../pages/servicos";
import ViewEtapas from "../pages/etapas";
import PrivateRoute from "./privateRout";
import CadastroObras from "../pages/cadastroObras";
import CadastroUsuario from "../pages/cadastroUsuario";
import ViewUsuario from "../pages/usuario";
import ViewObra from "../pages/obra";
import AreaUsuario from "../pages/areaUsuario";
import PrivateRouteUser from "./privateRoutUser";
import EditaObra from "../pages/editarObra";
import EditaUsuario from "../pages/editarUsuario";
import ConfigPage from "../pages/configuracoes";
import ConfigUsuario from "../pages/configusuario";

const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<SignupPage />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <PrivateRoute>
              <ViewUsuarios />
            </PrivateRoute>
          }
        />
        <Route
          path="/obras"
          element={
            <PrivateRoute>
              <Projetos />
            </PrivateRoute>
          }
        />
        <Route
          path="/servicos"
          element={
            <PrivateRoute>
              <ViewServicos />
            </PrivateRoute>
          }
        />
        <Route
          path="/etapas"
          element={
            <PrivateRoute>
              <ViewEtapas />
            </PrivateRoute>
          }
        />
        <Route
          path="/obras/cadastroObras"
          element={
            <PrivateRoute>
              <CadastroObras />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuarios/cadastroUsuario"
          element={
            <PrivateRoute>
              <CadastroUsuario />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuarios/usuario/:id"
          element={
            <PrivateRoute>
              <ViewUsuario />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuarios/usuario/editarUsuario/:id"
          element={
            <PrivateRoute>
              <EditaUsuario />
            </PrivateRoute>
          }
        />
        <Route
          path="/obras/obra/:id"
          element={
            <PrivateRoute>
              <ViewObra />
            </PrivateRoute>
          }
        />
        <Route
          path="/obras/obra/editarObra/:id"
          element={
            <PrivateRoute>
              <EditaObra />
            </PrivateRoute>
          }
        />
        <Route
          path="/configuracoes"
          element={
            <PrivateRoute>
              <ConfigPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/areaUsuario"
          element={
            <PrivateRouteUser>
              <AreaUsuario />
            </PrivateRouteUser>
          }
        />
        <Route
          path="/configusuario"
          element={
            <PrivateRouteUser>
              <ConfigUsuario />
            </PrivateRouteUser>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default Rotas;
