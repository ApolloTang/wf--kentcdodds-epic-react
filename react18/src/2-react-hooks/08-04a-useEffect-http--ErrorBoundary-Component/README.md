## Error Boundary Boilerplate

```js
class ErrorBoundary extends React.Component {
  state = {error: null}
  
  static getDerivedStateFromError(error) {  // See Note bellow for this static method
    return {error}
  }
  
  render() {
    const {error} = this.state
    if (error) {
      return <this.props.FallbackComponent error={error} />
    }

    return this.props.children
  }
}


function App() {
  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PokemonInfo pokemonName={pokemonName} />
      </ErrorBoundary>
    </div>
  )
}


function ErrorFallback({error}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
}
```

### `static getDerivedStateFromError()`

The `static getDerivedStateFromError()` method is invoked after an error has been thrown by a descendant component. It receives the error that was thrown as a parameter and should return a value to update state.

`getDerivedStateFromError()` is called during the “render” phase, so side-effects are not permitted. For those use cases, use `componentDidCatch()` instead.  [REF](https://reactjs.org/docs/react-component.html#static-getderivedstatefromerror)





---



### 4. 💯 create an ErrorBoundary component

[Production deploy](https://react-hooks.netlify.app/isolated/final/06.extra-4.js)

We've already solved the problem for errors in our request, we're only handling
that one error. But there are a lot of different kinds of errors that can happen
in our applications.

No matter how hard you try, eventually your app code just isn’t going to behave
the way you expect it to and you’ll need to handle those exceptions. If an error
is thrown and unhandled, your application will be removed from the page, leaving
the user with a blank screen... Kind of awkward...

Luckily for us, there’s a simple way to handle errors in your application using
a special kind of component called an
[Error Boundary](https://reactjs.org/docs/error-boundaries.html). Unfortunately,
there is currently no way to create an Error Boundary component with a function
and you have to use a class component instead.

In this extra credit, read up on ErrorBoundary components, and try to create one
that handles this and any other error for the `PokemonInfo` component.

💰 to make your error boundary component handle errors from the `PokemonInfo`
component, instead of rendering the error within the `PokemonInfo` component,
you'll need to `throw error` right in the function so React can hand that to the
error boundary. So `if (status === 'rejected') throw error`.

