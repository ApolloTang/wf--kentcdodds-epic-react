# useEffect: persistent state

### 2. 💯 effect dependencies

[Production deploy](https://react-hooks.netlify.app/isolated/final/02.extra-2.js)

The callback we're passing to `React.useEffect` is called after _every_ render
of our component (including re-renders). This is exactly what we want because we
want to make sure that the `name` is saved into localStorage whenever it
changes, but there are various reasons a component can be re-rendered (for
example, when a parent component in the application tree gets re-rendered).

Really, we _only_ want localStorage to get updated when the `name` state
actually changes. It doesn't need to re-run any other time. Luckily for us,
`React.useEffect` allows you to pass a second argument called the "dependency
array" which signals to React that your effect callback function should be
called when (and only when) those dependencies change. So we can use this to
avoid doing unnecessary work!

Add a dependencies array for `React.useEffect` to avoid the callback being
called too frequently.

