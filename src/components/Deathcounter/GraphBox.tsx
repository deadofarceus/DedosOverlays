import { Container } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { PlayerD } from "../../types/DeathcounterTypes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function GraphBox({ player }: PlayerD) {
  const current = player.bosses[player.currentBoss];

  const options = {
    backgroundColor: "rgba(255, 165, 0, 0.4)",
    scales: {
      x: {
        title: {
          display: true,
          text: "Tries",
          color: "#FFFFFF",
        },
        grid: {
          color: "#606060",
        },
        ticks: {
          color: "#FFFFFF",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Boss HP left in %",
          color: "#FFFFFF",
        },
        grid: {
          color: "#606060",
        },
        ticks: {
          color: "#FFFFFF",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "#FFFFFF",
        },
      },
      title: {
        display: true,
        text: current.name,
        color: "#FFFFFF",
      },
    },
    maintainAspectRatio: false,
  };

  const data = {
    labels: [...Array(current.deaths.length).keys()],
    datasets: [
      {
        label: "Deaths",
        data: current.deaths,
        backgroundColor: "rgba(255, 165, 0, 0.4)", // Punktfarbe
        borderColor: "rgba(255, 165, 0, 1)", // Linienfarbe
        borderWidth: 2,
        pointBackgroundColor: "rgba(255, 165, 0, 1)", // Punktfarbe
        pointBorderColor: "rgba(255, 165, 0, 1)", // Punktkonturfarbe
        pointRadius: 4,
        fill: false,
        tension: 0.1, // für geschmeidigere Linien
      },
    ],
  };

  return (
    <Container className="progressChartCon centerC">
      {current.name !== "Other Monsters or Heights" && (
        <Line className="progressChart" options={options} data={data} />
      )}
    </Container>
  );
}

export default GraphBox;
