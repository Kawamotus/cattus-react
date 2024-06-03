import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Cookies from 'js-cookie';
import TituloPagina from '../Components/TituloPagina';
import RecentEntry from '../Components/RecentEntry';

const CameraDetail = () => {

    const [loading, setLoading] = React.useState(false);
    const [items, setItems] = React.useState([]);

    async function fetchData(){

        

        document.title = "Camera"

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
        fetchData()
    }, []);




  return (
    <Container>

        {loading && 
        <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Carregando...</span>
        </Spinner>
        </div>}

        <TituloPagina titulo="Camera de seguranca" />
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
    </Container>
  )
}

export default CameraDetail
