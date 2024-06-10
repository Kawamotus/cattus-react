import React from 'react';
import Cookies from 'js-cookie';
import { getData } from '../Functions/Req';
import { Container, Row, Col } from 'react-bootstrap';
import StockCard from '../Components/StockCard';
import Loading from '../Components/Loading';
import TituloPagina from '../Components/TituloPagina';


const Supplies = () => {
  
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchData = async () => {
    setLoading(true);
    setData(await getData ("/stock/select-all/", Cookies.get("company")));
    setLoading(false);

  }

  React.useEffect(() => {
    fetchData();
  }, [])

  console.log(data)
  

  if(loading){
    return(
      <Loading />
    );
  }

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <TituloPagina titulo="Estoques" />
        </Col>
      </Row>
      <Row>
        
        {!loading && 
        data.map(item => (
          <Col key={item._id} sm={6}>
            <StockCard titulo={item.stockProduct} limite={item.stockCapacity} qtdAtual={item.stockAmount} gasto={item.stockSpendByDay}/>
          </Col>
        ))}
        
      </Row>
    </Container>
  );
}


export default Supplies
