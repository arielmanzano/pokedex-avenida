import React, { useEffect } from 'react'
import { Grid, List, ListItem, ListItemText, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'


import './PokemonDetail.css'

import { getPokemon } from '../state/actions'
import { Spinner } from '../components/Spinner'
import PokemonEvolution from './screens/PokemonEvolution'
import { parseId, toTitleCase } from './shared/utils'
import { ErrorMessageAlert } from '../components/ErrorMessageAlert'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const PokemonDetail = () => {
  const dispatch = useDispatch()
  let { id } = useParams()

  useEffect(() => {
    if (id) dispatch(getPokemon(id))
  }, [dispatch, id])

  const { isLoading, errorMessage, currentEntity } = useSelector((state) => state.pokemons)

  const renderEvolution = () => {
    const evolution = _.cloneDeep(currentEntity.evolution)

    return <PokemonEvolution evolution={evolution} />
  }

  const renderStat = () => {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Stats',
        },
      },
      scales: {
        y: {
          max: 250,
        },
      },
    }

    const labels = currentEntity.stats.map((s) => {
      const name = s.stat.name
      return name.toUpperCase().replace('-', ' ')
    })

    const data = {
      labels,
      datasets: [
        {
          label: toTitleCase(currentEntity.name),
          data: currentEntity.stats.map((s) => s.base_stat),
          backgroundColor: ['#E3350D', '#ee6b2f', '#e6bc2f', '#4dad5b', '#30a7d7', '#1b53ba'],
        },
      ],
    }
    return <Bar options={options} data={data} />
  }

  const renderOverview = ({ primary, secondary }) => {
    if (_.isArray(secondary)) {
      return (
        <Grid item xs={6}>
          <ListItem>
            <List>
              <ListItemText primary={primary} />
              {secondary.map((a) => {
                return <ListItemText secondary={`${toTitleCase(a)}`} />
              })}
            </List>
          </ListItem>
        </Grid>
      )
    }
    return (
      <Grid item xs={6}>
        <ListItem>
          <ListItemText primary={primary} secondary={secondary} />
        </ListItem>
      </Grid>
    )
  }

  return (
    <>
      {isLoading && <Spinner />}
      {errorMessage && (
          <ErrorMessageAlert message={errorMessage} />
        )}
      {currentEntity && (
        <div className='container-detail'>
          <h1 className='title'>{`${toTitleCase(currentEntity.name)} #${currentEntity.id}`}</h1>
          <Grid container spacing={5} alignItems='center'>
            <Grid container item xs={12} sm={6}>
              {id && <img className='image-responsive' src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${parseId(currentEntity.id)}.png`} alt={`${currentEntity.name}`} />}
              {currentEntity.types.map((e) => {
                return (
                  <Grid item xs={4} className={`label ${e.type.name}`}>
                    {toTitleCase(e.type.name)}
                  </Grid>
                )
              })}
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
              <Grid container item xs={12} className="overview-container">
                {renderOverview({ primary: 'Height', secondary: currentEntity.height })}
                {renderOverview({ primary: 'Weight', secondary: currentEntity.weight })}
                {renderOverview({ primary: 'Capture Rate', secondary: currentEntity.specie.capture_rate })}
                {renderOverview({ primary: 'Color', secondary: toTitleCase(currentEntity.specie.color.name) })}
                {renderOverview({ primary: 'Shape', secondary: toTitleCase(currentEntity.specie.shape.name) })}
                {renderOverview({ primary: 'Abilities', secondary: currentEntity.abilities.map((a) => a.ability.name) })}
              </Grid>
              <Grid item xs={12}>
                {renderStat()}
              </Grid>
            </Grid>

            <Grid container item xs={12} className="evolution-container" justifyContent='center'>
              {renderEvolution()}
            </Grid>
          </Grid>
        </div>
      )}
    </>
  )
}

export default PokemonDetail
