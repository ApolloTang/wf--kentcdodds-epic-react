### 2. 💯 return a memoized `run` function from useAsync

[Production deploy](https://advanced-react-hooks.netlify.com/isolated/final/02.extra-2.js)

Requiring users to provide a memoized value is fine. You can document it as part
of the API and expect people to just read the docs right? lol, that's hilarious
😂 It'd be WAY better if we could redesign the API a bit so we (as the hook
developers) are the ones who have to memoize the function, and the users of our
hook don't have to worry about it.

So see if you can redesign this a little bit by providing a (memoized) `run`
function that people can call in their own `useEffect` like this:

```javascript
// 💰 destructuring this here now because it just felt weird to call this
// "state" still when it's also returning a function called "run" 🙃
const {data: pokemon, status, error, run} = useAsync({ status: pokemonName ? 'pending' : 'idle' })

React.useEffect(() => {
  if (!pokemonName) {
    return
  }
  // 💰 note the absence of `await` here. We're literally passing the promise
  // to `run` so `useAsync` can attach it's own `.then` handler on it to keep
  // track of the state of the promise.
  const pokemonPromise = fetchPokemon(pokemonName)
  run(pokemonPromise)
}, [pokemonName, run])
```



---

## My Note:

The interesting about component  `PokemonInfo` in this excercise is that despite it is using redux, there is no redux's dispatching code visible. 

```jsx
function PokemonInfo({pokemonName}) {
  const state = useAsync(
    {status: pokemonName ? 'pending' : 'idle'}
  )

  const {
    data: pokemon, status, error,
    runAsync
  } = state

  React.useEffect(
    () => {
      if (!pokemonName) { return }

      // note the absence of `await` here
      const fetchPromise = fetchPokemon(pokemonName)
      runAsync(fetchPromise)
    },
    [pokemonName, runAsync]
  )

  switch (status) {
    case 'idle':
      return <span>Submit a pokemon</span>
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'rejected':
      throw error
    case 'resolved':
      return <PokemonDataView pokemon={pokemon} />
    default:
      throw new Error('This should be impossible')
  }
}
```

All redux's dispatching code is hidden in the `useAsync` hook.  This `useAsync` return a method `runAsync` which you can pass in your own "fetch promise" (`fetchPromise`). Note that the "fetch promise" is unaware of any using of redux mechanism.  

```jsx
function useAsync(initialState) {
  const [state, dispatch] = React.useReducer(
    asyncReducer,
    { status: 'idle', data: null, error: null, ...initialState }
  )

  const runAsync = React.useCallback(
    promise => {
      dispatch({type: 'pending'})
      promise.then(
        data => { dispatch({type: 'resolved', data}) },
        error => { dispatch({type: 'rejected', error}) },
      )
    }, []
  )

  return {...state, runAsync}
}
```



