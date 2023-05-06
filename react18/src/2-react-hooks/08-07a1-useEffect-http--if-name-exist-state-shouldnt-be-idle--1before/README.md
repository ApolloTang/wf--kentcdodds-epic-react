### 7. 💯 reset the error boundary

[Production deploy](https://react-hooks.netlify.app/isolated/final/06.extra-7.js)

You may have noticed a problem with the way we're resetting the internal state
of the `ErrorBoundary` using the `key`. Unfortunately, we're not only
re-mounting the `ErrorBoundary`, we're also re-mounting the `PokemonInfo` which
results in a flash of the initial "Submit a pokemon" state whenever we change
our pokemon.
