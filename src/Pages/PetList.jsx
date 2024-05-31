import React from 'react'
import PetCard from '../Components/PetCard';
import { Col, Container, Row, Spinner, Form, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';



const PetList = () => {

  document.title = "Lista de Pets";

  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [filter, setFilter] = React.useState("");
  const [search, setSearch] = React.useState("");
  

  const fetchData = async (page) =>{
    setLoading(true);
    try{

        const response = await fetch(`http://localhost:8080/animal/select-all/${Cookies.get("company")}`, {
          method: "GET",
          headers: {
              'authorization': Cookies.get("token")
          }
        });


        if(!response.ok){
          throw new Error("Estamos enfrentando alguns problemas, tente novamente mais tarde")
        }
  
        const data = await response.json();
        setItems(() => [...items, ...data.result]);


      
    }catch(err){
      setError(err);
    }finally{
      setLoading(false);
    }

  }

  React.useEffect(() => {
    fetchData(page);
  }, [page]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading && hasMore) {
        setPage(() => page + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [loading, hasMore]);




  if(error){
    return (
      <Container className="text-center mt-5">
        <p>Erro: {error.message}</p>
      </Container>
    );
  }

  return (

    <Container>

      <h1>Barra de Pesquisa com Filtros</h1>
      <Form>
        <Form.Group>
          <Form.Control type="text" placeholder="Pesquisar..." value={search} onChange={(e) => {
            setSearch(e.target.value)
            fetchData()
            }} />
            <p>{search}</p>
        </Form.Group>
        <Form.Group>
          <Form.Control as="select" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">Todos</option>
            <option value="filtro1">Filtro 1</option>
            <option value="filtro2">Filtro 2</option>
            <option value="filtro3">Filtro 3</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={fetchData}>Pesquisar</Button>
      </Form>
        <br />
      <Row>

          {items.map(item => (
            <Col>
              <PetCard name={item.petName} img={item.petPicture} key={item._id}/>
            </Col>
          ))}   

      </Row>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Carregando...</span>
          </Spinner>
        </div>
      )}

      {!hasMore && !loading && (
        <div className="text-center">
          <p>Não há mais itens para carregar.</p>
        </div>
      )}

    </Container>
    
  );


}

export default PetList
