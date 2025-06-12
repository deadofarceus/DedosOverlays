import { Container, Row, Col, Button } from "react-bootstrap";
import { Route, Pokemon } from "../../../types/Pokemon";
import PokemonCell from "./PokemonCell";

interface RouteRowProps {
  route: Route;
  allPokemons: Pokemon[];
  onToggleTeam: (routeName: string) => void;
  onToggleDisabled: (routeName: string) => void;
  onPokemonChange: (index: number, newPokemon: Pokemon) => void;
}

function RouteRow({
  route,
  allPokemons,
  onToggleTeam,
  onToggleDisabled,
  onPokemonChange,
}: RouteRowProps) {
  const isInTeam = route.inTeam;
  const isDisabled = route.disabled;

  return (
    <Container className={`route-row-container ${isDisabled ? "link-dead" : ""}`}>
      <Row className="centerR w-100">
        {/* ROUTE INFO + BUTTONS */}
        <Col xs={2} className="centerC routeInfoCol">
          <div className="route-name">{route.name}</div>
          <div className="d-flex gap-2 mt-2">
            <Button
              variant={isInTeam ? "success" : "outline-primary"}
              size="sm"
              onClick={() => onToggleTeam(route.name)}
            >
              {isInTeam ? "Active" : "Take with"}
            </Button>
            <Button variant="secondary" size="sm" onClick={() => onToggleDisabled(route.name)}>
              {isDisabled ? "Link Alive" : "Link Dead"}
            </Button>
          </div>
        </Col>

        {/* Pokemons */}
        <Row className="centerR w-75">
          {route.pokemon.map((pokemon, index) => (
            <PokemonCell
              key={index}
              index={index}
              pokemon={pokemon}
              allPokemons={allPokemons}
              onChange={(index, newPkmn) => onPokemonChange(index, newPkmn)}
            />
          ))}
        </Row>
      </Row>
    </Container>
  );
}

export default RouteRow;
