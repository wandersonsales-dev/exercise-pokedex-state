import React from "react";
import pokemons from "./data";
import Pokemon from "./Pokemon";

class Pokedex extends React.Component {
  constructor() {
    super();

    this.typesOfPokemon = [
      "All", ...new Set(pokemons.map((pokemon) => pokemon.type)),
    ].sort();

    this.state = {
      pokemons: pokemons,
      pokemonLength: pokemons.length,
      currentIndex: 0,
    };
    
    this.nextPokemon = this.nextPokemon.bind(this);
    console.log(this.typesOfPokemon);
  }

  nextPokemon() {
    this.setState((previuosState, _props) => {
      const { currentIndex, pokemonLength } = previuosState;
      const indexAtual =
        currentIndex === pokemonLength - 1 ? 0 : currentIndex + 1;
      return { ...previuosState, currentIndex: indexAtual };
    });
  }
  render() {
    return (
      <div className="pokedex">
        <Pokemon
          key={this.state.pokemons[this.state.currentIndex].id}
          pokemon={this.state.pokemons[this.state.currentIndex]}
        />
        <button onClick={this.nextPokemon}> Next Pokemon</button>
      </div>
    );
  }
}

export default Pokedex;
