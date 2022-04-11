import axios from '../../api';
import { POKEMON_REJECT, POKEMON_FULFILL, POKEMON_PENDING } from '../constanst';

export const fetchPokemons = () => async (dispatch) => {
	try {
		dispatch({ type: POKEMON_PENDING })
		const pokemons = await axios.get('/api/v2/pokemon');
		const promises = pokemons.data.results.map((pokemon) => axios.get(`/api/v2/pokemon/${pokemon.name}`));

		const result = await Promise.all(promises);
		dispatch({
			type: POKEMON_FULFILL,
			payload: result.map((r) => r.data ),
		});
	}
	catch(e) {
		dispatch({
			type: POKEMON_REJECT,
			payload: 'Ha ocurrido un problema al cargar los pokemons.',
		});
	}
}
