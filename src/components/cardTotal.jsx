import { Card, CardHeader, CardBody, Row, Button } from "react-bootstrap";
import React, { useState } from "react";
import { BsEyeSlashFill } from 'react-icons/bs'
import CalculaTotalProduzido from "./totalProduzido";
const TotalProduzido = () => {

    const [classeParagrafoUm, setClasseParagrafoUm] = useState('valor text-success text-center');
    const [textStatus, setTextStatus] = useState('visibility_off');
    const [classeParagrafoDois, setClasseParagrafoDois] = useState('text-dark text-center ocultar');
    const ocultarValor = () => {
        setClasseParagrafoUm(classeParagrafoUm === 'valor text-success text-center' ? 'valor text-success text-center ocultar' : 'valor text-success text-center');
        setTextStatus(textStatus === 'visibility_off' ? 'visibility' : 'visibility_off');
        setClasseParagrafoDois(classeParagrafoDois === 'text-dark text-center' ? 'text-Dark text-center ocultar' : 'text-dark text-center');
    }

    return (
        <Card className="card-info">
            <CardHeader>
                Total
                <div className='float-end'>
                    <Button variant="link" className="btn p-0 m-0" onClick={ocultarValor}><span className="material-symbols-outlined" id="spanView">{textStatus}</span></Button>
                </div>
            </CardHeader>
            <CardBody className="d-flex align-middle justify-content-center">
                <Row className="d-flex align-items-center w-100">
                    <p className={classeParagrafoUm}>
                        R$<CalculaTotalProduzido/>
                    </p>
                    <p className={classeParagrafoDois}>
                        <BsEyeSlashFill className="eyeView text-light" />
                    </p>
                </Row>
            </CardBody>
        </Card>
    )
}
export default TotalProduzido;