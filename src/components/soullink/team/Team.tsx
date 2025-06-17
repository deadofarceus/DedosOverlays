import { Pokemon, Route, Settings } from "../../../types/Pokemon";

interface TeamProps {
  team: Pokemon[];
  routes: Route[];
  settings: Settings;
}

function Team({ team, routes, settings }: TeamProps) {
  const isDisabled = (pokemon: Pokemon) =>
    routes.find((r) => r.name === pokemon.routeName)?.disabled ?? false;

  const imgSrc = (pokemon: Pokemon) => {
    if (settings.imgType === "png") {
      return pokemon.image;
    } else {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`;
    }
  };

  return (
    <div className={`w-100 teamRow`}>
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          className={`soullinkImgDiv ${team[index] && isDisabled(team[index]) ? "link-dead" : ""}`}
        >
          {settings.showPokeballs && (
            <img src="../../pokemon/pokeball.png" alt="" className="pkmnBallImg" />
          )}
          {team[index] && (
            <img
              src={imgSrc(team[index])}
              alt=""
              className={
                "teamOverlayPkmnImg " + (settings.imgType === "png" ? "pngPkmnImg" : "gifPkmnImg")
              }
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Team;
