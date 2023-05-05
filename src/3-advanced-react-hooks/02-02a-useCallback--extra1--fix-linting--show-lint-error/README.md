# lint error: react-hooks/exhaustive-deps



## 📝 Your Notes

This is starting code for video: https://epicreact.dev/modules/advanced-react-hooks/usecallback-custom-hooks-extra-credit-solution-1. 

It is same code as [3-advanced-react-hooks/02-01c-useCallback--finish](https://github.com/ApolloTang/wf--kentcdodds-epic-react/tree/main/src/3-advanced-react-hooks/02-01c-useCallback--finish) but formated for easy reading.

In this execercise I also added eslint to the project laboratory so I can see the linting error as discussed by Kent in his video. 



## Add configuration:

```bash
$ gdf --cached .eslintrc.js
diff --git a/.eslintrc.js b/.eslintrc.js
index 098a2a8..e3f46cd 100644
--- a/.eslintrc.js
+++ b/.eslintrc.js
@@ -17,8 +17,10 @@ module.exports = {
     },
     "plugins": [
         "react",
+        "react-hooks",
         "@typescript-eslint"
     ],
     "rules": {
+        "react-hooks/exhaustive-deps": "error",
     }
 }
```

REF:  

https://stackoverflow.com/a/59714491/3136861

https://stackoverflow.com/a/59612124/3136861



## Enable linting-next-line

```jsx
function useAsync(asyncCallback, initialState, dependencies) {
  const [state, dispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  })

  React.useEffect(() => {
    const promise = asyncCallback()
    if (!promise) {
      return
    }
    dispatch({type: 'pending'})
    promise.then(
      data => {
        dispatch({type: 'resolved', data})
      },
      error => {
        dispatch({type: 'rejected', error})
      },
    )
    // too bad the eslint plugin can't statically analyze this :-(
    // xxxxxxx eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return state
}

function PokemonInfo({pokemonName}) {
  const state = useAsync(
    // ... code not shown
    [pokemonName] 
  )

 // ... code not shown
}

```

![run eslint](./documentation/linting-error.png)

```jsx
function useAsync(asyncCallback, initialState, dependencies) {
  /* code not shown */

  React.useEffect(() => {    
    /* code not shown */
  }, dependencies) // <--- [line 57:6] `dependencies` is an array but eslint can't tell.
  // ~~~~~~~~~~~~
  //            LINT ERROR: React Hook React.useEffect was passed a 
  //                        dependency list that is not an array literal.

  return state
}

function PokemonInfo({pokemonName}) {
  const state = useAsync(
    /* code not shown */
    [pokemonName] 
  )

 /* code not shown */
}
```

