import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { getData } from '../Functions/Req';
import TituloPagina from '../Components/TituloPagina';
import ChartBar from '../Components/Charts/ChartBar';
import Loading from '../Components/Loading';
import ChartDoughnut from '../Components/Charts/ChartDoughnut';
import ChartDoughnutTotalAnimals from '../Components/Charts/ChartDoughnutTotalAnimals';

const Activities = () => {

    const [loading, setLoading] = React.useState(true);

    const [activities, setActivities] = React.useState([]);
    const [sick, setSick] = React.useState([]);
    const [total, setTotal] = React.useState([]);

    const getChartsData = async () => {
        setLoading(true);
            setActivities(await getData(`/activity/charts/average-animal-activity/all`, ""));
            setSick(await getData(`/animal/charts/sick-animals`, ""));
            setTotal(await getData(`/animal/charts/total-animals`, ""));
        setLoading(false);
    }

    React.useEffect(() => {
        getChartsData();
    }, [])
    console.log(loading)
    console.log(total);

    return (
        <Container>
            <TituloPagina titulo="Atividades dos Pets" />
            <br />
            {!loading &&  (
            <Row>
                <Col sm={6}>
                    <ChartBar 
                        data={activities['gatos']} 
                        titulo="Média do tempo de atividades - Gatos" 
                    />
                </Col>
                <Col sm={6}>
                    <ChartBar 
                        data={activities['cachorros']} 
                        titulo="Média do tempo de atividades - Cães" 
                    />
                </Col>
                <br />
                <Col sm={6}>
                    <ChartDoughnut data={sick['gatos']} titulo={'Alertas - Gatos'} />
                </Col>
                <Col sm={6}>
                    <ChartDoughnut data={sick['cachorros']} titulo={'Alertas - Cães'} />
                </Col>
                <br />
                <Col sm={6}>
                    <ChartDoughnutTotalAnimals 
                        data={total}
						titulo={'Quantidade total de animais'} 
                    />
                </Col>
            </Row>
            )}
            <Row>
                {loading &&(
                    <Loading />
                )}
            </Row>
        </Container>
    )
}

export default Activities
