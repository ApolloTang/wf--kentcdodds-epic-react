// This file will run on each test, after jest is loaded

import 'whatwg-fetch' // Polyfill "window.fetch" used in the React component.
                      // See:
                      //   https://github.com/mswjs/msw/issues/686
                      //   https://github.com/mswjs/examples/blob/master/examples/with-jest/jest.setup.js

import '@testing-library/jest-dom/extend-expect'


