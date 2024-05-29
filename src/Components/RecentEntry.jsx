import { Card } from 'react-bootstrap';
import './AlertCard.css';

const RecentEntry = () => {
  return (
    <div>
      <Card className="alert-card mb-3">
      <div className="d-flex">
        <Card.Img variant="left" src="imgs/gato-persa-02-800x450.jpg" className="alert-card-img" />
        <Card.Body>
          <Card.Title>Nome</Card.Title>
          <Card.Text>Nivel do alerta</Card.Text>
        </Card.Body>
      </div>
    </Card>
    </div>
  )
}

export default RecentEntry
