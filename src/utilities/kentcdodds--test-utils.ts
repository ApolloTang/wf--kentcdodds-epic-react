// From https://github.com/kentcdodds/react-workshop-app/blob/main/src/test-utils.tsx

import chalk from 'chalk'

// The following work, it is from:
//
//   https://stackoverflow.com/a/71722204/3136861
//
// However, typescript fails. So instead of using chalk@5 I use chalk@4 for now. See:
//
//   https://stackoverflow.com/a/70748594/3136861
//
// async function chalk() {
//   return (await import("chalk")).default;
// }

import {prettyDOM} from '@testing-library/react'

function alfredTip(
  shouldThrow: unknown | (() => unknown),
  tip: string | ((error: unknown) => string),
  {displayEl}: {displayEl?: true | ((error: unknown) => HTMLElement)} = {},
) {
  let caughtError
  if (typeof shouldThrow === 'function') {
    try {
      shouldThrow = shouldThrow()
    } catch (e/*: unknown*/) {
      shouldThrow = true
      caughtError = e
    }
  }
  if (!shouldThrow) return

  const tipString = typeof tip === 'function' ? tip(caughtError) : tip
  const error = new Error(chalk.red(`🚨 ${tipString}`))
  if (displayEl) {
    const el =
      typeof displayEl === 'function' ? displayEl(caughtError) : document.body
    error.message += `\n\n${chalk.reset(prettyDOM(el))}`
  }
  // get rid of the stack to avoid the noisy codeframe
  error.stack = error.message
  throw error
}

export {alfredTip}
