import { Pokemon, Route, Settings } from "../../../types/Pokemon";

interface TeamProps {
  team: Pokemon[];
  routes: Route[];
  settings: Settings;
  index: number;
}

function Team({ index, team, routes, settings }: TeamProps) {
  const isDisabled = (pokemon: Pokemon) =>
    routes.find((r) => r.name === pokemon.routeName)?.disabled ?? false;

  const imgSrc = (pokemon: Pokemon) => {
    if (settings.imgType === "png") {
      return pokemon.image;
    } else {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`;
    }
  };

  const nickName = (pokemon: Pokemon) => {
    if (pokemon.nickName === "-----------------") {
      return pokemon.name;
    } else {
      return pokemon.nickName;
    }
  };

  const array = Array.from({ length: team.length }, (_, i) => i);

  return (
    <div className={`teamRow${settings.showBackground ? ` teamRow-background team-${index}` : ""}`}>
      {array.map((index) => (
        <div
          key={index}
          className={`soullinkImgDiv ${team[index] && isDisabled(team[index]) ? "link-dead" : ""}`}
        >
          {settings.showPokeballs && (
            <img src="../../pokemon/pokeball.png" alt="Pokeball icon" className="pkmnBallImg" />
          )}
          {team[index] && (
            <img
              src={imgSrc(team[index])}
              alt={`${team[index]?.name ?? "Pokemon"} sprite`}
              className={
                "teamOverlayPkmnImg " + (settings.imgType === "png" ? "pngPkmnImg" : "gifPkmnImg")
              }
            />
          )}
          {settings.showNicknames && team[index] && (
            <div className="pkmn-Nickname blackOutline">{nickName(team[index])}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Team;
