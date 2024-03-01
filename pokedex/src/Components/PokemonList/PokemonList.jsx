import { useEffect, useState } from "react"
import axios from "axios";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemoneList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon'
    async function downloadPokemons() {
        const response = await axios.get(POKEDEX_URL); // This downloaded list of 20 pokemons

        const pokemonResults = response.data.results; // we grt the array of pokemons from result
        console.log(response.data);

        //iteratting over the array of pokemons, and using their url, to creat an array of promisses 
        // that will download those 20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url))

        //passing that promiss array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemon detailed data 

        console.log(pokemonData);
        // now iterate on the data of each pokemon, and extract id, name , image, types
        const res = (pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                // image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.front_shiny,
                types: pokemon.types,
            }
        }))
        console.log(res);
        setPokemonList(res);
        setIsLoading(false);
    }

    useEffect(() => {
        downloadPokemons();
    }, []);


    return (
        <div className="pokemonlist-wraper">
            <h2>Pokemone List</h2>
            <div className="pokemone-wrapper">
                {(isLoading) ? 'Loading....' :
                    pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} />)
                };
            </div>
            <div className="controls-btn">
                <button>Prev</button>
                <button>Next</button>
            </div>
        </div>
    )
}

export default PokemoneList