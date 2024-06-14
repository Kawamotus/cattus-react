import React from 'react';
import PetCard from '../Components/PetCard';
import { Col, Container, Row, Spinner, Form, InputGroup } from 'react-bootstrap';
import Cookies from 'js-cookie';


const PetList = () => {

  document.title = "Lista de Pets";

  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [skip, setSkip] = React.useState(0);
  const limit = 4;
  const [hasMore, setHasMore] = React.useState(true);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterType, setFilterType] = React.useState(["petName"]);

  const observer = React.useRef();

  const fetchData = async (skip, limit) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/animal/select-all/${Cookies.get("company")}?skip=${skip}&limit=${limit}`, {
        method: "GET",
        headers: {
          'authorization': Cookies.get("token")
        }
      });

      if(response.status === 500){
        throw new Error("Erro interno, tente novamente mais tarde!");
      }

      if (!response.ok) {
        console.log(response)
        throw new Error("Estamos enfrentando alguns problemas, tente novamente mais tarde");
      }

      const data = await response.json();
      setItems((prevItems) => [...prevItems, ...data.result]);
      setHasMore(data.result.length === limit);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData(skip, limit);
  }, [skip, limit]);

  const lastItemRef = React.useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setSkip((prevSkip) => prevSkip + limit);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, limit]);

  if (error) {
    return (
      <Container className="text-center mt-5">
        <p>Erro: {error.message}</p>
      </Container>
    );
  }

  const handleSearchSubmit = async (e) => {

    e.preventDefault();
    setSearchQuery(e.target.value);
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/animal/search/`, {
        method: 'POST',
        headers: {
          'authorization': Cookies.get("token"),
          'Content-Type': "application/json"
        }, 
        body: JSON.stringify({
          query: searchQuery,
          fields: filterType
        })
      });

      const data = await response.json();
      
      setItems(data);

    } catch (error) {
      console.error('Erro ao buscar pets:', error);
    } finally {
      setLoading(false);
    }

    if(e.target.value === ""){
      setItems(() => []);  
      setSkip(() => 0);
      fetchData(skip, limit);
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    switch (value) {
      case 'type':
        setFilterType([["petCharacteristics", "petType"]]);
        break;
      case 'breed':
        setFilterType([["petCharacteristics", "petBreed"]]);
        break;
      case 'castrated':
        setFilterType([["petCharacteristics", "petCastrated"]]);
        break;
      case 'name':
        setFilterType(["petName"]);
        break;
      default:
        setFilterType([]);
    }
  }

  return (
    <Container>
      
      <Row className="mb-3" >
        <Col md={4}>
          <h1 style={{marginTop: "10px"}} >Lista de Pets</h1>
        </Col>
        <Col md={4} style={{marginTop: "20px"}}>
          <Form.Group controlId="filtro">
            <Form.Control
              as="select" 
              onChange={handleFilterChange}
            >
              <option value="name" >Nome do pet</option>
              <option value="type">Tipo do pet</option>
              <option value="breed" >Raça</option>
              <option value="castrated">Castrado?</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={4} style={{marginTop: "20px"}}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Pesquisar..."
              value={searchQuery}
              onChange={handleSearchSubmit}
            />
          </InputGroup>
        </Col>
        
      </Row>

      <Row>
        {
        items.map((item, index) => {
          if (items.length === index + 1) {
            return (
              <Col key={item._id}  ref={lastItemRef}>
                <PetCard name={item.petName} img={item.petPicture} sexo={item.petGender == "Fêmea" ? "Fêmea" : "Macho"} id={item._id} border={item.petStatus.petCurrentStatus == 1 ? "warning" : item.petStatus.petCurrentStatus == 2 ? "danger" : "success"}/>
              </Col>
            );
          } else {
            return (
              <Col key={item._id}>
                <PetCard name={item.petName} img={item.petPicture} sexo={item.petGender == "Fêmea" ? "Fêmea" : "Macho"} id={item._id} border={item.petStatus.petCurrentStatus == 1 ? "warning" : item.petStatus.petCurrentStatus == 2 ? "danger" : "success"} />
              </Col>
            );
          }
        })}
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
};

export default PetList;
