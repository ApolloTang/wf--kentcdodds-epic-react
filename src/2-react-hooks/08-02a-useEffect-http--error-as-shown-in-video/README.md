# 08-02a-useEffect-http--error-as-shown-in-video

The bug as shown in the video is because `error` has "hijacked" the UI (at line 18 below). If previous fetch failed, the error message will block the current fetch, even if current fetch is successful. To fix this the error message must be cleared prior to a new fetch (at line 10 below).

```js
function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setPokemon(null)
    // setError(null)    // <---- turn off resetting error, prior to new fetching.
    fetchPokemon(pokemonName).then(
      pokemon => setPokemon(pokemon),
      error => setError(error)
    )
  }, [pokemonName])

  console.log('error:', error);
  if (error) {  // <------------- error has hijacked the UI
    return (
      <div role="alert">
        There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  } else if (!pokemonName) {
    return 'Submit a pokemon'
  } else if (!pokemon) {
    return <PokemonInfoFallback name={pokemonName} />
  } else {
    return <PokemonDataView pokemon={pokemon} />
  }
}
```



