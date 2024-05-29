import { Button, Card } from "react-bootstrap";


const PetCard = () => {
  return <>
    <Card border="danger" style={{ width: '18rem' }}>
      <Card.Img variant="top" src="imgs/gato-persa-02-800x450.jpg" style={{}}/>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>

        </Card.Text>
        <Button variant="danger" text="dark">Go somewhere</Button>
      </Card.Body>
    </Card>
    <br />
    </>
}

export default PetCard
