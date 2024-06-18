import React from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import Cookies from 'js-cookie'
import toast, { Toaster } from 'react-hot-toast'

import PetCard from '../Components/PetCard'
import RecentEntry from '../Components/RecentEntry'
import TituloPagina from '../Components/TituloPagina'
import ChartDoughnut from '../Components/Charts/ChartDoughnut'
import ChartDoughnutTotalAnimals from '../Components/Charts/ChartDoughnutTotalAnimals'
import ChartBar from '../Components/Charts/ChartBar'

const Home = () => {
	document.title = 'Cattus'

	const [items, setItems] = React.useState([])
	const [dogActivitiesData, setChartsDogActivities] = React.useState([])
	const [catActivitiesData, setChartsCatActivities] = React.useState([])
	const [dogSickData, setChartsDogSick] = React.useState([])
	const [catSickData, setChartsCatSick] = React.useState([])
	const [totalAnimalsData, setChartsTotalAnimals] = React.useState([])
	const [loading, setLoading] = React.useState(false)
	const [error, setError] = React.useState(null) //ver isso
	const [notification, setNotification] = React.useState([]) //ver isso

	async function fetchData() {
		setLoading(true)

		const response = await fetch(
			`http://localhost:8080/animal/select-all/${Cookies.get('company')}`,
			{
				method: 'GET',
				headers: {
					authorization: Cookies.get('token'),
				},
			}
		)

		if (response.status === 500) {
			throw new Error('Sessao expirada, refaca o login para acessar!')
		}

		if (!response.ok) {
			throw new Error(
				'Estamos enfrentando alguns problemas, tente novamente mais tarde'
			)
		}

		const data = await response.json()

		fetchChartsActivities()
		fetchChartsSick()
		fetchChartsTotal()
		setItems(data.result)
		setLoading(false)
	}

	async function fetchChartsActivities() {
		const response = await fetch(
			`http://localhost:8080/activity/charts/average-animal-activity/all`,
			{
				method: 'GET',
				headers: {
					authorization: Cookies.get('token'),
				},
			}
		)

		if (response.status === 401) {
			throw new Error('Sessao expirada, refaca o login para acessar!')
		}

		if (!response.ok) {
			throw new Error(
				'Estamos enfrentando alguns problemas, tente novamente mais tarde'
			)
		}

		const data = await response.json()
		setChartsDogActivities(data.result['cachorros'])
		setChartsCatActivities(data.result['gatos'])

		console.log(data.result)
	}

	async function fetchChartsSick() {
		const response = await fetch(
			`http://localhost:8080/animal/charts/sick-animals`,
			{
				method: 'GET',
				headers: {
					authorization: Cookies.get('token'),
				},
			}
		)

		if (response.status === 401) {
			throw new Error('Sessao expirada, refaca o login para acessar!')
		}

		if (!response.ok) {
			throw new Error(
				'Estamos enfrentando alguns problemas, tente novamente mais tarde'
			)
		}

		const data = await response.json()
		setChartsCatSick(data.result['cachorros'])
		setChartsDogSick(data.result['gatos'])
	}

	async function fetchChartsTotal() {
		const response = await fetch(
			`http://localhost:8080/animal/charts/total-animals`,
			{
				method: 'GET',
				headers: {
					authorization: Cookies.get('token'),
				},
			}
		)

		if (response.status === 401) {
			throw new Error('Sessao expirada, refaca o login para acessar!')
		}

		if (!response.ok) {
			throw new Error(
				'Estamos enfrentando alguns problemas, tente novamente mais tarde'
			)
		}

		const data = await response.json()
		setChartsTotalAnimals(data.result)
	}

  React.useEffect(() => {
		fetchData()
	}, [])

	const filteredItems = items.filter(
		(item) =>
			item.petStatus.petCurrentStatus == 1 ||
			item.petStatus.petCurrentStatus == 2
	)

	return (
		<Container fluid="lg" style={{marginBottom: "50px"}}>
			<Toaster />
			<TituloPagina titulo="Pets que precisam de sua atenção: " />
			<br />
			<Row>
				{loading && (
					<div className="text-center">
						<Spinner animation="border" role="status">
							<span className="sr-only">Carregando...</span>
						</Spinner>
					</div>
				)}
				{!loading && filteredItems.length > 0 ? (
					filteredItems.slice(0, 4).map((item) => (
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
			<br />
			<br />
			<Row>
				<Col sm={8}>
				<br />
				<br />
					<ChartBar
						data={dogActivitiesData}
						titulo={'Média tempo de atividade (em minutos)  - Cães'}
					/>
					{/* <ChartDoughnut data={dogSickData} titulo={'Alertas - Cachorros'} /> */}
				</Col>
				
				<Col sm={4}>
					<h2 className="text-center mt-5">Adicionados recentemente</h2>
					<div className="container mt-3">
						{items.slice(items.length - 4, items.length).map((item) => (
							<RecentEntry
								name={item.petName}
								img={item.petPicture}
								sexo={item.petGender == 'Fêmea' ? 'Fêmea' : 'Macho'}
								key={item._id}
							/>
						))}
					</div>
                </Col>                
				{/* <Col sm={4}>
					{totalAnimalsData.cachorro || totalAnimalsData.gatos ? (
						<ChartDoughnutTotalAnimals
							data={totalAnimalsData}
							titulo={'Quantidade total de animais'}
						/>
					) : (
						<Col style={{ textAlign: 'center' }}>
							<h2 className="text-center">Quantidade total de animais</h2>
							<p>Nenhum animal registrado :D</p>
						</Col>
					)}
				</Col> */}
			</Row>

			<Row>
			<Col sm={8}>
					<ChartBar
						data={catActivitiesData}
						titulo={'Média tempo de atividade (em minutos)  - Gatos'}
					/>
					{/* <ChartDoughnut data={catSickData} titulo={'Alertas - Gatos'} /> */}
				</Col>
			</Row>
		</Container>
	)
}

export default Home
