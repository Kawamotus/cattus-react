import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; //precisa colocar assim pra funcionar

export default function ChartBar({data, titulo}) {
	const labels = data.map((item) => item.activityName)
	const values = data.map((item) => item.avgActivityTime)
    const colors = [
        'rgba(255, 30, 0, 0.5)',
        'rgba(255, 255, 86, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
    ]

    const borders = [
        'rgba(255, 30, 0, 1)',
        'rgba(255, 255, 86, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
    ]

    const sets = [];

    labels.forEach((label, index) => {
        const set = {
            label: label,
            data: [values[index]],
            backgroundColor: colors[index],
            borderColor: borders[index],
            borderWidth: 1,
        };
        sets.push(set);
    });
    const chartData = {
        labels: ["atividade"],
        datasets: sets,
      };
      // Opções de exemplo
      const options = {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
    
      return (
        <div>
          <h2>{titulo}</h2>
          <Bar data={chartData} options={options} />
        </div>
      );
}
