import { Col } from "react-bootstrap";
import FormObras from "../../components/formObras";
import App from "../../layout/app";

const CadastroObras = () => {
  return (
    <App>
      <Col xl={12} className="p-5">
        <FormObras />
      </Col>
    </App>
  );
};
export default CadastroObras;
