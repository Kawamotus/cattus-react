import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';

const PetCard = ({border, name, img, id, sexo}) => {



  return <>
    <Card border={border == 1 ? "warning" : border === 2 ? "danger" : "success"} style={{ width: '18rem' }} key={id}>
      <Card.Img variant="top" src={img} style={{objectFit: "cover", height: "300px"}}/>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text><FontAwesomeIcon icon={sexo == "Fêmea" ? faVenus : faMars} /> {sexo}</Card.Text>
        <Link to={`/petDetail/${id}`}> 
          <Button variant="danger" text="dark">Ver detalhes</Button>
        </Link>
      </Card.Body>
    </Card>
    <br />
    </>

}

export default PetCard
