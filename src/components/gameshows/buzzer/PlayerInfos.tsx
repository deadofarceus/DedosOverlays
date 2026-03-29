import { Player } from "../../../types/gameshows/Buzzer";

interface PlayerProps {
  player: Player;
}

function PlayerInfos({ player }: PlayerProps) {
  return (
    <div className="buzzer-playerSettings">
      <div className="buzzer-playerInfos">{player.name}</div>
      <div className="buzzer-playerPoints">
        <div>{player.points}</div>
      </div>
    </div>
  );
}

export default PlayerInfos;
