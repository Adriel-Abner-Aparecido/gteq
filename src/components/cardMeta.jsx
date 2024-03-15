import { ProgressBar, Card, CardHeader, CardBody, Button } from "react-bootstrap"
import {useState} from 'react'
import ModalMeta from "./modalMeta"
import Counter from "./contador";

const CardMeta = () => {

const [show, setShow] = useState(false);
const handleShow = () => {setShow(!show);};

const percent = 81;

    return(
            <Card className="card-info">
                <CardHeader>
                    Meta
                    <div className='float-end'>
                        <Button variant="link" className="p-0 m-0" onClick={handleShow}><span className="material-symbols-outlined">add_circle</span></Button>
                    </div>
                </CardHeader>
                <CardBody>
                <div style={{background: '#E9ECEF'}}><ProgressBar now={percent} className="progress-30 rounded-0 mt-2 progress-bar-anim" label={<Counter finalNumber={81}/>}/></div>
                </CardBody>
                <ModalMeta show={show} handleClose={handleShow}/>
            </Card>
    )
}
export default CardMeta;