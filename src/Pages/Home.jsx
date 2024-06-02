import React from 'react'
import ChartBar from '../Components/Charts/ChartBar'
import ChartLine from '../Components/Charts/ChartLine'
import { Col, Container, Row } from 'react-bootstrap'
import ChartPie from '../Components/Charts/ChartPie'
import PetCard from '../Components/PetCard'
import RecentEntry from '../Components/RecentEntry'
import TituloPagina from '../Components/TituloPagina'
import ChartDoughnut from '../Components/Charts/ChartDoughnut'

const Home = () => {

  const dogActivitiesData = [9, 15];
  const catActivitiesData = [16, 8]

  return (
    
    <Container fluid="lg">
      <TituloPagina titulo="Pets que precisam de sua atencao: " />
      <br />
      <Row>
          
          <Col><PetCard /></Col> 
          <Col><PetCard /></Col>
          <Col><PetCard /></Col>
          <Col><PetCard /></Col>  
      </Row>
      <br />
      <br />
      <Row style={{}}>
        <Col sm={4}>
          {/* <ChartBar /><br />
          <ChartLine /><br />
          <ChartPie /><br /> */}
          {/* <ChartDoughnut titulo="Media de atividade dos Gatos" dataArray={[10, 8]}/> <br /> */}
          <ChartDoughnut data={dogActivitiesData} titulo="Tempo de atividade (media) - Caes" /> <br />
        </Col>
        <Col sm={4}>
          <ChartDoughnut data={catActivitiesData} titulo="Tempo de atividade (media) - Gatos" /> <br />
        </Col>
        <Col sm={4} >
          <h2 className="text-center mt-5">Adicionados recentemente</h2>
          <div className="container mt-3">
            <RecentEntry />
            <RecentEntry />
            <RecentEntry />
      </div>
        </Col>
      </Row>

    </Container>
  )
}

export default Home
