import { useState } from "react";
import { Form, InputGroup, ListGroup } from "react-bootstrap";
import { Pokemon } from "../../../types/Pokemon";

interface PokemonCellProps {
  index: number;
  pokemon: Pokemon;
  allPokemons: Pokemon[];
  onChange: (index: number, newPokemon: Pokemon) => void;
}

function PokemonCell({ index, pokemon, allPokemons, onChange }: PokemonCellProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [nickname, setNickname] = useState<string>(pokemon.nickName);

  const filteredPokemon = allPokemons.filter(
    (p) =>
      p.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
      p.nameDE.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handleSelect = (selected: Pokemon) => {
    const newPokemon: Pokemon = new Pokemon(
      selected.id,
      selected.name,
      selected.nameDE,
      pokemon.nickName,
      pokemon.routeName,
      pokemon.trainerName
    );
    setSearchTerm("");
    setShowSuggestions(false);
    onChange(index, newPokemon);
  };

  const handleNicknameChange = () => {
    const newPokemon: Pokemon = new Pokemon(
      pokemon.id,
      pokemon.name,
      pokemon.nameDE,
      nickname,
      pokemon.routeName,
      pokemon.trainerName
    );
    onChange(index, newPokemon);
  };

  return (
    <div className="pokemon-cell">
      <div className="text-center">
        <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
        <input
          type="text"
          className="pokemon-name blackOutline"
          value={
            nickname === "-----------------"
              ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
              : nickname
          }
          onChange={(e) => setNickname(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleNicknameChange();
            }
          }}
        />
      </div>
      <InputGroup className="mt-2">
        <Form.Control
          type="text"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
        />
      </InputGroup>
      {showSuggestions && searchTerm && (
        <ListGroup className="suggestion-list">
          {filteredPokemon.map((p) => (
            <ListGroup.Item key={p.id} action onClick={() => handleSelect(p)}>
              {p.name + "/" + p.nameDE}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default PokemonCell;
