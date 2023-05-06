### 7. 💯 reset the error boundary

[Production deploy](https://react-hooks.netlify.app/isolated/final/06.extra-7.js)

You may have noticed a problem with the way we're resetting the internal state
of the `ErrorBoundary` using the `key`. Unfortunately, we're not only
re-mounting the `ErrorBoundary`, we're also re-mounting the `PokemonInfo` which
results in a flash of the initial "Submit a pokemon" state whenever we change
our pokemon.



## Fixed

When `pokemonName` exists, `status` should be `pending` instead of `idle`  

```jsx
function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    // status: 'idle', // <------- before fix
    status: pokemonName ? 'pending' : 'idle', // <------- fixed here
    pokemon: null,
    error: null
  })

  const {status, pokemon, error} = state

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setState({status: 'pending'})
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

```

