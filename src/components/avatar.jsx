import { useEffect, useState } from "react"
import apiUrl from "../config";

const Avatar = ({ id }) => {

    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {

        fetch(`${apiUrl}/imagens`)
            .then(response => {
                if (!response.ok) {
                    console.log('Erro ao buscar a imagem')
                }
                setImageUrl(`${apiUrl}/imagens/${id}.png`)
            })
            .catch(error => {
                console.error('Erro ao buscar imagem', error)
            })
    }, [id])

    return (
        <img src={imageUrl} alt="Avatar" />
    )
}
export default Avatar