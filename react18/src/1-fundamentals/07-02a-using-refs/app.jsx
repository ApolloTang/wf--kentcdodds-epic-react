import React from "react";

function UsernameForm({onSubmitUsername}) {
  const usernameInputRef = React.useRef()
  function handleSubmit(event) {
    event.preventDefault()  // prevent the default behavior of form submit events (which refreshes the page).
    onSubmitUsername(usernameInputRef.current.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input ref={usernameInputRef} id="usernameInput" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export {App}
