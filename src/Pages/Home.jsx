import React from 'react'
import ChartBar from '../Components/Charts/ChartBar'
import ChartLine from '../Components/Charts/ChartLine'
import { Col, Container, Row } from 'react-bootstrap'
import ChartPie from '../Components/Charts/ChartPie'
import PetCard from '../Components/PetCard'
import RecentEntry from '../Components/RecentEntry'

const Home = () => {
  return (
    <Container fluid="lg">
      
      <Row>
          <Col><PetCard /></Col> 
          <Col><PetCard /></Col>
          <Col><PetCard /></Col>
          <Col><PetCard /></Col>    
      </Row>
      <Row style={{}}>
        <Col sm={8}>
          <ChartBar /><br />
          <ChartLine /><br />
          <ChartPie /><br />
        </Col>
        <Col sm={4} >
          <h2 className="text-center mt-5">Lista de Alertas</h2>
          <div className="container mt-3">
            <RecentEntry
              foto="https://via.placeholder.com/100"
              nome="Alerta 1"
              nivelAlerta="Alto"
            />
            <RecentEntry
              foto="https://via.placeholder.com/100"
              nome="Alerta 2"
              nivelAlerta="Médio"
            />
            <RecentEntry
              foto="https://via.placeholder.com/100"
              nome="Alerta 3"
              nivelAlerta="Baixo"
            />
      </div>
        </Col>
      </Row>

    </Container>
  )
}

export default Home
