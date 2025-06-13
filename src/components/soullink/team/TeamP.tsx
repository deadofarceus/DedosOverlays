import { Pokemon, Route } from "../../../types/Pokemon";

interface TeamProps {
  team: Pokemon[];
  routes: Route[];
}

function TeamP({ team, routes }: TeamProps) {
  const isDisabled = (pokemon: Pokemon) =>
    routes.find((r) => r.name === pokemon.routeName)?.disabled ?? false;

  return (
    <div className={`h-100 teamCol-Preview`}>
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          className={`soullinkImgDiv-Preview ${
            team[index] && isDisabled(team[index]) ? "link-dead" : ""
          }`}
        >
          <img src="../../pokemon/pokeball.png" alt="" className="pkmnBallImg-Preview" />
          {team[index] && (
            <img src={team[index].image} alt="" className="teamOverlayPkmnImg-Preview" />
          )}
        </div>
      ))}
    </div>
  );
}

export default TeamP;
