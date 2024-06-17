import React from 'react';
import { Col, Container, Row, Image, Form, ButtonGroup, Button } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';

import { getData, updateData } from '../Functions/Req';
import { useParams } from 'react-router-dom';
import TituloPagina from '../Components/TituloPagina';
import Loading from '../Components/Loading';

const EmployeeDetail = () => {

    const { id } = useParams();

    const [loading, setLoading] = React.useState(true);
    const [employeeData, setEmployeeData] = React.useState([]);
    const [desativado, setDesativado] = React.useState(true)
    
    const [accessLevel, setAcessLevel] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [picture, setPicture] = React.useState("");
    // const [password, setPassword] = React.useState("");
    
    const getEmployeeData = async () => {
        setLoading(true);
            setEmployeeData(await getData(`/employee/select-one/${id}`, ""))
        setLoading(false);
    }

    const setDataFields = async () => {
        setLoading(true);
            setAcessLevel(employeeData.employeeAccessLevel);
            setEmail(employeeData.employeeEmail);
            setName(employeeData.employeeName);
            setPicture(employeeData.employeePicture);
            // setPassword(employeeData.employeePassword)
        setLoading(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!accessLevel || !name || !picture || !email){
            toast.error("Preencha todos os campos")
        }

        const body = {
            employeeEmail: email, 
            employeeAccessLevel: accessLevel,
            employeeName: name, 
            employeePicture: picture
        }

        updateData("/employee/update/", id, body, "Atualizado com sucesso!");


    }

    React.useEffect(() => {
        getEmployeeData();
    }, [])

    React.useEffect(() => {
        setDataFields();
    }, [employeeData]);

    return (
        <Container>
            <Row>
                {!loading && (
                    <TituloPagina titulo={name} />
                )}
            </Row>
            {!loading && (
            <Row style={{marginTop: "50px", marginBottom: "50px"}}>
                
                <Col sm={5}>
                    <Image src={picture} style={{objectFit: "cover", height: "500px", width: "500px", borderRadius: "10px", borderColor: ""}} thumbnail  />
                </Col>
                <Col sm={7}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName" style={{marginBottom: "20px"}}>
                            <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="ex: João da Silva"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={desativado}
                                    required
                                />
                        </Form.Group>
                        <Form.Group controlId="formEmail" style={{marginBottom: "20px"}}>
                            <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="email@exemplo.com"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={desativado}
                                    required
                                />
                        </Form.Group>
                        <Form.Group controlId="formAccessLevel" style={{marginBottom: "20px"}}>
                            <Form.Label>Nível de acesso</Form.Label>
                            <Form.Control
                                as="select"
                                name="gender"
                                value={accessLevel}
                                onChange={(e) => setAcessLevel(e.target.value)}
                                disabled={desativado}
                                required
                            >
                                <option value="0">0 - Usuário comum</option>
                                <option value="1">1 - Administrador</option>
                            </Form.Control>
                        </Form.Group>
                        {/* <Form.Group controlId="formPassword" style={{marginBottom: "20px"}}>
                            <Form.Label>Senha</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="email@exemplo.com"
                                    name="email"
                                    value={password}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={desativado}
                                    required
                                />
                        </Form.Group> */}

                        <ButtonGroup>
                            <Button variant='warning' onClick={() => setDesativado(!desativado)} >{desativado ? "Ativar" : "Desativar"}</Button>
                            <Button variant='success' type='submit'>Atualizar</Button>
                            <Button variant='danger'>Excluir</Button>
                        </ButtonGroup>
                    </Form>
                </Col>
            </Row>
            )}
            {loading && (
            <Row style={{marginTop: "50px", marginBottom: "50px"}}>
                <Loading />
            </Row>
            )}
            <Toaster />

        </Container>
    )
}

export default EmployeeDetail
