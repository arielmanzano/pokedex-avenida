import { POKEMON_FULFILL, POKEMON_PENDING, POKEMON_REJECT} from '../constanst';

const initialState = {
	//Pokemons
	isLoading: false,
	entities: [],
	currentEntity: null,
	errorMessage: null,
}
export const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
		case POKEMON_PENDING:
			return { ...state, isLoading: true, errorMessage: null }
		case POKEMON_FULFILL:
			return { ...state, entities: [...action.payload], isLoading: false }
		case POKEMON_REJECT:
			return { ...state, errorMessage: action.payload, isLoading: false }
        default:
			return state
    }
 }