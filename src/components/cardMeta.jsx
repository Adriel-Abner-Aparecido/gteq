import { Card, CardHeader, CardBody, Button } from "react-bootstrap"
import { useState } from 'react'
import ModalMeta from "./modalMeta"
import Progress from "./progress";

const CardMeta = () => {

    const [show, setShow] = useState(false);
    const handleShow = () => { setShow(!show); };

    return (
        <Card className="card-info">
            <CardHeader>
                Meta
                <div className='float-end'>
                    <Button variant="link" className="p-0 m-0" onClick={handleShow}><span className="material-symbols-outlined">add_circle</span></Button>
                </div>
            </CardHeader>
            <CardBody>
                <Progress />
            </CardBody>
            <ModalMeta show={show} handleClose={handleShow} />
        </Card>
    )
}
export default CardMeta;