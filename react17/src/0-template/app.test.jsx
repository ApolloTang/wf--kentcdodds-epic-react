import React from 'react'
import {render} from  '@testing-library/react'
import {App} from './app'

test('Rendering a component w Testing-library', () => {
  const {container} = render(<App/>)

  console.log('container.innerHTML: \n', container.innerHTML)
  expect(container).toMatchSnapshot()

  console.log('container.firstChild.innerHTML: \n', container.firstChild.innerHTML)
  expect(container.firstChild).toMatchSnapshot()
})

