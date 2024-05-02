import FormEditaObra from "../../components/formEditaObra";
import { useParams } from "react-router-dom";
import App from "../../layout/app";

const EditaObra = () => {
  const { id } = useParams();

  return (
    <App>
      <FormEditaObra id={id} />
    </App>
  );
};
export default EditaObra;
