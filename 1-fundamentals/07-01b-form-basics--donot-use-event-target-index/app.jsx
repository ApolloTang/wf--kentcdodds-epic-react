import React from "react";

function UsernameForm({onSubmitUsername}) {
  function handleSubmit(event) {
    event.preventDefault()  // prevent the default behavior of form submit events (which refreshes the page).
    console.dir(event.target)

    console.log(event.target.elements.firstName)
    console.log(event.target[0])
    console.log(event.target.elements.firstName === event.target[0])  //  true

    console.log(event.target.elements.lastName)
    console.log(event.target[1])
    console.log(event.target.elements.lastName === event.target[1])  //  true

    // onSubmitUsername(event.target.elements.usernameInput.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">first name:</label>
        <input id="firstName" name="firstName" type="text" />
      </div>
      <div>
        <label htmlFor="lastName">last name:</label>
        <input id="lastName" name="lastName" type="text" />
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
