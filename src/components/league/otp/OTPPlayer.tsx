import { Col } from "react-bootstrap";
import { OTPPlayerProps } from "../../../types/OTPTypes";

function OTPPlayer({
  index,
  lp,
  tier,
  rank,
  summonerName,
  rang,
}: OTPPlayerProps) {
  const iconSrc =
    summonerName === "Fat Houdini"
      ? "../Karma.png"
      : summonerName === "e7c3c0fd-cee3-4399-877b-baf89c9f6f46"
      ? "../Baus.png"
      : "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Gragas.png";
  const lpDisplay =
    tier === "MASTER" || tier === "GRANDMASTER" || tier === "CHALLENGER"
      ? lp + " LP"
      : rank + " " + lp + " LP";
  const displayName =
    summonerName === "e7c3c0fd-cee3-4399-877b-baf89c9f6f46"
      ? "Thebausffs"
      : summonerName === "Fat Houdini"
      ? "snKarma"
      : summonerName;
  return (
    <Col className="centerC optCol blackOutline">
      <h1>{displayName}</h1>
      <div className="optIconDiv" style={{ width: index * 50 + 240 + "px" }}>
        <img src={iconSrc} alt="ICON" className="otpProfileImg" />
        {index === 2 && <div className={"otpRand"}></div>}
        {index === 2 && <img className="otpCrown" src="../crown.png" />}
        <h2
          className="otpRank"
          style={{
            bottom: index * 10 + -8 + "px",
            right: index * 10 + 35 + "px",
          }}
        >
          {rang}
        </h2>
      </div>
      <div className="centerR otpLP">
        <img src={`../${tier}.png`} alt="divison" className="otpDiv" />
        <h1>{lpDisplay}</h1>
      </div>
    </Col>
  );
}

export default OTPPlayer;
