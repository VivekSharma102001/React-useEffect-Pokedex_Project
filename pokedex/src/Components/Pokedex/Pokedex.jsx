import Search from "../Search/Search"
import './Pokedex.css';
import PokemoneList from "../PokemonList/PokemonList";
function Pokedex() {
    return (
        <>
            <div className="pokedex-wraper">
                <h1>Pokedex</h1>
                <Search />  
                <PokemoneList/>                
            </div>
           
        </>
    )
}
export default Pokedex