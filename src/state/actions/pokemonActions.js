import axios from '../../api';
import _ from 'lodash';
import { FETCH_POKEMON_REJECT, FETCH_POKEMON_FULFILL, IS_PENDING, GET_POKEMON_FULFILL, GET_POKEMON_REJECT } from '../constanst';

export const fetchPokemons = (paramaters) => async (dispatch) => {
	try {
		dispatch({ type: IS_PENDING });
		const pokemons = await axios.get(`/api/v2/pokemon?${paramaters}`);
		const promises = pokemons.data.results.map((pokemon) => axios.get(`/api/v2/pokemon/${pokemon.name}`));

		const result = await Promise.all(promises);
		dispatch({
			type: FETCH_POKEMON_FULFILL,
			payload: result.map((r) => r.data ),
		});
	}
	catch(e) {
		dispatch({
			type: FETCH_POKEMON_REJECT,
			payload: 'There was a problem loading the pokemons.',
		});
	}
}

let allPokemons;
export const getPokemon = (id) => async (dispatch) => {
	try {
		dispatch({ type: IS_PENDING });
		const pokemon = await axios.get(`/api/v2/pokemon/${id}`)
		pokemon.data.specie = (await axios.get(`/api/v2/pokemon-species/${id}`)).data
		const evolutionId = pokemon.data.specie.evolution_chain.url.split('/').slice(-2, -1);
		const evolutionChain = (await axios.get(`/api/v2/evolution-chain/${evolutionId}`)).data

		allPokemons = [];
		pokemon.data.evolution = await _parseEvolutionChain(evolutionChain.chain);
		dispatch({
			type: GET_POKEMON_FULFILL,
			payload: pokemon.data,
		});
	} catch(e) {
		dispatch({
			type: GET_POKEMON_REJECT,
			payload: 'There was a problem loading the Pokemon detail.',
		});
	}
}

const _parseEvolutionChain = async (evolutionChain) => {
	if(evolutionChain.evolves_to.length > 0) {
		const pokemonsProm = evolutionChain.evolves_to.map((e) => {
			return _parseEvolutionChain(e);
		});
		await Promise.all(pokemonsProm);
	}

	const pokemon = (await axios.get(`/api/v2/pokemon/${evolutionChain.species.name}`)).data;
	allPokemons.unshift(pokemon);
	return _.uniqBy(allPokemons, 'id');
}