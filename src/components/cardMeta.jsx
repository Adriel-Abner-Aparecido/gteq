import { ProgressBar, Card, CardHeader, CardBody, Button } from "react-bootstrap"
import {useState} from 'react'
import ModalMeta from "./modalMeta"

const CardMeta = () => {

const [show, setShow] = useState(false);
const handleShow = () => {setShow(!show);};

const percent = 33;

    return(
            <Card className="card-info">
                <CardHeader>
                    Meta
                    <div className='float-end'>
                        <Button variant="link" className="p-0 m-0" onClick={handleShow}><span className="material-symbols-outlined">add_circle</span></Button>
                    </div>
                </CardHeader>
                <CardBody>
                    <ProgressBar now={percent} className="progress-30 rounded-0 mt-2 progress-bar-anim" label={`${percent}%`}/>
                </CardBody>
                <ModalMeta show={show} handleClose={handleShow}/>
            </Card>
    )
}
export default CardMeta;