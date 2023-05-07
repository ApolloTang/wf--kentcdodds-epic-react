# Extra 3 Finished code (with console logging)

```jsx
function useSafeDispatch(dispatch) {
  const mountedRef = React.useRef(false)

  // to make this even more generic you should use the useLayoutEffect hook to
  // make sure that you are correctly setting the mountedRef.current immediately
  // after React updates the DOM. Even though this effect does not interact
  // with the dom another side effect inside a useLayoutEffect which does
  // interact with the dom may depend on the value being set
  React.useEffect(() => {
    mountedRef.current = true
    console.log(mountedRef.current)
    return () => {
      mountedRef.current = false
      console.log(mountedRef.current)
    }
  }, [])

  return React.useCallback(
    (...args) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch],
  )
}

/** code not shown */

function useAsync(initialState) {
  const [state, unsafeDispatch] = React.useReducer(
    asyncReducer,
    { status: 'idle', data: null, error: null, ...initialState }
  )

  const dispatch = useSafeDispatch(unsafeDispatch)
  
  const runAsync = React.useCallback(
    promise => {
      dispatch({type: 'pending'})
      promise.then(
        async (data) => {
          console.log('sleep, go unmount component within 3000ms')
          await sleep(3000)     // go unmount component after sleep
          console.log('awake')  // you will see this message after unmount
          dispatch({type: 'resolved', data})
        },
        error => { dispatch({type: 'rejected', error}) },
      )
    }, [dispatch]
  )

  return {...state, runAsync}
}
```

