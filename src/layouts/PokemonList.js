import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Grid , Card, CardContent, CardMedia, Typography} from '@material-ui/core';

import { fetchPokemons } from '../state/actions';

import './PokemonList.css';
import { Spinner } from '../components/Spinner';


const PokemonList = () => {
    
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchPokemons());
    }, [dispatch])

    const { isLoading, fetchErrorMessage, entities } = useSelector(
        (state) => state.pokemons
    );

    const parseId = (id) => {
        if(id > 99) return `${id}`;
        if(id < 99 && id > 9) return `0${id}`;
        if(id <= 9) return `00${id}`;
    }

    function toTitleCase(str) {
      return str.replace(
        /\w\S*/g,
        function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
      );
    }

    return (
      <>
       { isLoading ? 
          <Spinner /> :
          <Grid container spacing={1}>
          {entities.map((pokemon) => {
            return (
              <Grid item xs={12} sm={6} md={3} spacing={2}>
                <Card>
                  <Link to={`/pokedex/${pokemon.id}`}>
                    <CardMedia component='img' width='100%' height='auto' src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${parseId(pokemon.id)}.png`} alt={`${pokemon.name}`} />
                  </Link>
                  <CardContent>
                    <Typography gutterBottom className='id' variant='body2' component='p'>
                      #{parseId(pokemon.id)}
                    </Typography>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {toTitleCase(pokemon.name)}
                    </Typography>
                    <Grid container>
                      {pokemon.types.map((e) => {
                        return (
                          <Grid xs={4} className={`label ${e.type.name}`}>
                            {toTitleCase(e.type.name)}
                          </Grid>
                        )
                      })}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>}
      </>
      
    )
};

export default PokemonList;