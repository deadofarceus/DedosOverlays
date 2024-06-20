import { Container } from "react-bootstrap";
import { Boss } from "../../../types/DeathcounterTypes";
import { Line } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function GraphOverlay({ boss }: { boss: Boss }) {
  const options = {
    backgroundColor: "rgba(255, 165, 0, 0.4)",
    scales: {
      x: {
        title: {
          display: false,
          text: "Trys",
          color: "#FFFFFF",
          size: 12,
        },
        grid: {
          color: "#606060",
        },
        ticks: {
          color: "#FFFFFF",
          font: {
            family: "Libre Baskerville", // Schriftart
            size: 30, // Schriftgröße
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "HP left in %",
          color: "#FFFFFF",
          font: {
            family: "Libre Baskerville", // Schriftart
            size: 25, // Schriftgröße
          },
        },
        grid: {
          color: "#606060",
        },
        ticks: {
          color: "#FFFFFF",
          font: {
            family: "Libre Baskerville", // Schriftart
            size: 20, // Schriftgröße
          },
          stepSize: 20,
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
        display: false,
        text: "BOSS NAME",
        color: "#FFFFFF",
      },
    },
    maintainAspectRatio: false,
  };

  const deaths = boss.deaths.length - 1;

  const labels =
    deaths < 5
      ? [...Array(deaths + 1).keys()]
      : [...Array(5).keys()].map((i) => deaths - 5 + i + 1);
  const percentages =
    deaths < 5 ? boss.deaths : boss.deaths.slice(deaths - 4, deaths + 1);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Deaths",
        data: percentages,
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
    <Container className="deathOverlayGraphCon">
      {boss.name !== "Other Monsters or Heights" && (
        <Line className="deathOverlayGraph" options={options} data={data} />
      )}
    </Container>
  );
}

export default GraphOverlay;
