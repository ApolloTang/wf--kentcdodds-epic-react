# Extra Credit

## 2. 💯 simulate setState with an object

[Production deploy](https://advanced-react-hooks.netlify.com/isolated/final/01.extra-2.js)

Remember `this.setState` from class components? If not, lucky you 😉. Either
way, let's see if you can figure out how to make the state updater (`dispatch`
function) behave in a similar way by changing our `state` to an object
(`{count: 0}`) and then calling the state updater with an object which merges
with the current state.

So here's how I want things to look now:

```javascript
const [state, setState] = React.useReducer(countReducer, {
  count: initialCount,
})
const {count} = state
const increment = () => setState({count: count + step})
```

How would you need to change the reducer to make this work?



---

My solution, different from Kent's for readability:



```jsx
const countReducer = (state, nextState) => ({...state, ...nextState})

function Counter({initialCount = 0, step = 1}) {
  const initialState = { count: initialCount }
  const [state, setState] = React.useReducer(countReducer, initialState)
  
  const {count} = state
  const nextState = {count: count + step}
  const increment = () => setState(nextState)

  return <button onClick={increment}>{count}</button>
}

```

