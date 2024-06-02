import { Button, Card, ListGroup } from "react-bootstrap";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons';

const PetCard = ({border, name, img, id, sexo}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    //navigate("/" + id);
  }

  return <>
    <Card border="" style={{ width: '18rem' }} key={id}>
      <Card.Img variant="top" src={img} style={{objectFit: "cover", height: "300px"}}/>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text><FontAwesomeIcon icon={sexo == "Fêmea" ? faVenus : faMars} /> {sexo}</Card.Text>
        <Button variant="danger" text="dark" onClick={handleClick}>Ver detalhes</Button>
      </Card.Body>
    </Card>
    <br />
    </>

}

export default PetCard
