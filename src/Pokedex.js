import React from "react";
import pokemons from "./data";
import Pokemon from "./Pokemon";

class Pokedex extends React.Component {
  constructor() {
    super();

    this.typesOfPokemon = [
      "All", ...new Set(pokemons.map((pokemon) => pokemon.type)),
    ].sort();

    this.typeSelected = 'Fire';

    this.state = {
      typeSelected: this.typeSelected,
      pokemons: pokemons.filter((pokemon) => pokemon.type === this.typeSelected),
      pokemonLength: pokemons.filter((pokemon) => pokemon.type === this.typeSelected).length,
      currentIndex: 0,
    };
    
    this.nextPokemon = this.nextPokemon.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
  }

  nextPokemon() {
    this.setState((previuosState, _props) => {
      const { currentIndex, pokemonLength } = previuosState;
      const indexAtual =
        currentIndex === pokemonLength - 1 ? 0 : currentIndex + 1;
      return { ...previuosState, currentIndex: indexAtual };
    });
  }

  handleChangeType(event) {
    const { value } = event.target;
    this.setState({
      typeSelected: value,
      pokemons: pokemons.filter((pokemon) => pokemon.type === value),
      pokemonLength: pokemons.filter((pokemon) => pokemon.type === value).length,
    });
  }

  render() {
    return (
      <div className="pokedex">
        <Pokemon
          key={this.state.pokemons[this.state.currentIndex].id}
          pokemon={this.state.pokemons[this.state.currentIndex]}
        />
        <div className="buttons">
          <button onClick={this.nextPokemon}> Next Pokemon</button>
          <button onClick={this.handleChangeType} value="Fire">Fire</button>
          <button onClick={this.handleChangeType} value="Psychic">Psychic</button>
        </div>
      </div>
    );
  }
}

export default Pokedex;
