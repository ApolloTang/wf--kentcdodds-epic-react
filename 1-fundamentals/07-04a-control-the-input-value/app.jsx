import React from "react";

function UsernameForm({onSubmitUsername}) {
  const [username, setUsername] = React.useState('')

  function handleSubmit(event) {
    event.preventDefault()  // prevent the default behavior of form submit events (which refreshes the page).
    // onSubmitUsername(event.target.elements.usernameInput.value)
    onSubmitUsername(username)
  }

  function handleChange(event) {
    setUsername(event.target.value.toLowerCase())
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input
          id="usernameInput"
          type="text"
          onChange={handleChange}
          value={username}
        />
      </div>
      <button type="submit">
        Submit
      </button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export {App}
