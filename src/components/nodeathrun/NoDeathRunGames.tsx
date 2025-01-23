import { NoDeathRunGame } from "../../pages/NoDeathRun";

interface NoDeathRunGamesProps {
  games: NoDeathRunGame[];
}

function NoDeathRunGames({ games }: NoDeathRunGamesProps) {
  const lastactive =
    games.length - games.reverse().findIndex((game) => game.active);
  games.reverse();

  return (
    <div className="centerR w-100">
      {games.map((game, index) => (
        <div className="centerR nodeathgamesDiv" key={index}>
          {game.active && (
            <div
              className="nodeathrungame"
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
          )}

          {index < lastactive - 1 && game.active && (
            <h2 className="dividerNodeath">•</h2>
          )}
        </div>
      ))}
    </div>
  );
}

export default NoDeathRunGames;
