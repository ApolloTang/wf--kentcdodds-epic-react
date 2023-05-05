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

