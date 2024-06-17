import React from 'react';
import { Col, Container, Row, Spinner, Form, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';

import TituloPagina from '../Components/TituloPagina';
import EmployeeCard from '../Components/EmployeeCard';

const EmployeeList = () => {
    document.title = "Lista de Funcionarios";

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
        const response = await fetch(`http://localhost:8080/employee/select-all/${Cookies.get("company")}?skip=${skip}&limit=${limit}`, {
          method: "GET",
          headers: {
            'authorization': Cookies.get("token")
          }
        });
  
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
  
    console.log(items);
  
    return (
      <Container>
        <TituloPagina titulo="Lista de Funcionarios" />
        <br />
        <Row>
          {items.map((item, index) => {
            if (items.length === index + 1) {
              return (
                <Col key={item._id}  ref={lastItemRef}>
                  <EmployeeCard name={item.employeeName} img={item.employeePicture} acessLevel={item.employeeAccessLevel == 1 ? "Administrador" : "Usuario comum"} id={item._id} />
                </Col>
              );
            } else {
              return (
                <Col key={item._id}>
                  <EmployeeCard name={item.employeeName} img={item.employeePicture} acessLevel={item.employeeAccessLevel == 1 ? "Administrador" : "Usuario comum"} id={item._id} />
                </Col>
              );
            }
          })}
        </Row>
        {/* fazer um componente disso aqq */}
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

export default EmployeeList;