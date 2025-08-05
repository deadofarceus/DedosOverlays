import { Button } from "react-bootstrap";
import { DDFPlayer } from "../../../types/gameshows/DDFliegt";

interface DDFPlayerProps {
  players: DDFPlayer[];
  index: number;
  finale: boolean;
  handleLifeChange: (index: number, value: number) => void;
  handleNameChange: (index: number, value: string) => void;
  handleSwitchTurn: (index: number) => void;
  handleSwitchSequence: (index: number, newIndex: number) => void;
}

function DDFPlayerControl({
  players,
  index,
  finale,
  handleLifeChange,
  handleNameChange,
  handleSwitchTurn,
  handleSwitchSequence,
}: DDFPlayerProps) {
  const player = players[index];

  return (
    <div className={"ddf-player-control" + (player.yourTurn ? " ddfYourTurn" : "")}>
      <input
        type="text"
        id="DDFPlayerName"
        className="ddf-player-control-name"
        value={player.name}
        onChange={(e) => handleNameChange(index, e.target.value)}
      />
      {!player.admin && (
        <div className="ddf-player-control-lifes-container">
          <div className="ddf-player-control-lifes">
            {[...Array(player.lifes)].map((_, index) => (
              <img
                key={index}
                className="ddf-player-control-life"
                src="../../../DDF/heart.png"
                alt=""
              />
            ))}
          </div>
          <Button
            className="ddf-controlButton"
            variant="success"
            onClick={() => handleLifeChange(index, 1)}
          >
            +1
          </Button>
          <Button
            className="ddf-controlButton"
            variant="danger"
            onClick={() => handleLifeChange(index, -1)}
          >
            -1
          </Button>
          <Button
            className="ddf-controlButton"
            variant="secondary"
            onClick={() => handleSwitchTurn(index)}
          >
            switchTurn
          </Button>

          <div className="ddf-player-control-answers">
            {player.answers.map((answer, _index) =>
              answer ? (
                <img
                  key={_index}
                  className="ddf-player-control-answer"
                  src="../../../DDF/rightAnswer.png"
                  alt=""
                />
              ) : (
                <img
                  key={_index}
                  className="ddf-player-control-answer"
                  src="../../../DDF/wrongAnswer.png"
                  alt=""
                />
              )
            )}
          </div>
        </div>
      )}

      <div className="ddf-player-control-sequence">
        <Button
          className="ddf-controlButton"
          variant="secondary"
          onClick={() => handleSwitchSequence(index, (index + players.length - 1) % players.length)}
        >
          Up
        </Button>
        <Button
          className="ddf-controlButton"
          variant="secondary"
          onClick={() => handleSwitchSequence(index, (index + 1) % players.length)}
        >
          Down
        </Button>
      </div>
      {finale && !player.admin && player.lifes > 0 && (
        <div className="ddf-player-control-finale blackOutline">
          Finale
          <div className="centerR">
            <Button variant="success">+1</Button>
            <Button variant="danger">-1</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DDFPlayerControl;
