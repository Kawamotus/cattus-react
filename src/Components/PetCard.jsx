import { Button, Card, ListGroup } from "react-bootstrap";
import Cookies from "js-cookie";

const PetCard = ({border, name, img, id}) => {

  const handleClick = () => {
    Cookies.set("petId", name);
  }


  return <>
    <Card border="" style={{ width: '18rem' }} key={id}>
      <Card.Img variant="top" src={img} style={{objectFit: "cover", height: "300px"}}/>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        
        <Button variant="danger" text="dark" onClick={handleClick}>Ver detalhes</Button>
      </Card.Body>
    </Card>
    <br />
    </>

}

export default PetCard
