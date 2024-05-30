import { ChampionMatchHistory } from "../../types/LeagueTypes";

const iconScale = 8;
const iconSize = 130;
const flameSize = 195;
// FLAME SIZE IS MANUELL SONST GETH TOP LEFT HOPS DINK DONK
// FLAME SIZE IS MANUELL SONST GETH TOP LEFT HOPS DINK DONK
// FLAME SIZE IS MANUELL SONST GETH TOP LEFT HOPS DINK DONK

const iconSizeArray = [[0], [4, 0], [4, 2, 0], [3, 2, 1, 0], [4, 3, 2, 1, 0]];
// const iconSizeArray = [[0], [4, 0], [4, 0, 0], [4, 0, 0, 0], [4, 0, 0, 0, 0]];

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
          style={{
            width: `${
              flameSize - iconSizeArray[length - 1][index] * iconScale * 1.4
            }px`,
            top: `${-70 + iconSizeArray[length - 1][index] * 3}px`,
            right: `${-37 + iconSizeArray[length - 1][index] * 1.4}px`,
          }}
        />
      )}
      <img
        src={imgsrc}
        alt=""
        className="profileImg"
        style={{
          width: `${iconSize - iconSizeArray[length - 1][index] * iconScale}px`,
        }}
      />
      <img
        src={`../../${win}.png`}
        alt="Overlay Image"
        className="overlayIMG"
        style={{
          width: `${iconSize - iconSizeArray[length - 1][index] * iconScale}px`,
        }}
      />
    </div>
  );
}

export default Champion;
