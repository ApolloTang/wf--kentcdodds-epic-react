# useEffect: HTTP requests

### 3. 💯 store the state in an object

[Production deploy](https://react-hooks.netlify.app/isolated/final/06.extra-3.js)

You'll notice that we're calling a bunch of state updaters in a row. This is
normally not a problem, but each call to our state updater can result in a
re-render of our component. React normally batches these calls so you only get a
single re-render, but it's unable to do this in an asynchronous callback (like
our promise success and error handlers).

So you might notice that if you do this:

```javascript
setStatus('resolved')
setPokemon(pokemon)
```

You'll get an error indicating that you cannot read `image` of `null`. This is
because the `setStatus` call results in a re-render that happens before the
`setPokemon` happens.

> but it's unable to do this in an asynchronous callback

This is no longer the case in React 18 as it supports automatic batching for asynchronous callback too. 

Learn more about this concept here:
https://reactjs.org/blog/2022/03/29/react-v18.html#new-feature-automatic-batching

Still it is better to maintain closely related states as an object rather than maintaining them using individual useState hooks.

Learn more about this concept here:
https://kentcdodds.com/blog/should-i-usestate-or-usereducer#conclusion

In the future, you'll learn about how `useReducer` can solve this problem really
elegantly, but we can still accomplish this by storing our state as an object
that has all the properties of state we're managing.

See if you can figure out how to store all of your state in a single object with
a single `React.useState` call so I can update my state like this:

```javascript
setState({status: 'resolved', pokemon})
```

