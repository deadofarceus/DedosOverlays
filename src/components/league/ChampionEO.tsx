import { ChampionMatchHistory } from "../../types/LeagueTypes";

function Champion({
  mvp,
  index,
  championName,
  win,
  length,
}: ChampionMatchHistory) {
  const imgsrc =
    championName === "null"
      ? "../../null.png"
      : `https://ddragon.leagueoflegends.com/cdn/14.7.1/img/champion/${championName}.png`;
  return (
    <div className="imgdiv" style={{ paddingLeft: 0, paddingRight: 0 }}>
      {mvp && (
        <img
          src={`../../flames.png`}
          alt="Overlay Image"
          className="flamesOverlayIMG"
          style={{ width: `${180 - (length - 1 - index) * 4.5}px` }}
        />
      )}
      <img
        src={imgsrc}
        alt=""
        className="profileImg"
        style={{
          width: `${120 - (length - 1 - index) * 4.5}px`,
        }}
      />
      <img
        src={`../../${win}.png`}
        alt="Overlay Image"
        className="overlayIMG"
        style={{ width: `${120 - (length - 1 - index) * 4.5}px` }}
      />
    </div>
  );
}

export default Champion;
