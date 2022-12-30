import React from 'react'

let prevKeyRef_global

/**
 *
 * @param {String} key The key to set in localStorage for this value
 * @param {Object} defaultValue The value to use if it is not already in localStorage
 * @param {{serialize: Function, deserialize: Function}} options The serialize and deserialize functions to use (defaults to JSON.stringify and JSON.parse respectively)
 */
function useLocalStorageState(
  key,
  defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      // the try/catch is here in case the localStorage value was set before
      // we had the serialization in place (like we do in previous extra credits)
      try {
        return deserialize(valueInLocalStorage)
      } catch (error) {
        window.localStorage.removeItem(key)
      }
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  // const prevKeyRef = React.useRef(key)
  const prevKeyRef = prevKeyRef_global ?? key  // global is undifined initially, so
                                               // so don't read from it.

  // Check the example at src/examples/local-state-key-change.js to visualize a key change
  React.useEffect(() => {
    // const prevKey = prevKeyRef.current
    const prevKey = prevKeyRef
    console.log(prevKey, key)
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    // prevKeyRef.current = key
    prevKeyRef_global = key // <--- save current key, so that it will become previous key if user change key

    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}


function Greeting({initialName = ''}) {
  const [key, setKey] = React.useState('name')
  const [name, setName] = useLocalStorageState(key, initialName)

  function handleClick() {
    if (key === 'name') {
      setKey('firstName')
    } else if (key === 'firstName') {
      setKey('Name')
    } else {
      setKey('name')
    }
  }

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Change key!
      </button>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export {App}
