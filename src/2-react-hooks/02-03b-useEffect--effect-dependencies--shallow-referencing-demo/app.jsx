import React from "react";

const globalReferencingObj = {}

function Greeting({initialName = ''}) {
  console.log('function Greeting executed')

  const [name, setName] = React.useState(
    () => {
      console.log('useState executed')
      window.localStorage.getItem('name') ?? initialName
    }
  )

  React.useEffect(() => {
    console.log('useEffect executed')
    window.localStorage.setItem('name', name)
  }, [ name ])

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


  function handleChange(event) { setName(event.target.value) }

  return (
    <div>
      {console.log('function Greeting returning')}
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  const [count,setCount] = React.useState(0)
  return <>
      <button
        onClick={ ()=>{
          console.log('button clicked')
          setCount(prevCount => ++prevCount )}
        }>{count}</button>
      <Greeting />
    </>
}

export {App}
