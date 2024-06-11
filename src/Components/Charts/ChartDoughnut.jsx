import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function ChartDoughnut({ data, titulo }) {
	const labels = data.map((item) => item.activityName)
	const values = data.map((item) => item.avgActivityTime)
	const chartData = {
		labels: labels,
		datasets: [
			{
				data: values,
				backgroundColor: [
					'rgba(255, 30, 0, 0.5)',
					'rgba(255, 255, 86, 0.5)',
					'rgba(54, 162, 235, 0.5)',
					'rgba(75, 192, 192, 0.5)',
					'rgba(153, 102, 255, 0.5)',
					'rgba(255, 159, 64, 0.5)',
				],
				borderColor: [
					'rgba(255, 30, 0, 1)',
					'rgba(255, 255, 86, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 1,
			},
		],
	}

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			tooltip: {
				enabled: true,
			},
		},
	}

	return (
		<div className="container mt-5">
			<h2 className="text-center">{titulo}</h2>
			<Doughnut data={chartData} options={options} />
		</div>
	)
}
