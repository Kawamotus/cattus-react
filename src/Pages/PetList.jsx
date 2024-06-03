import React from 'react';
import PetCard from '../Components/PetCard';
import { Col, Container, Row, Spinner, Form, Button, InputGroup } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import TituloPagina from '../Components/TituloPagina';



const PetList = () => {
  document.title = "Lista de Pets";

  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [skip, setSkip] = React.useState(0);
  const [limit, setLimit] = React.useState(4);
  const [hasMore, setHasMore] = React.useState(true);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterType, setFilterType] = React.useState('');

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
        throw new Error("Sessao expirada, refaca o login para acessar!");

      }

      if (!response.ok) {
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

  const searchPets = async (query, age, type) => {
    let searchUrl = `http://localhost:8080/pets/search?query=${query}`;
    if (age) searchUrl += `&age=${age}`;
    if (type) searchUrl += `&type=${type}`;

    setLoading(true);
    try {
      const response = await fetch(searchUrl, {
        method: 'GET',
        headers: {
          'authorization': Cookies.get("token")
        }
      });
      const data = await response.json();
      setPets(data);
    } catch (error) {
      console.error('Erro ao buscar pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchPets(searchQuery, filterAge, filterType);
  };

  console.log(items)

  return (
    <Container>
      
      <Row className="mb-3" >
        <Col md={4}>
          <h1 style={{marginTop: "10px"}} >Lista de Pets</h1>
        </Col>
        <Col md={4} style={{marginTop: "20px"}}>
          <Form.Group controlId="filterType">
            <Form.Control
              as="select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">--</option>
              <option value="dog">Cachorro</option>
              <option value="cat">Gato</option>
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
            <Button variant="outline-secondary">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </InputGroup>
        </Col>
        
      </Row>
       
   
      
      {/* <Form className="mb-4">
        <Row>
          <Col md={4}>
            <Form.Group controlId="filterAge">
              <Form.Label>Gênero</Form.Label>
              <Form.Control
                as="select"
                value={filterAge}
                onChange={(e) => setFilterAge(e.target.value)}
              >
                <option value="">-- </option>
                <option value="puppy">Filhote</option>
                <option value="adult">Adulto</option>
                <option value="senior">Sênior</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="filterType">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                as="select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="">--</option>
                <option value="dog">Cachorro</option>
                <option value="cat">Gato</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="filterCastrated">
              <Form.Label>Castrado?</Form.Label>
              <Form.Control
                as="select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="">--</option>
                <option value="dog">Cachorro</option>
                <option value="cat">Gato</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form> */}

      <Row>
        {items.map((item, index) => {
          if (items.length === index + 1) {
            return (
              <Col key={item._id}  ref={lastItemRef}>
                <PetCard name={item.petName} img={item.petPicture} sexo={item.petGender == "Fêmea" ? "Fêmea" : "Macho"} id={item._id}/>
              </Col>
            );
          } else {
            return (
              <Col key={item._id}>
                <PetCard name={item.petName} img={item.petPicture} sexo={item.petGender == "Fêmea" ? "Fêmea" : "Macho"} id={item._id}/>
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