# useEffect watch for reference change

Please watch video https://epicreact.dev/modules/react-hooks/useeffect-persistent-state-extra-credit-solution-2 for explaination.

```jsx
const globalReferencingObj = {}

function Greeting({initialName = ''}) {
  console.log('function Greeting executed')

  const [name, setName] = React.useState(
    () => {
      console.log('useState executed')
      // ..
    }
  )

  // ...

  const localReferencingObj = {}

  React.useEffect(() => {
    console.log('useEffect executed due to localReferencingObj')
  }, [
    localReferencingObj // <---- this reference change will NOT trigger useEffect's callback to run
  ])


  React.useEffect(() => {
    console.log('useEffect executed due to globalReferencingObj')
  }, [
    globalReferencingObj // <---- this reference change will NOT trigger useEffect's callback to run
  ])

  // ...


  return (
    <div>
      {console.log('function Greeting returning')}
    </div>
  )
}
```

