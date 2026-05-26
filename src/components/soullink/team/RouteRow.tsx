import { Container, Row, Col, Button } from "react-bootstrap";
import { Route, Pokemon, Settings, activeRoutePokemon } from "../../../types/Pokemon";
import PokemonCell from "./PokemonCell";

interface RouteRowProps {
  route: Route;
  allPokemons: Pokemon[];
  settings: Settings;
  onToggleTeam: (routeName: string) => void;
  onKillTrainer: (routeName: string, trainerIndex: number) => void;
  onPokemonChange: (index: number, newPokemon: Pokemon) => void;
  onDeleteRoute: (route: Route) => void;
}

function RouteRow({
  route,
  allPokemons,
  settings,
  onToggleTeam,
  onKillTrainer,
  onPokemonChange,
  onDeleteRoute,
}: RouteRowProps) {
  const isInTeam = route.inTeam;
  const isDisabled = route.disabled;
  let containerClassName = "route-row-container";
  if (isDisabled) {
    containerClassName += " link-dead link-dead-web";
  } else if (isInTeam) {
    containerClassName += " link-inTeam";
  }

  const pokemon = activeRoutePokemon(route, settings.participants);

  return (
    <Container className={containerClassName}>
      <Row className="centerR w-100">
        {/* ROUTE INFO + BUTTONS */}
        <Col xs={2} className="centerC routeInfoCol blackOutline">
          <div className="route-name">{route.name}</div>
          <div className="d-flex gap-2 mt-2">
            <Button
              variant={isInTeam ? "success" : "warning"}
              size="sm"
              onClick={() => onToggleTeam(route.name)}
            >
              {isInTeam ? "Withdraw" : "Add to Team"}
            </Button>
          </div>
        </Col>

        {/* Pokemons */}
        <Row className="centerR w-75">
          {pokemon.map((pokemon, index) => (
            <div key={index} className="sl-route-pokemon-div">
              <PokemonCell
                index={index}
                pokemon={pokemon}
                allPokemons={allPokemons}
                onChange={(index, newPkmn) => onPokemonChange(index, newPkmn)}
              />
              <Button
                variant="danger"
                size="sm"
                className="mt-2"
                disabled={isDisabled}
                onClick={() => onKillTrainer(route.name, index)}
              >
                Kill +1
              </Button>
            </div>
          ))}
        </Row>
        <Button
          variant="danger"
          className="deleteRouteButton"
          onClick={() => {
            if (confirm("Warning you are about to delete the Route: " + route.name)) {
              onDeleteRoute(route);
            }
          }}
        >
          X
        </Button>
      </Row>
    </Container>
  );
}

export default RouteRow;
