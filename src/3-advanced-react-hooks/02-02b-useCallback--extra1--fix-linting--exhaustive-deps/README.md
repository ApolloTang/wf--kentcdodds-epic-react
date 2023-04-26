## Extra Credit

### 1. 💯 use useCallback to empower the user to customize memoization

[Production deploy](https://advanced-react-hooks.netlify.com/isolated/final/02.extra-1.js)

Unfortunately, the ESLint plugin is unable to determine whether the
`dependencies` argument is a valid argument for `useEffect` which is a shame,
and normally I'd say just ignore it and move on. But, there's another solution
to this problem which I think is probably better.

Instead of accepting `dependencies` to `useAsync`, why don't we just treat the
`asyncCallback` as a dependency? Any time `asyncCallback` changes, we know that
we should call it again. The problem is that because our `asyncCallback` depends
on the `pokemonName` which comes from props, it has to be defined within the
body of the component, which means that it will be defined on every render which
means it will be new every render. This is where `React.useCallback` comes in!

Here's another example of the `React.useCallback` API:

```javascript
function ConsoleGreeting(props) {
  const greet = React.useCallback(
    greeting => console.log(`${greeting} ${props.name}`),
    [props.name],
  )

  React.useEffect(() => {
    const helloGreeting = 'Hello'
    greet(helloGreeting)
  }, [greet])
  return <div>check the console</div>
}
```

The first argument to `useCallback` is the callback you want called, the second
argument is an array of dependencies which is similar to `useEffect`. When one
of the dependencies changes between renders, the callback you passed in the
first argument will be the one returned from `useCallback`. If they do not
change, then you'll get the callback which was returned the previous time (so
the callback remains the same between renders).

So we only want our `asyncCallback` to change when the `pokemonName` changes.
See if you can make things work like this:

```javascript
// 🐨 you'll need to wrap asyncCallback in React.useCallback
function asyncCallback() {
  if (!pokemonName) {
    return
  }
  return fetchPokemon(pokemonName)
}

// 🐨 you'll need to update useAsync to remove the dependencies and list the
// async callback as a dependency.
const state = useAsync(asyncCallback)
```

