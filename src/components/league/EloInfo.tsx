import { Row, Col } from "react-bootstrap";
import { AccountElo } from "../../types/LeagueTypes";
import { useQuery } from "../../types/UsefulFunctions";

function EloInfo({
  eloLP,
  eloDivision,
  eloRank,
  lpDiff,
  gmBorder,
  challBorder,
}: AccountElo) {
  let lpDisplay =
    eloDivision === "MASTER" ||
    eloDivision === "GRANDMASTER" ||
    eloDivision === "CHALLENGER"
      ? eloLP + " LP"
      : eloRank + " " + eloLP + " LP";
  lpDisplay = eloDivision === "UNRANKED" ? "UNRANKED" : lpDisplay;
  const lpToday = lpDiff >= 0 ? `+${lpDiff} LP ↑` : `${lpDiff} LP ↓`;
  let border = undefined;
  if (eloDivision === "MASTER") {
    border = "GM Border: " + gmBorder;
  } else if (eloDivision === "GRANDMASTER") {
    border = "Challenger <br> Border: " + challBorder;
  }
  const query = useQuery();
  const legacy = query.get("legacy") === "true" ? "L" : "";

  const prideflag = getPrideFlag(eloLP);

  return (
    <Row className="eloInfo">
      <Col className="ELO d-flex flex-column justify-content-center align-items-center">
        <img
          src={`../../${eloDivision + legacy}.png`}
          className="eloimg eloAndLP"
        />
        <p className={"eloAndLP pride " + prideflag}>{lpDisplay}</p>
        {lpDisplay !== "UNRANKED" && (
          <p className="eloAndLP prideshadow">{lpDisplay}</p>
        )}
      </Col>
      <Col className="ELO text-center">
        {border ? (
          <p
            className="leagueborder"
            dangerouslySetInnerHTML={{ __html: border }}
          />
        ) : (
          <div className="spacer"></div>
        )}
        <p className="lpDiff">Heute:</p>
        <p
          className="lpDiff"
          style={{ color: lpDiff >= 0 ? "#6eff57" : "#FF6565" }}
        >
          {lpToday}
        </p>
      </Col>
    </Row>
  );
}

function getPrideFlag(lp: number): string {
  const flags = [
    "lgbt-pride",
    "pan-pride",
    "ace-pride",
    "nb-pride",
    "trans-pride",
    "bi-pride",
  ];

  return flags[lp % flags.length];
}

export default EloInfo;
