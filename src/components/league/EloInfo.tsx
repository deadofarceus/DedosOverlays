import { AccountElo } from "../../types/LeagueTypes";
import { useQuery } from "../../types/UsefulFunctions";
import { useRef, useEffect, useState } from "react";

function EloInfo({ eloLP, eloDivision, eloRank, lpDiff, gmBorder, challBorder }: AccountElo) {
  // Animations
  const [displayedEloLP, setDisplayedEloLP] = useState(eloLP); // State to handle gradual increase
  const previousEloLP = useRef(eloLP);

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

  // calculate alle displayed Werte
  let lpDisplay =
    eloDivision === "MASTER" || eloDivision === "GRANDMASTER" || eloDivision === "CHALLENGER"
      ? displayedEloLP + " LP"
      : eloRank + " " + displayedEloLP + " LP";
  lpDisplay = eloDivision === "UNRANKED" ? "UNRANKED" : lpDisplay;
  const lpToday = lpDiff >= 0 ? `+${lpDiff} LP ↑` : `${lpDiff} LP ↓`;
  let border = undefined;
  if (eloDivision === "MASTER") {
    border = "GM Border: " + gmBorder;
  } else if (eloDivision === "GRANDMASTER") {
    border = "Challenger Border: " + challBorder;
  }
  const query = useQuery();
  const legacy = query.get("legacy") === "true" ? "L" : "";
  const divisionLabel = eloDivision ? eloDivision : "UNRANKED";
  const today = query.get("lang") === "en" ? "Today:" : "Heute:";
  //   const prideflag = getPrideFlag(eloLP);d

  return (
    <div className="eloInfo">
      <div className="ELO centerC eloAndLP">
        <img
          src={`../../${eloDivision + legacy}.png`}
          className="eloimg"
          alt={`${divisionLabel}${legacy ? " legacy" : ""} emblem`}
        />
        {/* <p className={"currentLP  pride " + prideflag}>{lpDisplay}</p> */}
        <p className={"currentLP blackOutline eloLPValue"}>{lpDisplay}</p>
        {/* {lpDisplay !== "UNRANKED" && (
          <p className="fatOutline currentLP  prideshadow">
            {lpDisplay}
          </p>
        )} */}
      </div>
      <div className="ELO">
        {border ? (
          <div className="leagueborder blackOutline">{border}</div>
        ) : (
          <div className="spacer"></div>
        )}
        <div className="lpDiff blackOutline">{today}</div>
        <div className="lpDiff blackOutline" style={{ color: lpDiff >= 0 ? "#6eff57" : "#FF6565" }}>
          {lpToday}
        </div>
      </div>
    </div>
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
