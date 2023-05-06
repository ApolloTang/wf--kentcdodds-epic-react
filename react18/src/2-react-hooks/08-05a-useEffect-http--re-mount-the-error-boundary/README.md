### 5. 💯 re-mount the error boundary

[Production deploy](https://react-hooks.netlify.app/isolated/final/06.extra-5.js)

You might notice that with the changes we've added, we now cannot recover from
an error. For example:

1. Type an incorrect pokemon
2. Notice the error
3. Type a correct pokemon
4. Notice it doesn't show that new pokemon's information

The reason this is happening is because the `error` that's stored in the
internal state of the `ErrorBoundary` component isn't getting reset, so it's not
rendering the `children` we're passing to it.

So what we need to do is reset the ErrorBoundary's `error` state to `null` so it
will re-render. But how do we access the internal state of our `ErrorBoundary`
to reset it? Well, there are a few ways we could do this by modifying the
`ErrorBoundary`, but one thing you can do when you want to _reset_ the state of
a component, is by providing it a `key` prop which can be used to unmount and
re-mount a component.

The `key` you can use? Try the `pokemonName`!

