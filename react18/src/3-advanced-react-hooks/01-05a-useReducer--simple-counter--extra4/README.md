# Extra Credit

### 4. 💯 traditional dispatch object with a type and switch statement

[Production deploy](https://advanced-react-hooks.netlify.com/isolated/final/01.extra-4.js)

Ok, now we can finally see what most people do conventionally (mostly thanks to
redux). Update your reducer so I can do this:

```javascript
const [state, dispatch] = React.useReducer(countReducer, {
  count: initialCount,
})
const {count} = state
const increment = () => dispatch({type: 'INCREMENT', step})
```



---

My solution, different from Kent's for readability:



```jsx
const countReducer = (state, action) => {
  const {type, step} = action

  switch (type) {
    case 'increment': {
      const nextState = {count: state.count + step}
      return ({...state, ...nextState})
    }
    default: {
      throw new Error(`Unsupoorted action type: ${action}`)
    }
  }

}

function Counter({initialCount = 0, step = 1}) {
  const initialState = { count: initialCount }
  const [state, dispatch] = React.useReducer(countReducer, initialState)
  const {count} = state
  const action = {type: 'increment', step}
  const increment = () => dispatch(action)

  return <button onClick={increment}>{count}</button>
}
```

