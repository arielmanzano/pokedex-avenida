import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { PokemonList } from '../layouts/PokemonList';
import { fetchPokemons } from '../state/actions';

export const PokemonListRoute = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPokemons());
	}, [])

	return (
		<>
			<PokemonList />
		</>
	);
}
