import React from 'react';
import { Container, Form, Button, Spinner, Image, Row, Col, Modal, ButtonGroup, FormGroup } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';


import TituloPagina from '../Components/TituloPagina';

const PetDetail = () => {
  const { id } = useParams();

  const [petName, setPetName] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [entry, setEntry] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [animalType, setAnimalType] = React.useState("");
  const [breed, setBreed] = React.useState("");
  const [size, setSize] = React.useState("");
  const [comorbidities, setComorbidities] = React.useState("");
  const [observations, setObservations] = React.useState("");
  const [castrated, setCastrated] = React.useState("");
  const [picture, setPicture] = React.useState(null);
  const [vacCard, setVacCard] = React.useState(null);

  const [angle, setAngle] = React.useState(0);
  const [desativado, setDesativado] = React.useState(true);

  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [mensagem, setMensagem] = React.useState("")

  const [imgOriginal, setImgOriginal] = React.useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const fetchData = async () => {

    const response = await fetch(`http://localhost:8080/animal/select-one/${id}`, {
      method: "GET",
      headers: {
        'authorization': Cookies.get("token")
      }
    });

    const dataR = await response.json();
    const data = await dataR.result;

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth retorna de 0 a 11
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }


    setPetName(data.petName);
    setBirthDate(formatDate(data.petBirth));
    setEntry(formatDate(data.petEntry));
    setGender(data.petGender);
    setAnimalType(data.petCharacteristics.petType);
    setBreed(data.petCharacteristics.petBreed);
    setSize(data.petCharacteristics.petSize);
    setComorbidities(data.petComorbidities);
    setObservations(data.petObs);
    setPicture(data.petPicture);
    setVacCard(data.petVaccCard);
    setCastrated(data.petCharacteristics.petCastrated);

    setImgOriginal(data.petPicture);

    document.title = data.petName

    console.log(data);
    
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!petName || !birthDate || !entry || !gender || !animalType || !breed || !size || !comorbidities || !observations || !picture || !vacCard){
      toast.error("Preencha todos os campos!");
      return;
  }

    const update = await fetch(`http://localhost:8080/animal/update/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'authorization': Cookies.get("token")
      },
      body: JSON.stringify({
        petName: petName,
        petBirth: birthDate,
        petEntry: entry,
        petGender: gender,
        petCharacteristics: {
          petType: animalType,
          petBreed: breed,
          petSize: size,
          petCastrated: castrated
        },
        petComorbidities: comorbidities,
        petObs: observations,
        petVaccCard: vacCard,
        petPicture: picture,
        company: Cookies.get("company"),
        petStatus: {
          petCurrentStatus: "",
          petOccurrencesQuantity: "",
          petLastOccurrence: ""
        }
      })
    });

    if(update.ok){
      toast.success(petName + " atualizado(a) com sucesso!");
      
    }

  }


  const handleDelete = async () => {
    const del = await fetch(`http://localhost:8080/animal/delete/${id}`, {
      method: "DELETE",
      headers: {
        'authorization': Cookies.get("token")
      }
    });

    if(del.ok){
      toast.success(petName + " deletado com sucesso, redirecionando...");
      setTimeout(() => {
        navigate('/petList'); 
      }, 1000); 
    }
  }


  const handleRotate = async () => {

    setLoading(true);

    const resposta = await fetch("http://localhost:8080/rotate", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'authorization': Cookies.get("token")
      },
      body: JSON.stringify({
          angle: angle,
          img_url: picture
      })
    });

    const dados = await resposta.json();

    setLoading(false);
    setPicture(() => dados.url)
  
  }


  const handleReport = async () => {

    setDesativado(true);
    setMensagem("Gerando relatorio, aguarde...")

    const report = await fetch(`http://localhost:8080/report/${id}`, {
      method: "GET",
      headers: {
        'authorization': Cookies.get("token")
      }
    });


    const blob = await report.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a')
    a.href = url;
    a.download = (petName + '-relatorio.pdf');
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

    setDesativado(false);
    setMensagem("");
  }


  if(loading){ 
    return (
      <div className="text-center">
        <br /><br /><br />
        <Spinner animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
      </div>
    );
  }


  return (
    <Container>
      <Toaster />
      <TituloPagina titulo={petName} />
      <br />
      <Form onSubmit={handleSubmit} style={{marginBottom: "20px"}}>
        <Row>

          <Col sm={4}>
            <Image src={picture} style={{objectFit: "cover", height: "450px", width: "450px", borderRadius: "10px", borderColor: "#ff0000"}} thumbnail  />
          </Col>

          <Col sm={4} style={{}}>

          <Form.Group controlId="formAngle" style={{marginBottom: "10px"}}>
                <Form.Label>Digite o angulo em graus para girar a imagem: </Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Angulo em graus"
                    name="angle"
                    value={angle}
                    onChange={(e) => setAngle(e.target.value)}
                    disabled={desativado}
                />
                
          </Form.Group>
          <Button onClick={handleRotate} disabled={desativado} >Rotacionar</Button>

          <Form.Group controlId='alertLevel' style={{marginTop: "10px"}}>
            {/* {deixar isso dinamico} */}
          <br />
            <div style={{display: "flex", width: "auto", height: "auto", backgroundColor: "", borderRadius: "20px", justifyContent: "space-between"}}> 
            <p><b>Nível do alerta: </b></p>    
                <div style={{ display: "flex", width: "290px", height: "25px", backgroundColor: "#ff0000", borderRadius: "20px", justifyContent: "center"}}> 
                <p style={{color: "#fff"}}>ESTADO CRÍTICO</p>
                </div>

                
            </div>
          </Form.Group>
         



          </Col>

          <Col sm={4}>
            <Image src={vacCard} style={{objectFit: "cover", height: "450px", width: "450px", borderRadius: "10px"}} thumbnail  />
          </Col>


          </Row>

          <Row>

          <Col sm={4}>
            <br />
          <Form.Group controlId="formName" style={{marginBottom: "20px"}}>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nome do animal"
                    name="name"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    disabled={desativado}
                />
            </Form.Group>
            <Form.Group controlId="formBirthDate" style={{marginBottom: "20px"}}>
                <Form.Label>Data de Nascimento</Form.Label>
                <Form.Control
                    type="date"
                    name="birthDate"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    disabled={desativado}
                />
            </Form.Group>
            <Form.Group controlId="formEntryDate" style={{marginBottom: "20px"}}>
                <Form.Label>Data de Entrada</Form.Label>
                <Form.Control
                    type="date"
                    name="entryDate"
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    disabled={desativado}
                />
            </Form.Group>
            <Form.Group controlId="formGender" style={{marginBottom: "20px"}}>
                <Form.Label>Gênero</Form.Label>
                <Form.Control
                    as="select"
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    disabled={desativado}
                >
                    <option value="Macho">Macho</option>
                    <option value="Fêmea">Fêmea</option>
                </Form.Control>
            </Form.Group>
          </Col>

          <Col sm={4}>
          <br />
          <Form.Group controlId="formSize" style={{marginBottom: "20px"}}>
                <Form.Label>Porte</Form.Label>
                <Form.Control
                    as="select"
                    name="animalSize"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    disabled={desativado}
                >
                    <option value="Pequeno">Pequeno</option>
                    <option value="Médio">Médio</option>
                    <option value="Grande">Grande</option>
                </Form.Control>
          </Form.Group>
          <Form.Group controlId="formComorbidities" style={{marginBottom: "20px"}}>
                <Form.Label>Comorbidades</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Comorbidades"
                    name="comorbidities"
                    value={comorbidities}
                    onChange={(e) => setComorbidities(e.target.value)}
                    disabled={desativado}
                />
          </Form.Group>
          <Form.Group controlId="formAnimalType" style={{marginBottom: "20px"}}>
                <Form.Label>Tipo do Animal</Form.Label>
                <Form.Control
                    as="select"
                    name="animalType"
                    value={animalType}
                    onChange={(e) => setAnimalType(e.target.value)}
                    disabled={desativado}
                >
                    <option>Selecione...</option>
                    <option value="Cachorro">Cachorro</option>
                    <option value="Gato">Gato</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formBreed" style={{marginBottom: "20px"}}>
                <Form.Label>Raça</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Raça do animal"
                    name="breed"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    disabled={desativado}
                />
            </Form.Group>


          </Col>
          
          
          <Col>
          <br />

          <Form.Group controlId="formCastrated" style={{marginBottom: "20px"}}>
                <Form.Label>Castrado?</Form.Label>
                <Form.Control
                    as="select"
                    name="castrated"
                    value={castrated}
                    onChange={(e) => setCastrated(e.target.value)}
                    disabled={desativado}
                >
                    <option>Selecione...</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formObservations" className="mb-3">
              <Form.Label>Observações</Form.Label>
              <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Observações"
                  name="observations"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  disabled={desativado}
              />
              </Form.Group>
              <ButtonGroup>
                <Button variant='warning' onClick={() => setDesativado(!desativado)} >{desativado ? "Habilitar" : "Desabilitar"} </Button>
                <Button type='submit' variant="success" style={{ marginLeft: "10px" }} disabled={desativado} >Atualizar </Button>
                <Button variant="danger" style={{ marginLeft: "10px" }} disabled={desativado} onClick={handleShow}>Excluir </Button>
                <Button variant='success' style={{marginLeft: "10px"}} onClick={handleReport} disabled={desativado}>Gerar relatorio</Button>
              </ButtonGroup>
              <p>{mensagem}</p>
          </Col>
          
        </Row>
        <Row>
          <br />
        
        </Row>
      </Form>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Excluir {petName}?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Confirme apenas se tiver certeza, essa acao nao podera ser desfeita!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleDelete}>Confirmar</Button>
        </Modal.Footer>
      </Modal>
      
    </Container>
  )

};

export default PetDetail;
