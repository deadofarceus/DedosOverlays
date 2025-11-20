import { Container, Button, Col, Row } from "react-bootstrap";
import { NoDeathRunGame } from "../../pages/NoDeathRun";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface NoDeathRunControlsProps {
  games: NoDeathRunGame[];
  callback: React.Dispatch<React.SetStateAction<NoDeathRunGame[]>>;
}

const ItemType = "GAME_ITEM";

const DraggableGameItem = ({ game, index, moveGame, useGame }: any) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: any) {
      if (item.index !== index) {
        moveGame(item.index, index);
        item.index = index; // Update the index for the dragged item
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      className="gamedragable"
      style={{
        border: game.active ? "3px solid #6bff54" : "3px solid #ec2828",
      }}
      onClick={() => useGame(index)}
    >
      {game.name} {/* Hier kannst du die Darstellung des Spiels anpassen */}
    </div>
  );
};

const GameList = ({ games, moveGame, useGame }: any) => {
  return (
    <Row className="centerR w-100">
      {games.map((game: NoDeathRunGame, index: any) => (
        <DraggableGameItem
          key={game.name}
          index={index}
          game={game}
          moveGame={moveGame}
          useGame={useGame}
        />
      ))}
    </Row>
  );
};

function NoDeathRunControls({ games, callback }: NoDeathRunControlsProps) {
  const currentGame = games.find((game) => game.status === "PLAYING");

  const gameDone = () => {
    const updatedGames = [...games];
    const currentGameIndex = updatedGames.findIndex((game) => game.status === "PLAYING");
    if (currentGameIndex !== -1) {
      updatedGames[currentGameIndex].status = "FINISHED";
      if (currentGameIndex < updatedGames.length - 1) {
        updatedGames[currentGameIndex + 1].status = "PLAYING";
      }
      callback(updatedGames);
    }
  };

  const randomizeOrder = () => {
    const randomizedGames = [...games].sort(() => Math.random() - 0.5);
    randomizedGames.forEach((game, index) => {
      game.status = index === 0 ? "PLAYING" : "OPEN";
    });
    callback(randomizedGames);
  };

  const moveGame = (fromIndex: number, toIndex: number) => {
    const updatedGames = [...games];
    const [movedGame] = updatedGames.splice(fromIndex, 1);
    updatedGames.splice(toIndex, 0, movedGame);
    updatedGames.forEach((game, index) => {
      game.status = index === 0 ? "PLAYING" : "OPEN";
    });
    callback(updatedGames);
  };

  const useGame = (index: number) => {
    const updatedGames = [...games];
    updatedGames[index].active = !updatedGames[index].active;
    callback(updatedGames);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Container className="centerR nodeathrunControls">
        <Col>
          <GameList games={games} moveGame={moveGame} useGame={useGame} />
          <div>
            <Button className="w-25 m-3" onClick={randomizeOrder}>
              Zufällige Reihenfolge
            </Button>
            <Button className="w-25" variant="success" onClick={gameDone}>
              {`Game ${currentGame?.name} DONE!`}
            </Button>
          </div>
        </Col>
      </Container>
    </DndProvider>
  );
}

export default NoDeathRunControls;
