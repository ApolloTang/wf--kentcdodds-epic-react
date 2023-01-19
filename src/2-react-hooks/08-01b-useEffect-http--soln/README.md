# useEffect: HTTP requests

## 📝 Your Notes

Elaborate on your learnings here in `src/exercise/06.md`

## Background

HTTP requests are another common side-effect that we need to do in applications.
This is no different from the side-effects we need to apply to a rendered DOM or
when interacting with browser APIs like localStorage. In all these cases, we do
that within a `useEffect` hook callback. This hook allows us to ensure that
whenever certain changes take place, we apply the side-effects based on those
changes.

One important thing to note about the `useEffect` hook is that you cannot return
anything other than the cleanup function. This has interesting implications with
regard to async/await syntax:

```javascript
// this does not work, don't do this:
React.useEffect(async () => {
  const result = await doSomeAsyncThing()
  // do something with the result
})
```

The reason this doesn't work is because when you make a function async, it
automatically returns a promise (whether you're not returning anything at all,
or explicitly returning a function). This is due to the semantics of async/await
syntax. So if you want to use async/await, the best way to do that is like so:

```javascript
React.useEffect(() => {
  async function effect() {
    const result = await doSomeAsyncThing()
    // do something with the result
  }
  effect()
})
```

This ensures that you don't return anything but a cleanup function.

🦉 I find that it's typically just easier to extract all the async code into a
utility function which I call and then use the promise-based `.then` method
instead of using async/await syntax:

```javascript
React.useEffect(() => {
  doSomeAsyncThing().then(result => {
    // do something with the result
  })
})
```

But how you prefer to do this is totally up to you :)

## Exercise

Production deploys:

- [Exercise](https://react-hooks.netlify.app/isolated/exercise/06.js)
- [Final](https://react-hooks.netlify.app/isolated/final/06.js)

In this exercise, we'll be doing data fetching directly in a useEffect hook
callback within our component.

Here we have a form where users can enter the name of a pokemon and fetch data
about that pokemon. Your job will be to create a component which makes that
fetch request. When the user submits a pokemon name, our `PokemonInfo` component
will get re-rendered with the `pokemonName`



