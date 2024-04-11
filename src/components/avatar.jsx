import { useEffect, useState } from "react";
import apiUrl from "../config";
import axios from "axios";

const Avatar = ({ id }) => {
  const [image, setImage] = useState("");

  const token = localStorage.getItem("token");
  const tokenPayload = JSON.parse(token);
  const settoken = tokenPayload?.token;

  useEffect(() => {
    const PegaImagem = async () => {
      const response = await axios.get(`${apiUrl}/avatar/avatar/${id}`, {
        headers: {
          Authorization: `Bearer ${settoken}`,
        },
      });
      if (response.data.avatar === null) {
        const imgdefault = "avatar.png";
        setImage(imgdefault);
      } else {
        setImage(response.data.avatar.avatar);
      }
    };
    PegaImagem();
  }, [id, settoken]);

  return (
    <img
      className="avatar rounded rounded-circle m-auto"
      src={apiUrl + "/imagens/" + image}
      alt="Avatar"
    />
  );
};
export default Avatar;
