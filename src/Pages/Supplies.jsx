import React from 'react';
import Cookies from 'js-cookie';
import { getData } from '../Functions/Req';
import { Container } from 'react-bootstrap';


const Supplies = () => {
  
  const [teste, setTeste] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchData = async () => {
    setLoading(true);
    setTeste(await getData ("/animal/select-all/", Cookies.get("company"), Cookies.get("token")));
    setLoading(false);

  }

  React.useEffect(() => {
    fetchData();
  }, [])
  
  console.log(teste)

  if(loading){
    return(
    <Container>
      <p>Ta carregando</p>
    </Container>
    );
  }

  return (
    <Container>

      <p>carregou bem carregadinho</p>
    </Container>
  )
}


export default Supplies
