import { Button, Container } from "react-bootstrap";
import { Route, Pokemon } from "../../../types/Pokemon";
import RouteRow from "./RouteRow";
import { useState } from "react";

interface RouteRowProps {
  route: Route;
  allPokemons: Pokemon[];
  onToggleTeam: (routeName: string) => void;
  onToggleDisabled: (routeName: string) => void;
  onPokemonChange: (index: number, newPokemon: Pokemon) => void;
  onDeleteRoute: (route: Route) => void;
}

function MiniRoute({
  route,
  allPokemons,
  onToggleTeam,
  onToggleDisabled,
  onPokemonChange,
  onDeleteRoute,
}: RouteRowProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  const isInTeam = route.inTeam;
  const isDisabled = route.disabled;
  let containerClassName = "miniRoute blackOutline";
  if (isDisabled) {
    containerClassName += " link-dead link-dead-web";
  } else if (isInTeam) {
    containerClassName += " link-inTeam";
  }

  return (
    <>
      <Container
        className={containerClassName}
        onClick={() => setShowOverlay(true)}
        style={{ cursor: "pointer" }}
      >
        <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
          <div className="mini-route-name">{route.name}</div>
          {route.pokemon.map((pkm, index) => (
            <div
              key={index}
              className={`mini-pkm-img-div ${
                index === 0 ? "firstTrainerPkmn" : "secondTrainerPkmn"
              }`}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pkm.id}.png`}
                className={`mini-pkm-img`}
              />
            </div>
          ))}
        </div>
      </Container>
      {showOverlay && (
        <div className="RouteRowOverlayCon">
          <div className="RouteRowOverlayCon2xdd">
            <Button
              variant="danger"
              className="m-2 blackOutline"
              onClick={() => setShowOverlay(false)}
              style={{
                fontSize: 32,
                fontWeight: "bold",
              }}
            >
              Close
            </Button>
          </div>
          <RouteRow
            route={route}
            allPokemons={allPokemons}
            onPokemonChange={onPokemonChange}
            onToggleDisabled={onToggleDisabled}
            onToggleTeam={onToggleTeam}
            onDeleteRoute={onDeleteRoute}
          />
        </div>
      )}
    </>
  );
}

export default MiniRoute;
