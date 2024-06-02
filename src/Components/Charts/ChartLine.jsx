import React from 'react'
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export default function ChartLine() {

    const data = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
        datasets: [
          {
            label: 'Vendas 2023',
            data: [12, 19, 3, 5, 2, 3],
            fill: false,
            borderColor: '#670000',
            tension: 0.1,
          },
          {
            label: 'Vendas 2024',
            data: [15, 10, 7, 8, 5, 6],
            fill: false,
            borderColor: '#dc3545',
            tension: 0.1,
          },
          {
            label: 'Vendas 2025',
            data: [18, 25, 17, 125, 7, 4],
            fill: false,
            borderColor: 'green',
            tension: 0.1,
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
          <h2>Tempo gasto (por dia)</h2>
          <Line data={data} options={options} />
        </div>
      );

}
