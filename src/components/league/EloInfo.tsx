import { Row, Col } from "react-bootstrap";
import { AccountElo } from "../../types/LeagueTypes";
import { useQuery } from "../../types/UsefulFunctions";
import { useRef, useEffect, useState } from "react";

function EloInfo({ eloLP, eloDivision, eloRank, lpDiff, gmBorder, challBorder, name }: AccountElo) {
  // Animations
  const [displayedEloLP, setDisplayedEloLP] = useState(eloLP); // State to handle gradual increase
  const previousEloLP = useRef(eloLP);
  const [phillyWeather, setPhillyWeather] = useState<string | null>(null);

  // Function to gradually increase the lpDiff
  const animateEloLP = (startValue: number, endValue: number) => {
    let currentValue = startValue;
    const increment = (endValue - startValue) / 10; // Adjust this to control speed (30 frames)

    const intervalId = setInterval(() => {
      currentValue += increment;
      setDisplayedEloLP(Math.round(currentValue)); // Update displayed value

      const lpDiffElement = document.querySelector(".currentLP");
      if (lpDiffElement) {
        lpDiffElement.classList.add("bounce"); // Add bounce effect

        // Remove bounce class after the animation
        setTimeout(() => {
          lpDiffElement.classList.remove("bounce");
        }, 600); // Match the duration of your CSS bounce animation
      }

      if (Math.abs(currentValue - endValue) < 1) {
        // Stop when close to the end value
        clearInterval(intervalId);
        setDisplayedEloLP(endValue); // Ensure the final value is exact
      }
    }, 100); // Adjust this for the timing of the steps
  };

  useEffect(() => {
    if (previousEloLP.current !== eloLP) {
      animateEloLP(previousEloLP.current, eloLP);
      previousEloLP.current = eloLP; // Update reference to current lpDiff
    }
  }, [eloLP]);

  // Fetch short weather for Banjarmasin, Indonesia (troll for Philly Westside)
  useEffect(() => {
    if (name !== "Philly Westside") {
      setPhillyWeather(null);
      return;
    }

    const controller = new AbortController();

    const weatherEmoji = (code: number): string => {
      if ([0].includes(code)) return "☀️"; // Clear
      if ([1, 2].includes(code)) return "🌤️"; // Mainly/Slightly cloudy
      if ([3].includes(code)) return "☁️"; // Overcast
      if ([45, 48].includes(code)) return "🌫️"; // Fog
      if ([51, 53, 55, 56, 57].includes(code)) return "🌦️"; // Drizzle
      if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "🌧️"; // Rain
      if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️"; // Snow
      if ([95, 96, 99].includes(code)) return "⛈️"; // Thunderstorm
      return "🌡️";
    };

    const fetchWeather = async () => {
      let randomLat = Math.floor(Math.random() * (90000 + 1)) / 1000;
      let randomLong = Math.floor(Math.random() * (180000 + 1)) / 1000;
      if (Math.random() > 0.5) {
        randomLat *= -1;
      }
      if (Math.random() > 0.5) {
        randomLong *= -1;
      }
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${randomLat}&longitude=${randomLong}&current=temperature_2m,weather_code`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) return;
        const data = await res.json();
        const temp = Math.round(data?.current?.temperature_2m);
        const code = Number(data?.current?.weather_code);
        const emoji = weatherEmoji(isNaN(code) ? -1 : code);
        if (typeof temp === "number" && !isNaN(temp)) {
          setPhillyWeather(`${randomLat}, ${randomLong} ${emoji} ${temp}°C`);
        } else {
          setPhillyWeather(`${randomLat}, ${randomLong}  ${emoji}`);
        }
      } catch (_) {
        // keep default lpToday on failure
        setPhillyWeather(null);
      }
    };

    fetchWeather();

    return () => controller.abort();
  }, [name, eloLP]);

  // calculate alle displayed Werte
  let lpDisplay =
    eloDivision === "MASTER" || eloDivision === "GRANDMASTER" || eloDivision === "CHALLENGER"
      ? displayedEloLP + " LP"
      : eloRank + " " + displayedEloLP + " LP";
  lpDisplay = eloDivision === "UNRANKED" ? "UNRANKED" : lpDisplay;
  let lpToday = lpDiff >= 0 ? `+${lpDiff} LP ↑` : `${lpDiff} LP ↓`;
  let border = undefined;
  if (eloDivision === "MASTER") {
    border = "GM Border: " + gmBorder;
  } else if (eloDivision === "GRANDMASTER") {
    border = "Challenger Border: " + challBorder;
  }
  const query = useQuery();
  const legacy = query.get("legacy") === "true" ? "L" : "";
  let today = query.get("lang") === "en" ? "Today:" : "Heute:";
  if (name === "Philly Westside" && phillyWeather) {
    today = "Wetter bei";
    lpToday = phillyWeather;
  }
  //   const prideflag = getPrideFlag(eloLP);d

  return (
    <Row className="eloInfo">
      <Col className="ELO centerC">
        <img src={`../../${eloDivision + legacy}.png`} className="eloimg eloAndLP" />
        {/* <p className={"currentLP eloAndLP pride " + prideflag}>{lpDisplay}</p> */}
        <p className={"currentLP eloAndLP blackOutline eloLPValue"}>{lpDisplay}</p>
        {/* {lpDisplay !== "UNRANKED" && (
          <p className="fatOutline currentLP eloAndLP prideshadow">
            {lpDisplay}
          </p>
        )} */}
      </Col>
      <Col className="ELO text-center">
        {border ? (
          <p className="leagueborder blackOutline">{border}</p>
        ) : (
          <div className="spacer"></div>
        )}
        <p className="lpDiff blackOutline">{today}</p>
        <p className="lpDiff blackOutline" style={{ color: lpDiff >= 0 ? "#6eff57" : "#FF6565" }}>
          {lpToday}
        </p>
      </Col>
    </Row>
  );
}

// function getPrideFlag(lp: number): string {
//   const flags = [
//     "lgbt-pride",
//     "pan-pride",
//     "ace-pride",
//     "nb-pride",
//     "trans-pride",
//     "bi-pride",
//     "lesbian-pride",
//   ];

//   return flags[lp % flags.length];
// }

export default EloInfo;
