import { Form, FormLabel, FormControl, Card, CardBody, CardHeader, Button } from "react-bootstrap"

const FormAvatar = () => {

    return (
        <Card>
            <CardHeader>
                Avatar
            </CardHeader>
            <CardBody>
                <Form>
                    <FormLabel>Enviar uma foto</FormLabel>
                    <FormControl type="file" />
                    <Button className="mt-2">Enviar</Button>
                </Form>
            </CardBody>
        </Card>
    )
}
export default FormAvatar