### 7. 💯 reset the error boundary (part 2)

[Production deploy](https://react-hooks.netlify.app/isolated/final/06.extra-7.js)

So let's backtrack on that and instead we'll use `react-error-boundary`'s
`resetErrorBoundary` function (which will be passed to our `ErrorFallback`
component) to reset the state of the `ErrorBoundary` when the user clicks a "try
again" button.

> 💰 feel free to open up the finished version by clicking the link in the app
> so you can get an idea of how this is supposed to work.

Once you have this button wired up, we need to react to this reset of the
`ErrorBoundary`'s state by resetting our own state so we don't wind up
triggering the error again. To do this we can use the `onReset` prop of the
`ErrorBoundary`. In that function we can simply `setPokemonName` to an empty
string.
