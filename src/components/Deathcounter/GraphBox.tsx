import { Col, Container, Form } from "react-bootstrap";
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
import { linearRegression } from "../../types/DedoicPrediction";

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
  const personalBest = Math.min(...current.deaths);
  const linear = linearRegression(
    [...Array(current.deaths.length).keys()],
    current.deaths
  );

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
        display: true,
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

  const datasets = [
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
    },
    {
      label: "Personal Best",
      data: Array.from(
        { length: current.deaths.length + player.prediction.length },
        () => personalBest
      ),
      borderColor: "rgba(0, 255, 0, 1)", // Linienfarbe
      borderWidth: 5,
      pointBackgroundColor: "rgba(0, 0, 0, 0)",
      pointBorderColor: "rgba(0, 0, 0, 0)",
      fill: false,
    },
    {
      label: "Prediction",
      data: current.deaths.concat(player.prediction),
      borderColor: "rgba(255, 0, 0, 1)", // Linienfarbe
      borderWidth: 1,
      pointBackgroundColor: "rgba(255, 0, 0, 1)",
      pointBorderColor: "rgba(255, 0, 0, 1)",
      fill: false,
    },
  ];

  if (player.settings.showLinear) {
    const linearArray = Array.from(
      { length: current.deaths.length + player.prediction.length },
      (_, i) => linear.m * i + linear.b
    );
    for (let i = 0; i < linearArray.length; i++) {
      if (linearArray[i] < 0) {
        linearArray[i] = 0;
      }
      if (linearArray[i] > current.deaths[0]) {
        linearArray[i] = current.deaths[0];
      }
    }
    datasets.push({
      label: "Linear Regression",
      data: linearArray,
      borderColor: "rgba(0, 211, 235, 1)", // Linienfarbe
      borderWidth: 2,
      pointBackgroundColor: "rgba(0, 0, 0, 0)",
      pointBorderColor: "rgba(0, 0, 0, 0)",
      fill: false,
    });
  }

  const data = {
    labels: [...Array(current.deaths.length + player.prediction.length).keys()],
    datasets: datasets,
  };

  return (
    <Container className="progressChartCon centerC">
      {current.name !== "Other Monsters or Heights" && (
        <Container className="progressChartCon centerR">
          <Col className="w-75">
            <Line className="progressChart" options={options} data={data} />
            <Form.Group className="percentageGroup">
              <Form.Label className="formlabel">
                Tries in Overlay: {player.settings.triesInGraph}
              </Form.Label>
              <Form.Range
                max={current.deaths.length - 1}
                min={5}
                step={1}
                defaultValue={5}
                className="percentageSlider"
                onChange={(event) => {
                  player.settings.triesInGraph = parseInt(event.target.value);
                  callback(
                    new Player(
                      player.id,
                      player.name,
                      player.bosses,
                      player.currentBoss,
                      player.settings
                    )
                  );
                }}
              />
            </Form.Group>
          </Col>
          <Col className="centerC settingsCol" md={"auto"}>
            <Form.Check
              type="switch"
              className="settingsCheck"
              label="Show all Tries"
              defaultChecked={true}
              onChange={(event) => {
                player.settings.showAll = event.target.checked;
                callback(
                  new Player(
                    player.id,
                    player.name,
                    player.bosses,
                    player.currentBoss,
                    player.settings
                  )
                );
              }}
            />
            <Form.Check
              type="switch"
              className="settingsCheck"
              label="Show Prediction"
              defaultChecked={false}
              onChange={(event) => {
                player.settings.showPrediction = event.target.checked;
                callback(
                  new Player(
                    player.id,
                    player.name,
                    player.bosses,
                    player.currentBoss,
                    player.settings
                  )
                );
              }}
            />
            <Form.Check
              type="switch"
              className="settingsCheck"
              label="Show Linear Regression"
              defaultChecked={false}
              onChange={(event) => {
                player.settings.showLinear = event.target.checked;
                callback(
                  new Player(
                    player.id,
                    player.name,
                    player.bosses,
                    player.currentBoss,
                    player.settings
                  )
                );
              }}
            />
          </Col>
        </Container>
      )}
    </Container>
  );
}

export default GraphBox;
