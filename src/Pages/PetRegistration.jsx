import React from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import TituloPagina from '../Components/TituloPagina';
import { postDataFormData } from '../Functions/Req';

const PetRegistration = () => {

    const [petName, setPetName] = React.useState("");
    const [birthDate, setBirthDate] = React.useState("");
    const [entry, setEntry] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [animalType, setAnimalType] = React.useState("");
    const [breed, setBreed] = React.useState("");
    const [size, setSize] = React.useState("");
    const [castrated, setCastrated] = React.useState("");
    const [comorbidities, setComorbidities] = React.useState("");
    const [observations, setObservations] = React.useState("");

    document.title = "Cadastro de Pets";

    const [loading, setLoading] = React.useState(false);


    const [imgData, setImgData] = React.useState({
        vaccinationCard: null,
        petPhoto: null,
    });

    const [previewVaccinationCard, setPreviewVaccinationCard] = React.useState(null);
    const [previewPetPhoto, setPreviewPetPhoto] = React.useState(null);


    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setImgData({
        ...imgData,
        [name]: files[0],
    });
        if (name === 'vaccinationCard') {
        setPreviewVaccinationCard(URL.createObjectURL(files[0]));
        } 
        else if (name === 'petPhoto') {
        setPreviewPetPhoto(URL.createObjectURL(files[0]));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!petName || !birthDate || !entry || !gender || !animalType || !breed || !size || !comorbidities || !observations){
            toast.error("Preencha todos os campos!");
            return;
        }  

        setLoading(true);

        const formData = new FormData();
        formData.append("petName", petName);
        formData.append("petBirth", birthDate);
        formData.append("petEntry", entry);
        formData.append("petGender", gender);
        formData.append("petCharacteristics.petType", animalType);
        formData.append("petCharacteristics.petBreed", breed);
        formData.append("petCharacteristics.petSize", size);
        formData.append("petCharacteristics.petCastrated", castrated);
        formData.append("petComorbidities", comorbidities);
        formData.append("petObs", observations);
        formData.append("petVaccCard", imgData.vaccinationCard);
        formData.append("petPicture", imgData.petPhoto);
        formData.append("company", Cookies.get("company"));
        formData.append("petStatus.petCurrentStatus", "0");
        formData.append("petStatus.petOccurrencesQuantity", "");
        formData.append("petStatus.petLastOccurrence", "");


        await postDataFormData("/animal/create", formData, "Cadastrado com sucesso!")
        setLoading(false);
        clearFields();

    };

    const clearFields = () => {
        setPetName("");
        setBirthDate("");
        setEntry("");
        setGender("");
        setAnimalType("");
        setBreed("");
        setSize("");
        setComorbidities("");
        setObservations("");
        setCastrated("");
        setPreviewPetPhoto(null);
        setPreviewVaccinationCard(null);
    }

    
    //////adicionar icones nos itens
    return (
        <div className="container">
        <TituloPagina titulo="Cadastro de Animais" />
        <br />
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
            <Col sm={12} style={{marginBottom: "10px"}}>
                <Form.Group controlId="formName">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nome do animal"
                    name="name"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="formCastrated">
                <Form.Label>Castrado?</Form.Label>
                <Form.Control
                    as="select"
                    name="castrated"
                    value={castrated}
                    onChange={(e) => setCastrated(e.target.value)}
                >
                    <option>Selecione...</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                </Form.Control>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="formBirthDate">
                <Form.Label>Data de Nascimento</Form.Label>
                <Form.Control
                    type="date"
                    name="birthDate"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                />
                </Form.Group>
            </Col>
            </Row>

            <Row className="mb-3">
            <Col>
                <Form.Group controlId="formEntryDate">
                <Form.Label>Data de Entrada</Form.Label>
                <Form.Control
                    type="date"
                    name="entryDate"
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="formGender">
                <Form.Label>Gênero</Form.Label>
                <Form.Control
                    as="select"
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option>Selecione...</option>
                    <option value="Macho">Macho</option>
                    <option value="Fêmea">Fêmea</option>
                </Form.Control>
                </Form.Group>
            </Col>
            </Row>

            <Row className="mb-3">
            <Col>
                <Form.Group controlId="formAnimalType">
                <Form.Label>Tipo do Animal</Form.Label>
                <Form.Control
                    as="select"
                    name="animalType"
                    value={animalType}
                    onChange={(e) => setAnimalType(e.target.value)}
                >
                    <option>Selecione...</option>
                    <option value="Cachorro">Cachorro</option>
                    <option value="Gato">Gato</option>
                </Form.Control>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="formBreed">
                <Form.Label>Raça</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Raça do animal"
                    name="breed"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                />
                </Form.Group>
            </Col>
            </Row>

            <Row className="mb-3">
            <Col>
                <Form.Group controlId="formSize">
                <Form.Label>Porte</Form.Label>
                <Form.Control
                    as="select"
                    name="animalSize"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                >
                    <option>Selecione...</option>
                    <option value="Pequeno">Pequeno</option>
                    <option value="Médio">Médio</option>
                    <option value="Grande">Grande</option>
                </Form.Control>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="formComorbidities">
                <Form.Label>Comorbidades</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Comorbidades"
                    name="comorbidities"
                    value={comorbidities}
                    onChange={(e) => setComorbidities(e.target.value)}
                />
                </Form.Group>
            </Col>
            </Row>

            <Row className="mb-3">
            <Col>
                <Form.Group controlId="formVaccinationCard">
                <Form.Label>Cartão de Vacinação</Form.Label>
                <Form.Control
                    type="file"
                    name="vaccinationCard"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                {previewVaccinationCard && (
                    <div className="mt-2">
                    <img
                        src={previewVaccinationCard}
                        alt="Pré-visualização do cartão de vacinação"
                        className="img-thumbnail"
                        style={{ maxHeight: '200px' }}
                    />
                    </div>
                )}
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="formPetPhoto">
                <Form.Label>Foto do Pet</Form.Label>
                <Form.Control
                    type="file"
                    name="petPhoto"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                {previewPetPhoto && (
                    <div className="mt-2">
                    <img
                        src={previewPetPhoto}
                        alt="Pré-visualização da foto do pet"
                        className="img-thumbnail"
                        style={{ maxHeight: '200px' }}
                    />
                    </div>
                )}
                </Form.Group>
            </Col>
            </Row>

            <Form.Group controlId="formObservations" className="mb-3">
            <Form.Label>Observações</Form.Label>
            <Form.Control
                as="textarea"
                rows={3}
                placeholder="Observações"
                name="observations"
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
            />
            </Form.Group>

            <Button variant="primary" type="submit" style={{ backgroundColor: '#ff0000', borderColor: '#ff0000' }}>
            Cadastrar
            </Button>
            {loading && (
                <div className="text-center">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Carregando...</span>
                </Spinner>
                </div>
            )}
            <Toaster 
                position="top-right"
                reverseOrder={false}
            />
        </Form>
        <br /><br />
        </div>
    );
};

export default PetRegistration;
