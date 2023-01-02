# useState: tic tac toe

## 📝 Your Notes

Elaborate on your learnings here in `src/exercise/04.md`

## Background

A `name` is one thing, but a real UI is a bit different. Often you need more
than one element of state in your component, so you'll call `React.useState`
more than once. Please note that each call to `React.useState` in a given
component will give you a unique state and updater function.

## Exercise

Production deploys:

- [Exercise](https://react-hooks.netlify.app/isolated/exercise/04.js)
- [Final](https://react-hooks.netlify.app/isolated/final/04.js)

We're going to build tic-tac-toe (with localStorage support)! If you've gone
through React's official tutorial, this was lifted from that (except that
example still uses classes).

You're going to need some managed state and some derived state:

- **Managed State:** State that you need to explicitly manage
- **Derived State:** State that you can calculate based on other state

`squares` is the managed state and it's the state of the board in a
single-dimensional array:

```
[
  'X', 'O', 'X',
  'X', 'O', 'O',
  'X', 'X', 'O'
]
```

This will start out as an empty array because it's the start of the game.

`nextValue` will be either the string `X` or `O` and is derived state which you
can determine based on the value of `squares`. We can determine whose turn it is
based on how many "X" and "O" squares there are. We've written this out for you
in a `calculateNextValue` function at the bottom of the file.

`winner` will be either the string `X` or `O` and is derived state which can
also be determined based on the value of `squares` and we've provided a
`calculateWinner` function you can use to get that value.

📜 Read more about derived state in
[Don't Sync State. Derive It!](https://kentcdodds.com/blog/dont-sync-state-derive-it)

### Alternate:

If you'd prefer to practice refactoring a class that does this to a hook, then
you can open `src/exercise/04-classes.js` and open that on
[an isolated page](http://localhost:3000/isolated/exercise/04-classes.js) to
practice that.

## Extra Credit

### 1. 💯 preserve state in localStorage

[Production deploy](https://react-hooks.netlify.app/isolated/final/04.extra-1.js)

👨‍💼 Our customers want to be able to pause a game, close the tab, and then resume
the game later. Can you store the game's state in `localStorage`?

