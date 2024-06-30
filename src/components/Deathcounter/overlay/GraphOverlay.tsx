import { Container } from "react-bootstrap";
import { Player } from "../../../types/DeathcounterTypes";
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
  Tick,
} from "chart.js";
import { linearRegression } from "../../../types/DedoicPrediction";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function GraphOverlay({ player }: { player: Player }) {
  const boss = player.bosses[player.currentBoss];
  const NUMBEROFTRIESSHOWN = player.settings.triesInGraph;
  const personalBest = Math.min(...boss.deaths);
  const linear = linearRegression(
    [...Array(boss.deaths.length).keys()],
    boss.deaths
  );

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
            size: 25, // Schriftgröße
          },
        },
      },
      y: {
        beginAtZero: true,
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
          color: function (context: { tick: Tick }) {
            if (context.tick.value === personalBest) {
              return "#00FF00"; // Grüne Farbe für Personal Best
            }
            return "#FFFFFF"; // Standardfarbe für andere Ticks
          },
          font: {
            family: "Libre Baskerville", // Schriftart
            size: 30, // Schriftgröße
          },
          callback: function (value: string | number) {
            if (value === personalBest) {
              return `PB ${value}`;
            }
            return value;
          },
        },
        afterBuildTicks: function (scale: LinearScale) {
          if (!scale.ticks.find((t) => t.value === personalBest)) {
            let iOfNearest20 = -1;
            let distance = 100;
            for (let i = 0; i < scale.ticks.length; i++) {
              const currentDistance = Math.abs(
                personalBest - scale.ticks[i].value
              );
              if (iOfNearest20 === -1) {
                iOfNearest20 = i;
                distance = currentDistance;
              } else if (currentDistance < distance) {
                iOfNearest20 = i;
                distance = currentDistance;
              }
            }
            scale.ticks.splice(iOfNearest20, 1);
            scale.ticks.push({ value: personalBest, label: `${personalBest}` });
          }
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
    deaths < NUMBEROFTRIESSHOWN || player.settings.showAll
      ? [...Array(deaths + 1 + player.prediction.length).keys()]
      : [...Array(NUMBEROFTRIESSHOWN + player.prediction.length).keys()].map(
          (i) => deaths - NUMBEROFTRIESSHOWN + i + 1
        );
  const percentages =
    deaths < NUMBEROFTRIESSHOWN || player.settings.showAll
      ? boss.deaths
      : boss.deaths.slice(deaths - (NUMBEROFTRIESSHOWN - 1), deaths + 1);

  const datasets = [
    {
      label: "Deaths",
      data: percentages,
      backgroundColor: "rgba(255, 165, 0, 0.4)", // Punktfarbe
      borderColor: "rgba(255, 165, 0, 1)", // Linienfarbe
      borderWidth: 4,
      pointBackgroundColor: "rgba(255, 165, 0, 1)", // Punktfarbe
      pointBorderColor: "rgba(255, 165, 0, 1)", // Punktkonturfarbe
      pointRadius: 5,
      fill: false,
    },
    {
      label: "Personal Best",
      data: Array.from(
        { length: percentages.length + player.prediction.length },
        () => personalBest
      ),
      borderColor: "rgba(0, 255, 0, 1)", // Linienfarbe
      borderWidth: 5,
      pointBackgroundColor: "rgba(0, 0, 0, 0)",
      pointBorderColor: "rgba(0, 0, 0, 0)",
      fill: false,
    },
  ];

  if (player.settings.showLinear) {
    const linearArray = Array.from(
      { length: boss.deaths.length + player.prediction.length },
      (_, i) => linear.m * i + linear.b
    );
    for (let i = 0; i < linearArray.length; i++) {
      if (linearArray[i] < 0) {
        linearArray[i] = 0;
      }
      if (linearArray[i] > boss.deaths[0]) {
        linearArray[i] = boss.deaths[0];
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
  if (player.settings.showPrediction) {
    datasets.push({
      label: "Prediction",
      data: percentages.concat(player.prediction),
      borderColor: "rgba(255, 0, 0, 1)", // Linienfarbe
      borderWidth: 3,
      pointBackgroundColor: "rgba(255, 0, 0, 1)",
      pointBorderColor: "rgba(255, 0, 0, 1)",
      fill: false,
    });
  }

  const data = {
    labels: labels,
    datasets: datasets,
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
