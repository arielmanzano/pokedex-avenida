import { combineReducers } from "redux";
import { pokemonReducer } from "./pokemonReducer";

export const reducers = combineReducers({
  pokemons: pokemonReducer,
});
