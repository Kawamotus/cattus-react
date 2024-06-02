import React from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import Cookies from 'js-cookie';

import PetCard from '../Components/PetCard'
import RecentEntry from '../Components/RecentEntry'
import TituloPagina from '../Components/TituloPagina'
import ChartDoughnut from '../Components/Charts/ChartDoughnut'

const Home = () => {

  document.title = "Cattus"

  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

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

      if (!response.ok) {
        throw new Error("Estamos enfrentando alguns problemas, tente novamente mais tarde");
      }

      const data = await response.json();

      setItems(data.result);
      console.log(data);

      setLoading(false);
  }

  React.useEffect(() => {
    fetchData()
  }, [])
  

  const dogActivitiesData = [9, 15];
  const catActivitiesData = [16, 8];

  console.log(items)

  ///////////////////         DAR UM JEITO DE ARRUMAR O PETS EM ALERTA PARA ALERTAS!!!
  return (
    
    <Container fluid="lg">
      <TituloPagina titulo="Pets que precisam de sua atencao: " />
      <br />
      <Row>
        {loading && 
        <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Carregando...</span>
        </Spinner>
        </div>}          
          {items.slice(0, 4).map(item => (
            <Col key={item._id}>
              <PetCard name={item.petName} img={item.petPicture} sexo={item.petGender == "Fêmea" ? "Fêmea" : "Macho"}/>
            </Col>
          ))}
      </Row>
      <br />
      <br />
      <Row>
        <Col sm={4}>
          <ChartDoughnut data={dogActivitiesData} titulo="Tempo de atividade (media) - Caes" /> <br />
        </Col>
        <Col sm={4}>
          <ChartDoughnut data={catActivitiesData} titulo="Tempo de atividade (media) - Gatos" /> <br />
        </Col>
        <Col sm={4} >
          <h2 className="text-center mt-5">Adicionados recentemente</h2>
          <div className="container mt-3">
            {items.slice(4, 8).map(item => (
              <RecentEntry name={item.petName} img={item.petPicture} sexo={item.petGender == "Fêmea" ? "Fêmea" : "Macho"} />
            ))}
            
      </div>
        </Col>
      </Row>

    </Container>
  )
}

export default Home
