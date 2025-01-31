import { Container } from "react-bootstrap";
import { Radar } from "react-chartjs-2";
import { SKILLS } from "../../types/oldOrUnused/GamingTierlistTypes";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const options = {
  label: {
    display: false,
  },
  scales: {
    r: {
      beginAtZero: true,
      min: 0,
      max: 6,
      label: {
        display: false,
      },
      ticks: {
        display: false,
      },
      grid: {
        color: "rgba(75, 192, 192, 1)", // Farbe der "Spinnennetz"-Linien
        lineWidth: 2, // Dicke der "Spinnennetz"-Linien
      },
      angleLines: {
        color: "rgba(75, 192, 192, 1)", // Farbe der Winkel-Linien
        lineWidth: 2, // Dicke der Winkel-Linien
      },
      pointLabels: {
        color: "azure",
        font: {
          size: 32,
          family: "Anton",
        },
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: "azure", // Textfarbe des Labels
        font: {
          size: 16, // Schriftgröße des Labels
          family: "Anton", // Schriftart des Labels
        },
      },
    },
    zoom: {
      zoom: false,
      pan: false,
    },
  },
};

function RadarGraph({ values }: { values: number[] }) {
  const data = {
    labels: SKILLS,
    datasets: [
      {
        label: "Skill Rating",
        data: values,
        backgroundColor: "rgba(255, 99, 132, 0.3)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 4,
      },
    ],
  };
  return (
    <Container className="centerC radargraphC">
      <Radar className="radarChartMY" data={data} options={options}></Radar>
    </Container>
  );
}

export default RadarGraph;
