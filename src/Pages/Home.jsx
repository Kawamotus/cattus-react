import React from 'react'
import ChartBar from '../Components/Charts/ChartBar'
import ChartLine from '../Components/Charts/ChartLine'
import { Col, Container, Row } from 'react-bootstrap'
import ChartPie from '../Components/Charts/ChartPie'
import PetCard from '../Components/PetCard'

const Home = () => {
  return (
    <Container>
      <Row>
        <PetCard/>
      </Row>
      <Row style={{alignItems: "center"}}>
        <Col><ChartBar /></Col>
        <Col><ChartLine /></Col>
        <Col><ChartPie /></Col>
      </Row>

    </Container>
  )
}

export default Home
