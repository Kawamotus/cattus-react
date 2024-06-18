import React from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import TituloPagina from '../Components/TituloPagina';
import Error404 from './Error404';

const EmployeeRegister = () => {

    document.title = "Cadastro de funcionários";

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [picture, setPicture] = React.useState(null);
    const [accessLevel, setAccessLevel] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!name || !email || !password || !picture || !accessLevel){
            toast.error("Preencha todos os campos!");
        }

        const formData = new FormData();

        formData.append("employeeName", name);
        formData.append("employeeEmail", email);
        formData.append("employeePassword", password);
        formData.append("employeePicture", picture);
        formData.append("employeeAccessLevel", accessLevel);
        formData.append("company", Cookies.get("company"));

        let response = await fetch("http://localhost:8080/employee/create", {
            method: "POST",
            headers: {
                'authorization': Cookies.get("token")
            },
            body: formData
        });

        response = await response.json();

        if(response.ok){
            toast.success("Funcionário cadastrado com sucesso!");
            clearFields();
        }

    };

    const clearFields = () => {
        setName("");
        setEmail("");
        setPassword("");
        setPicture(null);
        setAccessLevel("");
    }


    if(Cookies.get("accessLevel") == 1){
        return (
            <Container>
                <TituloPagina titulo="Cadastro de funcionário" />
                <br />
                <Form onSubmit={handleSubmit}>
                    <Row>

                        <Col>
                        <Form.Group controlId="formName">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />
                        </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="formEmail">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                            </Form.Group>  
                        </Col>

                    </Row>
                    <br />
                    <Row>

                        <Col>
                            <Form.Group controlId="formAccessLevel">
                                <Form.Label>Nível de Acesso</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="accessLevel"
                                    value={accessLevel}
                                    onChange={(e) => setAccessLevel(e.target.value)}
                                >
                                    <option>Selecione...</option>
                                    <option value="0">0 - Usuário comum</option>
                                    <option value="1">1 - Administrador</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        
                        <Col>
                            <Form.Group controlId="forPassword" style={{marginBottom: "20px"}}>
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                    />
                            </Form.Group>  
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                        <Form.Group controlId="formPic">
                            <Form.Label>Foto do Funcionário</Form.Label>
                                <Form.Control 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => setPicture(e.target.files[0])} 
                                />
                                {picture && (
                                    <div className="mt-3" style={{textAlign: "center"}}>
                                    <img
                                        src={URL.createObjectURL(picture)}
                                        alt="Foto do Pet"
                                        className="img-thumbnail"
                                        style={{ maxWidth: '500px' }}
                                    />
                                    </div>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <Button variant="danger" type="submit" style={{width: "300px"}}>Cadastrar</Button>
                        </Col>
                    </Row>
                </Form>
                <Toaster />
            </Container>    
        )
    }
    else{
        return(
            <Error404 />
        )
    }
}

export default EmployeeRegister
