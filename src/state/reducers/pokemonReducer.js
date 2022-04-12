import { FETCH_POKEMON_FULFILL, IS_PENDING, FETCH_POKEMON_REJECT, GET_POKEMON} from '../constanst';

const initialState = {
	//Pokemons
	isLoading: false,
	entities: [],
	currentEntity: null,
	errorMessage: null,
}
export const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
		case IS_PENDING:
			return { ...state, isLoading: true, errorMessage: null, currentEntity: null, entities: [] }
		case FETCH_POKEMON_FULFILL:
			return { ...state, entities: [...action.payload], isLoading: false }
		case FETCH_POKEMON_REJECT:
			return { ...state, errorMessage: action.payload, isLoading: false }
		case GET_POKEMON:
			return { ...state, isLoading: false, currentEntity: action.payload }
        default:
			return state
    }
 }