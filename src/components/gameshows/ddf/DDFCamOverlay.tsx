import { DDFPlayer } from "../../../types/gameshows/DDFliegt";
import { DiscordCamMapping } from "../../../types/gameshows/DiscordConstants";

interface DDFCamOverlayProps {
  player: DDFPlayer;
  finale: boolean;
  showTurn: boolean;
  dcCamMapping: DiscordCamMapping;
}

function DDFCamOverlay({ player, finale, showTurn, dcCamMapping }: DDFCamOverlayProps) {
  const invulnerable = player.answers.every((answer) => answer) && player.answers.length > 1;

  return (
    <div
      className={"ddf-cam-overlay " + (player.yourTurn && showTurn ? "ddfYourTurn" : "")}
      style={{
        minWidth: dcCamMapping.width,
        minHeight: dcCamMapping.height,
      }}
    >
      <div className="ddf-cam-overlay-name-container">
        <div className="ddf-cam-overlay-name" style={{ fontSize: player.fontSize + "px" }}>
          {player.name}
        </div>
        {player.winner && (
          <img className="ddf-cam-overlay-winner" src="../../../DDF/crown.png" alt="Winner crown" />
        )}
      </div>
      {!player.admin && !finale && (
        <div className="ddf-cam-overlay-lifes">
          {[...Array(player.lifes)].map((_, _index) => (
            <img
              className="ddf-cam-overlay-life"
              src="../../../DDF/heart.png"
              alt="Life heart icon"
            />
          ))}
        </div>
      )}
      {finale && !player.admin && (
        <div className="ddf-cam-overlay-lifes">{player.finalePoints}</div>
      )}

      {!player.admin && (
        <div className="ddf-cam-overlay-answers">
          {player.answers.map((answer, _index) => (
            <img
              className="ddf-cam-overlay-answer"
              src={"../../../DDF/" + (answer ? "rightAnswer.png" : "wrongAnswer.png")}
              alt={answer ? "Correct answer badge" : "Wrong answer badge"}
            />
          ))}
        </div>
      )}

      {invulnerable && !player.admin && (
        <div className="ddf-cam-overlay-invulnerable-container">
          <img
            className="ddf-cam-overlay-invulnerable"
            src="../../../DDF/invulnerable.png"
            alt="Invulnerable status icon"
          />
        </div>
      )}
    </div>
  );
}

export default DDFCamOverlay;
