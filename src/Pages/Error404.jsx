import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Error404.css'; // Para estilos personalizados

const Error404 = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1 className="display-1">404</h1>
          <p className="lead">Oops! A página que você está procurando não existe.</p>
          <Button variant="primary" onClick={handleGoHome}>
            Voltar para a Página Inicial
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Error404;
