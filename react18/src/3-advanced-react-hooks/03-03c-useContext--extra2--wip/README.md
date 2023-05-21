file: `App.js`

```jsx
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
```







file: `App.js`
```jsx
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
```

'



file: `utils.js`

```js
function useAsync(initialState) {
  const [state, unsafeDispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  })

  const dispatch = useSafeDispatch(unsafeDispatch)

  const {data, error, status} = state

  const run = React.useCallback(
    promise => {
      dispatch({type: 'pending'})
      promise.then(
        data => {
          dispatch({type: 'resolved', data})
        },
        error => {
          dispatch({type: 'rejected', error})
        },
      )
    },
    [dispatch],
  )

  // Normally 'resolved' is dispatched automatically when
  // an http is successful, but we expose an API (setData)
  // so we can dispatch 'resolved' externally (in this case,
  // instead of waiting for http to resolve, we maually dispatch with
  // data from cache).
  const setData = React.useCallback(
    data => dispatch({type: 'resolved', data}),
    [dispatch],
  )
  const setError = React.useCallback(
    error => dispatch({type: 'rejected', error}),
    [dispatch],
  )

  return {
    setData,
    setError,
    error,
    status,
    data,
    run,
  }
}

```

