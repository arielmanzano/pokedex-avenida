import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Grid, List, ListItem, ListItemText, Typography, Card, CardMedia, CardContent, Avatar } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getPokemon } from '../state/actions'
import { ArrowForwardIos } from '@mui/icons-material'

import './PokemonDetail.css'
import { Spinner } from '../components/Spinner'

function useWindowSize() {
    const [width, setWidth] = useState(0);
    useLayoutEffect(() => {
      function updateWidth() {
        setWidth(window.innerWidth);
      }
      window.addEventListener('resize', updateWidth);
      updateWidth();
      return () => window.removeEventListener('resize', updateWidth);
    }, []);
    return width;
  }

const PokemonDetail = () => {
  const dispatch = useDispatch()
  let { id } = useParams()

  useEffect(() => {
    if (id) dispatch(getPokemon(id))
  }, [dispatch, id])

  const width = useWindowSize();

  const { isLoading, currentEntity } = useSelector((state) => state.pokemons)

  const parseId = (id) => {
    if (id > 99) return `${id}`
    if (id < 99 && id > 9) return `0${id}`
    if (id <= 9) return `00${id}`
  }

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }

  const renderEvolution = () => {
    const evolution = [...currentEntity.evolution]

    if (evolution.length === 2) {
      evolution.splice(1, 0, { isArrow: true })
    } else if (evolution.length === 3) {
      evolution.splice(1, 0, { isArrow: true })
      evolution.splice(3, 0, { isArrow: true })
    }
    return evolution.map((pokemon) => {
      if (pokemon.isArrow) {
        return (
          <Grid item container xs={12} sm={1} justifyContent='center' alignItems='center'>
            <ArrowForwardIos fontSize='large' sx={{ color: '#fff' }} className={width < 600 ? 'rotate-arrow' : ''} />
          </Grid>
        )
      }
      return (
        <Grid item xs={12} sm={3}>
          <Card style={{ backgroundColor: 'transparent', boxShadow: 'none', marginLeft: '12.5%', width: '75%' }}>
            <CardMedia
              style={{ borderRadius: '100%', backgroundColor: '#212121', borderWidth: 5, borderColor: 'white' }}
              component='img'
              width='50%'
              height='auto'
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${parseId(pokemon.id)}.png`}
              alt={`${pokemon.name}`}
            />
            <CardContent>
              <Typography gutterBottom className='id' variant='body2' component='p' align='center'>
                #{parseId(pokemon.id)}
              </Typography>
              <Typography gutterBottom variant='h6' component='h6' align='center'>
                {toTitleCase(pokemon.name)}
              </Typography>
              <Grid container justifyContent='center' spacing={0.5}>
                {pokemon.types.map((e) => {
                  return (
                    <Grid xs={Math.trunc(12 / pokemon.types.length) - 1} sm={12} md={5} className={`label ${e.type.name}`}>
                      {toTitleCase(e.type.name)}
                    </Grid>
                  )
                })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )
    })
  }

  const renderStat = () => {
    return <Grid container justifyContent='center' spacing={0.5}>
        <Grid item xs={12} style={{ maxHeight: '1.5em' }}>
            <Typography variant='h6' gutterBottom component='div'>
            Stats
            </Typography>
        </Grid>
            <Grid item xs={12}>
                <List>
                <ListItem >
                    {currentEntity.stats.map((s) => {
                        return <ListItemText alignItems="center" primary={s.stat.name.toUpperCase().replace('-', ' ')} secondary={s.base_stat} sx={{ justifyContent: 'center'}} />
                        
                    })}
                </ListItem>
                </List>
            </Grid>
    </Grid>
  }

  console.log(currentEntity)
  return (
    <>
      {isLoading && <Spinner />}
      {currentEntity && (
        <div style={{ width: '85%', height: 'auto', marginLeft: '7.5%', backgroundColor: '#fafafa', alignItems: 'center' }}>
            <h1 className='title'>{`${toTitleCase(currentEntity.name)} #${currentEntity.id}`}</h1>
          <Grid container  spacing={5}>
            <Grid item xs={12} sm={6}>
              {id && <img style={{ width: '100%', height: 'auto' }} src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${parseId(currentEntity.id)}.png`} alt={`${currentEntity.name}`} />}
            </Grid>
            <Grid container item xs={12} sm={6} spacing={1}>
              {currentEntity.specie.flavor_text_entries
                .filter((e) => {
                  return e.language.name === 'en' && e.version.name === 'red'
                })
                .map((e) => {
                  return (
                    <Typography variant='body1' gutterBottom>
                      {e.flavor_text}
                    </Typography>
                  )
                })}
              <Grid container item xs={12} style={{ backgroundColor: '#30a7d7', borderRadius: 10, color: '#fff', height: 'fit-content' }}>
                <Grid item xs={6}>
                  <ListItem>
                    <ListItemText primary='Height' secondary={currentEntity.height} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary='Weight' secondary={currentEntity.weight} />
                  </ListItem>
                  <ListItem>
                    <List>
                      <ListItemText primary='Ability' />
                      {currentEntity.abilities.map((a) => {
                        return <ListItemText secondary={`${toTitleCase(a.ability.name)}`} />
                      })}
                    </List>
                  </ListItem>
                </Grid>
                <Grid item xs={6}>
                  <ListItem>
                    <ListItemText primary='Height' secondary={currentEntity.height} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary='Weight' secondary={currentEntity.weight} />
                  </ListItem>
                  <ListItem>
                    <List>
                      <ListItemText primary='Ability' />
                      {currentEntity.abilities.map((a) => {
                        return <ListItemText secondary={`${toTitleCase(a.ability.name)}`} />
                      })}
                    </List>
                  </ListItem>
                </Grid>
              </Grid>
              <Grid container item spacing={1}>
                <Grid item xs={12} style={{ maxHeight: '1.5em' }}>
                  <Typography variant='h6' gutterBottom component='div'>
                    Types
                  </Typography>
                </Grid>
                {currentEntity.types.map((e) => {
                  return (
                    <Grid item xs={4} className={`label ${e.type.name}`}>
                      {toTitleCase(e.type.name)}
                    </Grid>
                  )
                })}
              </Grid>
              
            </Grid>
            <Grid container item xs={12} style={{ backgroundColor: '#616161', borderRadius: 10 }} justifyContent='center'>
              {renderEvolution()}
            </Grid>
            {renderStat()}
          </Grid>
        </div>
      )}
    </>
  )
}

export default PokemonDetail
