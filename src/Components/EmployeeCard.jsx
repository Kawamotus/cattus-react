import { Button, Card, ListGroup } from "react-bootstrap";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const EmployeeCard = ({ name, img, id, acessLevel }) => {

  const handleClick = () => {
    Cookies.set("petId", name);
  }

  return <>
    <Card style={{ width: '18rem' }} key={id}>
      <Card.Img variant="top" src={img} style={{objectFit: "cover", height: "300px"}}/>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{acessLevel}</Card.Text>
        <Link to={`/employeeDetail/${id}`} >
          <Button text="dark" onClick={handleClick} style={{backgroundColor: "#670000", border: 0}} className="btn">Ver detalhes</Button>
        </Link>
      </Card.Body>
    </Card>
    <br />
    </>

}

export default EmployeeCard
