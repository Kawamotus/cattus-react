import React from 'react';
import PetCard from '../Components/PetCard';
import { Col, Container, Row, Spinner, Form, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';

const PetList = () => {
  document.title = "Lista de Pets";

  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [skip, setSkip] = React.useState(0);
  const [limit, setLimit] = React.useState(4);
  const [hasMore, setHasMore] = React.useState(true);
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

      console.log(response.status)

      if(response.status === 500){
        throw new Error("Sessao expirada, refaca o login para acessar!");

      }

      if (!response.ok) {
        throw new Error("Estamos enfrentando alguns problemas, tente novamente mais tarde");
      }

      const data = await response.json();
      console.log('Fetched Data:', data);
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


  return (
    <Container>
      <h1>Lista de Pets</h1>
      <Row>
        {items.map((item, index) => {
          if (items.length === index + 1) {
            return (
              <Col key={item._id}  ref={lastItemRef}>
                <PetCard name={item.petName} img={item.petPicture} />
              </Col>
            );
          } else {
            return (
              <Col key={item._id}>
                <PetCard name={item.petName} img={item.petPicture}  />
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