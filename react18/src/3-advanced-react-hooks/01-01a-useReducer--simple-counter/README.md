# useReducer: simple Counter

## 📝 Your Notes

Elaborate on your learnings here in `src/exercise/01.md`

## Background

React's `useState` hook can get you a really long way with React state
management. That said, sometimes you want to separate the state logic from the
components that make the state changes. In addition, if you have multiple
elements of state that typically change together, then having an object that
contains those elements of state can be quite helpful.

This is where `useReducer` comes in really handy. If you're familiar with redux,
then you'll feel pretty comfortable here. If not, then you have less to unlearn
😉

This exercise will take you pretty deep into `useReducer`. Typically, you'll use
`useReducer` with an object of state, but we're going to start by managing a
single number (a `count`). We're doing this to ease you into `useReducer` and
help you learn the difference between the convention and the actual API.

Here's an example of using `useReducer` to manage the value of a name in an
input.

```javascript
function nameReducer(previousName, newName) {
  return newName
}

const initialNameValue = 'Joe'

function NameInput() {
  const [name, setName] = React.useReducer(nameReducer, initialNameValue)
  const handleChange = event => setName(event.target.value)
  return (
    <>
      <label>
        Name: <input defaultValue={name} onChange={handleChange} />
      </label>
      <div>You typed: {name}</div>
    </>
  )
}
```

One important thing to note here is that the reducer (called `nameReducer`
above) is called with two arguments:

1. the current state
2. whatever it is that the dispatch function (called `setName` above) is called
   with. This is often called an "action."

## Exercise

Production deploys:

- [Exercise](https://advanced-react-hooks.netlify.com/isolated/exercise/01.js)
- [Final](https://advanced-react-hooks.netlify.com/isolated/final/01.js)

We're going to start off as simple as possible with a `<Counter />` component.
`useReducer` is absolutely overkill for a counter component like ours, but for
now, just focus on making things work with `useReducer`.

📜 Here are two really helpful blog posts comparing `useState` and `useReducer`:

- [Should I useState or useReducer?](https://kentcdodds.com/blog/should-i-usestate-or-usereducer)
- [How to implement useState with useReducer](https://kentcdodds.com/blog/how-to-implement-usestate-with-usereducer)

