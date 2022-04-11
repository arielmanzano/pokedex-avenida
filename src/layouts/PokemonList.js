import { useSelector } from "react-redux";
import { Grid , Card, CardActionArea, CardContent, CardMedia, Typography} from '@material-ui/core';


export const PokemonList = () => {
    const { isLoading, fetchErrorMessage, entities } = useSelector(
        (state) => state.pokemons
    );

    const getId = ({ id }) => {
        if(id > 99) return `${id}`;
        if(id < 99 && id > 9) return `0${id}`;
        if(id <= 9) return `00${id}`;
    }

    return (
      <Grid container style={{ width: '100%' }} spacing={1}>
        {entities.map((pokemon) => {
          console.log(pokemon)
          return (
            <Grid container item xs={12} spacing={3}>
              <Card>
                <CardActionArea>
                  <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${getId(pokemon)}.png`} alt='' />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {pokemon.name}
                    </Typography>
                    <Typography variant='body2' color='textSecondary' component='p'>
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    )
};