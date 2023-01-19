

## Extra Credit

### 1. 💯 handle errors

[Production deploy](https://react-hooks.netlify.app/isolated/final/06.extra-1.js)

Unfortunately, sometimes things go wrong and we need to handle errors when they
do so we can show the user useful information. Handle that error and render it
out like so:

```jsx
<div role="alert">
  There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
</div>
```

You can make an error happen by typing an incorrect pokemon name into the input.

One common question I get about this extra credit is how to handle promise
errors. There are two ways to do it in this extra credit:

```javascript
// option 1: using .catch
fetchPokemon(pokemonName)
  .then(pokemon => setPokemon(pokemon))
  .catch(error => setError(error))

// option 2: using the second argument to .then
fetchPokemon(pokemonName).then(
  pokemon => setPokemon(pokemon),
  error => setError(error),
)
```

These are functionally equivalent for our purposes, but they are semantically
different in general.

Using `.catch` means that you'll handle an error in the `fetchPokemon` promise,
but you'll _also_ handle an error in the `setPokemon(pokemon)` call as well.
This is due to the semantics of how promises work.

Using the second argument to `.then` means that you will catch an error that
happens in `fetchPokemon` only. In this case, I knew that calling `setPokemon`
would not throw an error (React handles errors and we have an API to catch those
which we'll use later), so I decided to go with the second argument option.

However, in this situation, it doesn't really make much of a difference. If you
want to go with the safe option, then opt for `.catch`.

