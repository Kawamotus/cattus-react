import React from 'react';
import { Container, Row, Col, Spinner, Card, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import TituloPagina from '../Components/TituloPagina'

const CameraList = () => {

  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false)

  document.title = "Cameras";

  const fetchData = async () => {

    setLoading(true);

    const response = await fetch(`http://localhost:8080/camera/select-all/${Cookies.get("company")}`, {
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

    setItems(data.result)


    setLoading(false);
    console.log(data);

  }

  React.useEffect(() => {
    fetchData();
  }, [])

  if(loading){
    return (
      <div className="text-center">
        <br /><br /><br />
        <Spinner animation="border" role="status">
          <span className="sr-only"></span>
        </Spinner>
      </div>
    )
  }

  return (
    <Container>
      <TituloPagina titulo="Câmeras" />
      <br />
      <Row style={{justifyContent: "center"}}>
        
        
        {items.map(item => (
            <Col key={item._id} sm={6}>

              <Card style={{ marginTop: "10px", marginBottom: "10px"}}>
                <Card.Img variant="top" src={item.cameraPicture} style={{objectFit: "cover", height: "372px"}} />
                <Card.Body>
                  <Card.Text style={{paddingBottom: "15px"}}>
                    <Link to={`/cameraDetail/${item._id}`}> 
                      <Button style={{width: "100%", backgroundColor: "#670000", border: "#670000"}}> {item.cameraLocation} <FontAwesomeIcon icon={faArrowRight} /> </Button>
                    </Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
        ))}
        
      </Row>


    </Container>
  )
}

export default CameraList
