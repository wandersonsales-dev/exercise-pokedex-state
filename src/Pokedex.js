import React from "react";
import pokemons from "./data";
import Pokemon from "./Pokemon";
import Button from './Button';
import './Pokedex.css';

class Pokedex extends React.Component {
  constructor() {
    super();

    this.typesOfPokemon = [
      "All", ...new Set(pokemons.map((pokemon) => pokemon.type)),
    ].sort();

    this.typeSelected = 'All';

    this.state = {
      typeSelected: this.typeSelected,
      pokemons: this.typeSelected !== 'All' ? pokemons.filter((pokemon) => pokemon.type === this.typeSelected) : pokemons,
      pokemonLength: this.typeSelected !== 'All' ? pokemons.filter((pokemon) => pokemon.type === this.typeSelected).length : pokemons.length,
      currentIndex: 0,
    };
    
    this.nextPokemon = this.nextPokemon.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.checkButton = this.checkButton.bind(this);
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
      pokemons: value !== 'All' ? pokemons.filter((pokemon) => pokemon.type === value): pokemons,
      pokemonLength: value !== 'All' ? pokemons.filter((pokemon) => pokemon.type === value).length: pokemons.length,
      currentIndex: 0
    });
  }

  checkButton() {
    const el = document.querySelector('.next button');
    if(el){
      if(this.state.pokemons.length <= 1) {
        el.disabled = true;
      } else {
        el.disabled = false;
      }
    }
  }

  render() {
    return (
      <div className="pokedex">
        <Pokemon
          key={this.state.pokemons[this.state.currentIndex].id}
          pokemon={this.state.pokemons[this.state.currentIndex]}
        />
        <div className="buttons">
          {
            this.typesOfPokemon.map((type, index) => 
              <Button
                key={index}
                value={type}
                handleChangeType={this.handleChangeType}
              />)
          }
        </div>
        <div className="next">
          <button
            onClick={this.nextPokemon}
          >
            {this.checkButton()}
            Next Pokemon
          </button>
        </div>
      </div>
    );
  }
}

export default Pokedex;
