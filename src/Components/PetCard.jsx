import { Button, Card } from "react-bootstrap";
import Cookies from "js-cookie";

const PetCard = ({border, name, img, id}) => {

  const handleClick = () => {
    Cookies.set("petId", name);
  }


  return <>
    <Card border="" style={{ width: '18rem' }} key={id}>
      <Card.Img variant="top" src={img} style={{}}/>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>

        </Card.Text>
        <Button variant="danger" text="dark" onClick={handleClick}>Go somewhere</Button>
      </Card.Body>
    </Card>
    <br />
    </>

}

export default PetCard
