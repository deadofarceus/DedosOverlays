import { DDFPlayer } from "../../../types/gameshows/DDFliegt";
import { DiscordCamMapping } from "../../../types/gameshows/DiscordConstants";

interface DDFCamOverlayProps {
  player: DDFPlayer;
  dcCamMapping: DiscordCamMapping;
}

function DDFCamOverlay({ player, dcCamMapping }: DDFCamOverlayProps) {
  const invulnerable = player.answers.every((answer) => answer);

  return (
    <div
      className={"ddf-cam-overlay " + (player.yourTurn ? "ddfYourTurn" : "")}
      style={{
        width: dcCamMapping.width,
        height: dcCamMapping.height,
        top: dcCamMapping.yOffset,
        left: dcCamMapping.xOffset,
      }}
    >
      <div className="ddf-cam-overlay-name-container">
        <div className="ddf-cam-overlay-name">{player.name}</div>
      </div>
      {!player.admin && (
        <div className="ddf-cam-overlay-lifes">
          {[...Array(player.lifes)].map((_, _index) => (
            <img className="ddf-cam-overlay-life" src="../../../DDF/heart.png" alt="" />
          ))}
        </div>
      )}

      {!player.admin && (
        <div className="ddf-cam-overlay-answers">
          {player.answers.map((answer, _index) => (
            <img
              className="ddf-cam-overlay-answer"
              src={"../../../DDF/" + (answer ? "rightAnswer.png" : "wrongAnswer.png")}
              alt=""
            />
          ))}
        </div>
      )}

      {invulnerable && !player.admin && (
        <div className="ddf-cam-overlay-invulnerable-container">
          <img
            className="ddf-cam-overlay-invulnerable"
            src="../../../DDF/invulnerable.png"
            alt=""
          />
        </div>
      )}
    </div>
  );
}

export default DDFCamOverlay;
