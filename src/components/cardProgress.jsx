import { Card, CardHeader, CardBody, Button } from "react-bootstrap";
import ProgressObras from "./progressObras";
import { useEffect, useState } from "react";
import apiUrl from "../config";
import axios from "axios";

const CardProgress = () => {
  const [obras, setObras] = useState([]);

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  useEffect(() => {
    const pegaObras = async () => {
      try {
        const response = await axios.get(`${apiUrl}/obras/verObras`, {
          headers: {
            Authorization: `Bearer ${settoken}`,
          },
        });
        setObras(response.data.obras);
      } catch (error) {
        console.error(error);
      }
    };
    pegaObras();
    // eslint-disable-next-line
  }, []);

  return (
    <Card className="card-info">
      <CardHeader>
        Progresso
        <div className="float-end">
          <Button
            href="/obras/cadastroObras"
            variant="link"
            className="p-0 m-0"
          >
            <span className="material-symbols-outlined">add_circle</span>
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        {obras.slice(0, 4).map((obra, index) => (
          <div key={index}>
            {obra.nomeObra}
            <ProgressObras id={obra._id} />
          </div>
        ))}
      </CardBody>
    </Card>
  );
};
export default CardProgress;
