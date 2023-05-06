# Extra Credit

## 3. 💯 simulate setState with an object OR function

[Production deploy](https://advanced-react-hooks.netlify.com/isolated/final/01.extra-3.js)

`this.setState` from class components can also accept a function. So let's add
support for that with our simulated `setState` function. See if you can figure
out how to make your reducer support both the object as in the last extra credit
as well as a function callback:

```javascript
const [state, setState] = React.useReducer(countReducer, {
  count: initialCount,
})
const {count} = state
const increment = () =>
  setState(currentState => ({count: currentState.count + step}))
```

### 



---

My solution, different from Kent's for readability:



```jsx
const countReducer = (state, action) => {
  const nextState = typeof action === 'function' ? action(state) : action
  return ({...state, ...nextState})
}

function Counter({initialCount = 0, step = 1}) {
  const initialState = { count: initialCount }
  const [state, setState] = React.useReducer(countReducer, initialState)
  const {count} = state
  const getNextState = (currentState) => ({count: currentState.count + step})
  const increment = () => setState(getNextState)

  return <button onClick={increment}>{count}</button>
}
```

