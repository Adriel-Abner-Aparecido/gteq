import { ProgressBar, Card, CardHeader, CardBody, Button } from 'react-bootstrap';
import Counter from './contador';

const CardProgress = () => {


    return (
        <Card className='card-info'>
            <CardHeader>
                Progresso
                <div className='float-end'>
                    <Button href="./obras/cadastroObras" variant='link' className="p-0 m-0"><span className="material-symbols-outlined">add_circle</span></Button>
                </div>
            </CardHeader>
            <CardBody>
                <div style={{ background: '#E9ECEF' }}>
                    <ProgressBar now={60} className='progress-30 rounded-0 mt-2 progress-bar-anim' label={<Counter finalNumber={60} />} />
                </div>
                <div style={{ background: '#E9ECEF' }}>
                    <ProgressBar variant='success' now={17} className='rounded-0 progress-bar-anim' label={<Counter finalNumber={17} />} />
                </div>
                <div style={{ background: '#E9ECEF' }}>
                    <ProgressBar now={33} className='progress-30 rounded-0 mt-2 progress-bar-anim' label={<Counter finalNumber={33} />} />
                </div>
                <div style={{ background: '#E9ECEF' }}>
                    <ProgressBar variant='success' now={10} className='rounded-0 progress-bar-anim' label={<Counter finalNumber={10} />} />
                </div>
                <div style={{ background: '#E9ECEF' }}>
                    <ProgressBar now={81} className='progress-30 rounded-0 mt-2 progress-bar-anim' label={<Counter finalNumber={81} />} />
                </div>
                <div style={{ background: '#E9ECEF' }}>
                    <ProgressBar variant='success' now={100} className='rounded-0 progress-bar-anim' label={<Counter finalNumber={100} />} />
                </div>
            </CardBody>
        </Card>
    )
}
export default CardProgress;