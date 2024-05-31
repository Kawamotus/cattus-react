import React from 'react'
import PetCard from '../Components/PetCard';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import Cookies from 'js-cookie';



const PetList = () => {

  document.title = "Lista de Pets";

  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [cut, setCut] = React.useState(2);
  
  // addEventListener("scroll", (event) => {
  //   console.log(event);
  // });

  React.useEffect(() => { 

    async function getData(){
        
        setLoading(true);

        const petList = await fetch(`http://localhost:8080/animal/select-all/${Cookies.get("company")}`, {
          method: "GET",
          headers: {
              'authorization': Cookies.get("token")
          }
        });

        const data = await petList.json();
        setItems(data);
        setLoading(false);
      
    }

    getData();

  }, []);


  React.useEffect(() => {
    // Função para verificar se o usuário chegou ao final da página
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log('Você chegou ao final da página');
        // Adicione sua lógica aqui, por exemplo, carregar mais itens
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Limpeza do ouvinte de evento ao desmontar o componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

    setCut(cut + 2);
  }, []);



  console.log(items.result);

  if(loading){
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }


  //passo o parametro por cookie?
  if(items.result != 0){
  //mexer com o slice, fazer um scroll infinito
    return (
    
      <Container>
        <Row>

           {items.result.slice(0, cut).map(item => (
              <Col>
                <PetCard name={item.petName} img={item.petPicture} key={item._id}/>
              </Col>
            ))}   
  
        </Row>
      </Container>
    );

  }

  return (
    <Container style={{textAlign: "center"}}>
      <h1>Nenhum resultado encontrado </h1>
    </Container>
  );
  
}

export default PetList
