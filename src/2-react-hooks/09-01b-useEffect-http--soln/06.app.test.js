import * as React from 'react'
// import {alfredTip} from '@kentcdodds/react-workshop-app/test-utils'
import {alfredTip} from '../../utilities/kentcdodds--test-utils'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {App} from './app'
// import App from '../exercise/06'
import {allPokemon} from  './pokemon-fake-data'

function setupFetchStub(data) {
  return function fetchStub(_url, payload) {
    const body = JSON.parse(payload.body)
    const name = body.variables.name
    console.log('allPokemon::::', allPokemon)
    console.log('name:', name)
    const pokemon = allPokemon[name]
    console.log('yyyyyy data:', pokemon)
    return new Promise((resolve) => {
      resolve({
        json: () => Promise.resolve(new Response({data:{pokemon}}, {status: 200, ok:true})),
        // json: () => Promise.resolve({data:{pokemon}, status: 200, ok:true}),
      })
    })
  }
}

// see https://jaketrent.com/post/mock-fetch-jest-test/
window.fetch = jest.fn().mockImplementation(setupFetchStub())

beforeEach(() => jest.spyOn(window, 'fetch'))
afterEach(() => window.fetch.mockRestore())

test('displays the pokemon', async () => {

  render(<App />)


  const input = screen.getByLabelText(/pokemon/i)
  const submit = screen.getByText(/^submit$/i)

  // verify that an initial request is made when mounted
  await userEvent.type(input, 'pikachu')
  await userEvent.click(submit)
  //
  // await screen.findByRole('heading', {name: /pikachu/i})
  //
  // // verify that a request is made when props change
  // await userEvent.clear(input)
  //
  // await userEvent.type(input, 'ditto')
  // await userEvent.click(submit)
  //
  // await screen.findByRole('heading', {name: /ditto/i})
  //
  // // verify that when props remain the same a request is not made
  window.fetch.mockClear()
  // await userEvent.click(submit)

  // await screen.findByRole('heading', {name: /ditto/i})
  alfredTip(
    () => expect(window.fetch).not.toHaveBeenCalled(),
    'Make certain that you are providing a dependencies list in useEffect.',
  )
})
