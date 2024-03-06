import { Modal, Button, Col, Form, FormControl, FormLabel, ModalBody, ModalFooter, ModalHeader, Row } from "react-bootstrap"

const ModalMeta = ({show, handleClose}) =>{

    return(
        <Modal className="fade" show={show} onHide={handleClose} centered>
                  <ModalHeader closeButton>
                    <h1 className="modal-title fs-5">Meta</h1>
                  </ModalHeader>
                  <ModalBody>
                    <Form method="dialog" className="row justify-content-center">
                      <Row>
                        <Col xl={6}>
                          <FormLabel htmlFor="meta">Definir meta:</FormLabel>
                          <FormControl type="number" id="meta" required/>
                        </Col>
                        <Col xl={6}>
                          <FormLabel htmlFor="metaData">Definir Data:</FormLabel>
                          <FormControl type="number" id="metaData" required/>
                        </Col>
                      </Row>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button type="button" color="danger" className="btn btn-danger" onClick={handleClose}>Cancelar</Button>
                    <Button type="submit" color="primary" className="btn" form="meta">Definir</Button>
                  </ModalFooter>
        </Modal>
    )
}
export default ModalMeta;