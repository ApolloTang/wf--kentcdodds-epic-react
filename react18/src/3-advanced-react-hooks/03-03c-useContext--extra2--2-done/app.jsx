// useContext: Caching response data in context
// 💯 caching in a context provider (final)
// http://localhost:3000/isolated/final/03.extra-2.js

// you can edit this here and look at the isolated page or you can copy/paste
// this in the regular exercise file.

import * as React from 'react'
import {useAsync} from './utils'
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from './pokemon'



/*
  Put useReduce into React context. The purpose of this reducer is
  to cache previously fetched pokemon.
*/
const PokemonCacheContext = React.createContext()

function pokemonCacheReducer(state, action) {
  switch (action.type) {
    case 'ADD_POKEMON': {
      return {
        ...state,
        [action.pokemonName]: action.pokemonData // <--- this is the cached pokemon dictionary
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function PokemonCacheProvider(props) {
  const [cache, dispatch] = React.useReducer(pokemonCacheReducer, {})
  return <PokemonCacheContext.Provider value={[cache, dispatch]} {...props} />
}

function usePokemonCache() {
  const context = React.useContext(PokemonCacheContext)
  if (!context) {
    throw new Error(
      'usePokemonCache must be used within a PokemonCacheProvider',
    )
  }
  return context
}





/*
  There are two reducers in this app. One is reside in `useAsync`, and
  the other is in the ReactContext (accessibale via `usePokemonCache`).

  The main task of the reducer in `useAsync` is to handle the fetch state. The
  `run` API of useAsync let you execute custom http promise (`fetchPokemon()`
  in this case).

  When the custom http promise resolved, it will engage the second reducer to
  save the fetched pokemon inside the pokemon cache. The pokemon cache is a
  dictionary object inside the reducer.
  */
function PokemonInfo({pokemonName: externalPokemonName}) {
  const [cache, dispatch] = usePokemonCache()

  const pokemonName = externalPokemonName?.toLowerCase()
  const {data: pokemon, status, error, run, setData} = useAsync({
    status: pokemonName ? 'pending' : 'idle',
  })

  React.useEffect(() => {
    if (!pokemonName) {
      return
    } else if (cache[pokemonName]) {
      setData(cache[pokemonName])   //  <----- see explaination in util.js
    } else {
      run(
        fetchPokemon(pokemonName).then(pokemonData => {
          dispatch({type: 'ADD_POKEMON', pokemonName, pokemonData})
          return pokemonData
        }),
      )
    }
  }, [cache, dispatch, pokemonName, run, setData])

  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }

  throw new Error('This should be impossible')
}




/*
  The component `PreviousPokemon` is a presentation component
  showing a catalogue for the cached pokemon saved in the reducer (made avalaiable
  throughout the app via of React context).
 */
function PreviousPokemon({onSelect}) {
  const [cache] = usePokemonCache()
  return (
    <div>
      Previous Pokemon
      <ul style={{listStyle: 'none', paddingLeft: 0}}>
        {Object.keys(cache).map(pokemonName => (
          <li key={pokemonName} style={{margin: '4px auto'}}>
            <button
              style={{width: '100%'}}
              onClick={() => onSelect(pokemonName)}
            >
              {pokemonName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}



/*
 The component `PokemonSection` consist of detailed view
 and pokemon http fetch mechanism. It also has a form to
 let user enter the name of pokemon wishes to view.
*/
function PokemonSection({onSelect, pokemonName}) {
  return (
    <PokemonCacheProvider>
      <div style={{display: 'flex'}}>
        <PreviousPokemon onSelect={onSelect} />
        <div className="pokemon-info">
          <PokemonErrorBoundary
            onReset={() => onSelect('')}
            resetKeys={[pokemonName]}
          >
            <PokemonInfo pokemonName={pokemonName} />
          </PokemonErrorBoundary>
        </div>
      </div>
    </PokemonCacheProvider>
  )
}



function App() {
  const [pokemonName, setPokemonName] = React.useState(null)

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleSelect(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <PokemonSection onSelect={handleSelect} pokemonName={pokemonName} />
    </div>
  )
}

export default App
