import { DDFPlayer } from "../../../types/gameshows/DDFliegt";
import { DiscordCamMapping } from "../../../types/gameshows/DiscordConstants";

interface DDFCamOverlayProps {
  player: DDFPlayer;
  dcCamMapping: DiscordCamMapping;
}

function DDFCamOverlay({ player, dcCamMapping }: DDFCamOverlayProps) {
  return (
    <div
      className="ddf-cam-overlay"
      style={{
        width: dcCamMapping.width,
        height: dcCamMapping.height,
        top: dcCamMapping.yOffset,
        left: dcCamMapping.xOffset,
      }}
    >
      {player.name + " " + player.lifes + player.answers}
    </div>
  );
}

export default DDFCamOverlay;
