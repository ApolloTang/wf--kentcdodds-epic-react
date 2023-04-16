## Extra Credit

### 1. 💯 accept the step as the action

[Production deploy](https://advanced-react-hooks.netlify.com/isolated/final/01.extra-1.js)

I want to change things a bit to have this API:

```javascript
const [count, changeCount] = React.useReducer(countReducer, initialCount)
const increment = () => changeCount(step)
```

How would you need to change your reducer to make this work?

**This one is just to show that you can pass anything as the action.**
