import React from 'react'

function sleep(time) {
  const done = Date.now() + time
  while (done > Date.now()) {
    // sleep...
  }
}


function SlowComponent({time, onChange}) {
  sleep(time)

  return (
    <div>
      Wow, that was{' '}
      <input
        value={time}
        type="number"
        onChange={e => onChange(Number(e.target.value))}
      />
      ms slow
    </div>
  )
}


function DogName({time}) {
  const [dog, setDog] = React.useState('')
  return (
    <div>
      <label htmlFor="dog">Dog Name</label>
      <br />
      <input id="dog" value={dog} onChange={e => setDog(e.target.value)} />
      <p>{dog ? `${dog}'s favorite number is ${time}.` : 'enter a dog name'}</p>
    </div>
  )
}


function App() {
  // this is "global state"
  const [time, setTime] = React.useState(200)
  
  console.log('parent executed')
  return (
    <div>
      <DogName time={time} />
      <SlowComponent time={time} onChange={setTime} />
    </div>
  )
}

export {App}
