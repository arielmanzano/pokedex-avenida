import React from 'react'
import { Grid, Typography, Card, CardMedia, CardContent } from '@material-ui/core'
import { ArrowForwardIos } from '@mui/icons-material'

import { parseId, toTitleCase } from '../shared/utils'
import useWindowSize from '../../hooks/useWindowsSize'

const PokemonEvolution = ({ evolution }) => {
  const width = useWindowSize()

  const isLastInArray = (array, element) => {
    return array.indexOf(element) === array.length - 1
  }

  return (
    <>
    <Grid item xs={12}>
      <h3 className='subtitle'>Evolution</h3>
    </Grid>
      {evolution.map((pokemon) => {
        return (
          <>
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
            {!isLastInArray(evolution, pokemon) && (
              <Grid item container xs={12} sm={1} justifyContent='center' alignItems='center'>
                <ArrowForwardIos fontSize='large' sx={{ color: '#fff' }} className={width < 600 ? 'rotate-arrow' : ''} />
              </Grid>
            )}
          </>
        )
      })}
    </>
  )
}

export default PokemonEvolution
