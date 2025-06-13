import { Pokemon, Route } from "../../../types/Pokemon";

interface TeamProps {
  team: Pokemon[];
  routes: Route[];
  flexRow: boolean;
}

function Team({ team, routes, flexRow }: TeamProps) {
  const isDisabled = (pokemon: Pokemon) =>
    routes.find((r) => r.name === pokemon.routeName)?.disabled ?? false;

  return (
    <div className={`w-100 ${flexRow ? "teamRow" : "teamCol"}`}>
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          className={`soullinkImgDiv ${team[index] && isDisabled(team[index]) ? "link-dead" : ""}`}
        >
          <img src="../../pokemon/pokeball.png" alt="" className="pkmnBallImg" />
          {team[index] && <img src={team[index].image} alt="" className="teamOverlayPkmnImg" />}
        </div>
      ))}
    </div>
  );
}

export default Team;
