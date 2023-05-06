## Extra Credit



### 3. 💯 add game history feature

[Production deploy](https://react-hooks.netlify.app/isolated/final/04.extra-3.js)

Open `http://localhost:3000/isolated/final/04.extra-3.js` and see that the extra
version supports keeping a history of the game and allows you to go backward and
forward in time. See if you can implement that!

NOTE: This extra credit is one of the harder extra credits. Don't worry if you
struggle on it!

💰 Tip, in the final example, we store the history of squares in an array of
arrays. `[[/* step 0 squares */], [/* step 1 squares */], ...etc]`, so we have
two states: `history` and `currentStep`.

💰 Tip, in the final example, we move the state management from the `Board`
component to the `Game` component and that helps a bit. Here's what the JSX
returned from the `Game` component is in the final version:

```javascript
return (
  <div className="game">
    <div className="game-board">
      <Board onClick={selectSquare} squares={currentSquares} />
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
    <div className="game-info">
      <div>{status}</div>
      <ol>{moves}</ol>
    </div>
  </div>
)
```

## 
