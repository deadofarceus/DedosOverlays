import { NoDeathRunGame } from "../../pages/NoDeathRun";

interface NoDeathRunGamesProps {
  games: NoDeathRunGame[];
}

function NoDeathRunGames({ games }: NoDeathRunGamesProps) {
  return (
    <div className="centerR w-100">
      {games.map((game, index) => (
        <div className="centerR nodeathgamesDiv" key={index}>
          <div
            className="nodeathrungame blackOutline"
            key={index}
            style={{
              color:
                game.status === "PLAYING"
                  ? "azure"
                  : game.status === "OPEN"
                  ? "#313131d1"
                  : "#08ff08",
            }}
          >
            {game.name}
          </div>
          {index < games.length - 1 && <h2 className="dividerNodeath">•</h2>}
        </div>
      ))}
    </div>
  );
}

export default NoDeathRunGames;
