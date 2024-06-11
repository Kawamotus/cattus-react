import React from 'react';
import { Container, Row, Col, Spinner, Table } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import TituloPagina from '../Components/TituloPagina';
import RecentEntry from '../Components/RecentEntry';

const CameraDetail = () => {

    const [loading, setLoading] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const [cameraItems, setCameraItems] = React.useState([]);
    const {id} = useParams();
    

    async function fetchData(){

        setLoading(true);
        

        const response = await fetch(`http://localhost:8080/animal/select-all/${Cookies.get("company")}`, {
            method: "GET",
            headers: {
                'authorization': Cookies.get("token")
            }
            });

            if(response.status === 500){
            throw new Error("Sessao expirada, refaca o login para acessar!");

            }
            if(response.status === 401){
                throw new Error("Acesso nao autorizado, tente novamente mais tarde!");
    
                }

            if (!response.ok) {
            throw new Error("Estamos enfrentando alguns problemas, tente novamente mais tarde");
            }

            const data = await response.json();

            setItems(data.result);



            setLoading(false);
    }

    React.useEffect(() => {
        fetchData();
        fetchCamera();
    }, []);

    const fetchCamera = async () => {
        setLoading(true);

        const response = await fetch(`http://localhost:8080/camera/select-one/${id}`, {
            method: "GET",
            headers: {
                'authorization': Cookies.get("token")
            }
        });

        if(response.status === 500){
            throw new Error("Sessao expirada, refaca o login para acessar!");

        }
        if(response.status === 401){
            throw new Error("Acesso nao autorizado, tente novamente mais tarde!");

            }

        if (!response.ok) {
        throw new Error("Estamos enfrentando alguns problemas, tente novamente mais tarde");
        }

        const data = await response.json();
        
        setCameraItems(() => data.result);
        
        document.title = data.result.cameraLocation;
        setLoading(false);

    }


    console.log(cameraItems);

  return (
    <Container>

        {loading && 
        <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Carregando...</span>
        </Spinner>
        </div>}

        <TituloPagina titulo={cameraItems.cameraLocation} />
        <br /><br />
        <Row>

            <Col sm={8}>
                <video className="w-100" autoPlay loop muted>
                <source
                    src="https://mdbootstrap.com/img/video/animation-intro.mp4"
                    type="video/mp4"
                    allowFullScreen
                />
                </video>
            </Col>
            <Col sm={4}>
                <h2>Animais avistados</h2>
                {items.slice(2, 5).map(item => (
                    <RecentEntry name={item.petName} img={item.petPicture} sexo={item.petGender == "Fêmea" ? "Fêmea" : "Macho"} key={item._id} />
                ))}
            </Col>
        </Row>
        <Row>
            <Col style={{marginTop: "25px"}}>
                <Table hover variant="light">
                    <thead>
                        <th>#</th>
                        <th>Dados da câmera</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Descrição: </td>
                            <td>{cameraItems.cameraDescription}</td>
                        </tr>
                        <tr>
                            <td>Localização: </td>
                            <td>{cameraItems.cameraLocation}</td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>
    </Container>
  )
}

export default CameraDetail
