import { Card } from 'react-bootstrap';
import './AlertCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';

const RecentEntry = ({name, sexo, img, id}) => {
  return (
    <>
      <Card className="alert-card mb-3" key={id}>
      <div className="d-flex">
        <Card.Img variant="left" src={img} className="alert-card-img" />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text><FontAwesomeIcon icon={sexo == "Fêmea" ? faVenus : faMars} /> {sexo}</Card.Text>
        </Card.Body>
      </div>
    </Card>
    </>
  )
}

export default RecentEntry
