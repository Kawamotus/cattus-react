import socket from '../socketio'
import React from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import Cookies from 'js-cookie'
import toast, { Toaster } from 'react-hot-toast'

import PetCard from '../Components/PetCard'
import RecentEntry from '../Components/RecentEntry'
import TituloPagina from '../Components/TituloPagina'
import ChartDoughnut from '../Components/Charts/ChartDoughnut'

const Home = () => {
	document.title = 'Cattus'

	const [items, setItems] = React.useState([])
	const [dogActivitiesData, setChartsDog] = React.useState([])
	const [catActivitiesData, setChartsCat] = React.useState([])
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

		fetchCharts()
		setItems(data.result)
		setLoading(false)
	}

	async function fetchCharts() {
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
		setChartsDog(data.result['cachorros'])
		setChartsCat(data.result['gatos'])
	}

	React.useEffect(() => {
		fetchData()
	}, [])

	const filteredItems = items.filter((item) => item.petStatus.petCurrentStatus == 1 || item.petStatus.petCurrentStatus == 2)

	return (
		<Container fluid="lg">
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
								border={item.petStatus.petCurrentStatus == 1 ? 'warning' : item.petStatus.petCurrentStatus == 2 ? 'danger' : 'success'}
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
				<Col sm={4}>
					<ChartDoughnut
						data={dogActivitiesData}
						titulo="Média tempo de atividade (em minutos)  - Caes"
					/>
					<br />
				</Col>
				<Col sm={4}>
					<ChartDoughnut
						data={catActivitiesData}
						titulo="Média tempo de atividade (em minutos) - Gatos"
					/>
					<br />
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
			</Row>
		</Container>
	)
}

export default Home
