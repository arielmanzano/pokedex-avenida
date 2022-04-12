import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Grid, Card, CardContent, CardMedia, Typography, TextField, Button } from '@material-ui/core'

import { fetchPokemons } from '../state/actions'

import './PokemonList.css'
import { Spinner } from '../components/Spinner'
import PaginationComponent from './screens/Pagination'
import { parseId, toTitleCase } from './shared/utils'
import { ErrorMessageAlert } from '../components/ErrorMessageAlert'

const PokemonList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = React.useState('')
  const handleChange = (event) => {
    setName(event.target.value)
  }

  useEffect(() => {
    dispatch(fetchPokemons('limit=20&offset=0'))
  }, [dispatch])

  const search = () => {
    navigate(`/pokedex/${name.toLowerCase()}`)
  }

  const { isLoading, errorMessage, entities } = useSelector((state) => state.pokemons)

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      search()
    }
  }

  return (
    <div className='container-list'>
      {errorMessage && <ErrorMessageAlert message={errorMessage} />}
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 className='title'>
            <span>
              <img src='https://assets.pokemon.com/static2/_ui/img/favicon.ico' alt='pokebola_1' />
            </span>
            Welcome to Avenida+ Pokedex!
            <span>
              <img src='https://assets.pokemon.com/static2/_ui/img/favicon.ico' alt='pokebola_2' />
            </span>
          </h1>

          <Grid container alignItems='center'>
            <Grid xs={9} md={4}>
              <TextField label='Search Pokemon by ID or Name' value={name} onChange={handleChange} onKeyPress={handleKeyPress} style={{ width: '100%' }} />
            </Grid>
            <Grid xs={3}>
              <Button variant='contained' style={{ backgroundColor: '#ee6b2f', color: '#fff' }} onClick={search}>
                Search
              </Button>
            </Grid>
          </Grid>

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
          </Grid>
        </>
      )}
      {!errorMessage && <PaginationComponent />}
    </div>
  )
}

export default PokemonList
