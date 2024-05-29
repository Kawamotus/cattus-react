import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; //precisa colocar assim pra funcionar

export default function ChartBar() {
    const data = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
        datasets: [
          {
            label: 'Vendas',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(103, 0, 0, 0.5)',
            borderColor: '#670000',
            borderWidth: 1,
          },
        ],
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
          <h2>Vendas Mensais</h2>
          <Bar data={data} options={options} />
        </div>
      );
}
