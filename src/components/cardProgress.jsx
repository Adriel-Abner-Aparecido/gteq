import {Card, CardHeader, CardBody, Button} from 'reactstrap';
import { ProgressBar } from 'react-bootstrap';

const CardProgress = () => {
    return(
    <Card className='card-info'>
        <CardHeader>
            Progresso
        <div className='float-end'>
        <Button href="./obras/cadastroObras" color='link' className="btn p-0 m-0"><span className="material-symbols-outlined">add_circle</span></Button>
        </div>
        </CardHeader>
        <CardBody>
            <ProgressBar now={60} className='progress-30 rounded-0 mt-2 progress-bar-anim' label={`${60}%`}/>
            <ProgressBar now={33} className='progress-30 rounded-0 mt-2 progress-bar-anim' label={`${33}%`}/>
            <ProgressBar now={81} className='progress-30 rounded-0 mt-2 progress-bar-anim' label={`${81}%`}/>
        </CardBody>
    </Card>
    )
}
export default CardProgress;