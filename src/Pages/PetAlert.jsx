import React from 'react';
import Cookies from 'js-cookie';
import { Col, Container, Row } from 'react-bootstrap';

import { getData } from '../Functions/Req';
import Loading from '../Components/Loading';
import TituloPagina from '../Components/TituloPagina';
import PetCard from '../Components/PetCard';

const PetAlert = () => {

    const [loading, setLoading] = React.useState(true);

    const [petAlertData, setPetAlertData] = React.useState([]);

    const getAlertPets = async () => {
        setLoading(true);
            setPetAlertData(await getData(`/animal/select-all/${Cookies.get('company')}`, ""))
        setLoading(false);
    }

    React.useEffect(() => {
        getAlertPets();
    }, [])

    console.log(petAlertData)

    const filteredItems = petAlertData.filter(
		(item) =>
			item.petStatus.petCurrentStatus == 1 ||
			item.petStatus.petCurrentStatus == 2
	)

    console.log(filteredItems)


    return (
        <Container>
            <TituloPagina titulo="Pets em alerta!" />
            <Row style={{marginTop: "20px", marginBottom: "50px"}}>
            {!loading && filteredItems.length > 0 ? (
					filteredItems.map((item) => (
						<Col key={item._id}>
							<PetCard
								name={item.petName}
								img={item.petPicture}
								sexo={item.petGender == 'Fêmea' ? 'Fêmea' : 'Macho'}
								id={item._id}
								border={
									item.petStatus.petCurrentStatus == 1
										? 'warning'
										: item.petStatus.petCurrentStatus == 2
										? 'danger'
										: 'success'
								}
							/>
						</Col>
					))
				) : (
					<Col style={{ textAlign: 'center' }}>
						<p>Nenhum animal em perigo :D</p>
					</Col>
				)}

            </Row>
            <Row style={{marginTop: "20px", marginBottom: "50px"}}>
                {loading &&(
                    <Loading />
                )}
            </Row>
        </Container>
        )
    }

export default PetAlert
