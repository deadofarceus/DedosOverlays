import { Container, Form } from "react-bootstrap";
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
import { Player, PlayerD } from "../../types/DeathcounterTypes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function GraphBox({ player, callback }: PlayerD) {
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
        <Container className="progressChartCon centerC">
          <Line className="progressChart" options={options} data={data} />
          <Form.Group className="percentageGroup">
            <Form.Label className="formlabel">
              Tries in Overlay: {player.triesInGraph}
            </Form.Label>
            <Form.Range
              max={current.deaths.length - 1}
              min={5}
              step={1}
              defaultValue={5}
              className="percentageSlider"
              onChange={(event) => {
                player.triesInGraph = parseInt(event.target.value);
                callback(
                  new Player(
                    player.id,
                    player.name,
                    player.bosses,
                    player.currentBoss,
                    player.triesInGraph
                  )
                );
              }}
            />
          </Form.Group>
        </Container>
      )}
    </Container>
  );
}

export default GraphBox;
