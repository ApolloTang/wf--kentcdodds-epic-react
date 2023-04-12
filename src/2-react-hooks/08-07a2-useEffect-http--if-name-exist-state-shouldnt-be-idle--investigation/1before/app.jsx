import React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from './pokemon'

const sleep = (ms) => new Promise(r=>{ setTimeout(()=>r(), ms) })

class ErrorBoundary extends React.Component {
  state = {error: null}
  static getDerivedStateFromError(error) {
    return {error}
  }

  componentDidUpdate() {
    console.log('componentDidUpdate')
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  render() {
    const {error} = this.state
    console.log('Error Boundary Rendering')
    if (error) {
      return <this.props.FallbackComponent error={error} />
    }

    return this.props.children
  }
}

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null
  })

  const {status, pokemon, error} = state
  console.log('in PokemonInfo -- status: ', status, ', pokemonName:', pokemonName)

  React.useEffect(()=>{
    console.log('PokemonInfo did mount')
    return () => {
      console.log('PokemonInfo cleanup 1')
    }
  }/* run after each render */)

  React.useEffect(() => {
    async function useEffectContent() {

      await sleep(3000)    // Pause so you can see the demo

      if (!pokemonName) {
        return
      }
      setState({status: 'pending'})
      console.log('in PokemonInfo -- fetching now')
      fetchPokemon(pokemonName).then(
        pokemon => {
          setState({
            pokemon,
            status: 'resolved'
          })
        },
        error => {
          setState({
             error,
             status: 'rejected'
          })
        },
      )
    }
    useEffectContent()

    return () => {
      console.log('PokemonInfo cleanup 2')
    }
  }, [pokemonName])

  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
     throw error
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  } else {
    throw new Error('This should be impossible')
  }
}


function ErrorFallback({error}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
}


function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    console.log('------ sumbit clicked -----')
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          key={pokemonName} /* <------  the key property ensure the ErrorBoundary Component is remount */
          FallbackComponent={ErrorFallback}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export {App}
