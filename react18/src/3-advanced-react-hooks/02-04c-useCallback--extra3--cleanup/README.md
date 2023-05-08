# Extra 3

## 3. 💯 make safeDispatch with useCallback, useRef, and useEffect

[Production deploy](https://advanced-react-hooks.netlify.com/isolated/final/02.extra-3.js)

**NOTICE: Things have changed slightly.** The app you're running the exercises
in was changed since the videos were recorded and you can no longer see this
issue by changing the exercise. All the exercises are now rendered in an iframe
on the exercise pages, so when you go to a different exercise, you're
effectively "closing" the page, so all JS execution for that exercise stops.

So I've added a little checkbox which you can use to mount and unmount the
component with ease. This has the benefit of also working on the isolated page
as well. On the exercise page, you'll want to make sure that your console output
is showing the output from the iframe by
[selecting the right context](https://developers.google.com/web/tools/chrome-devtools/console/reference#context).

I've also added a test for this one to help make sure you've got it right.

Also notice that while what we're doing here is still useful and you'll learn
valuable skills, the warning we're suppressing
[goes away in React v18](https://github.com/reactwg/react-18/discussions/82).

Phew, ok, back to your extra credit!

This one's a bit tricky, and I'm going to be intentionally vague here to give
you a bit of a challenge, but consider the scenario where we fetch a pokemon,
and before the request finishes, we change our mind and navigate to a different
page (or uncheck the mount checkbox). In that case, the component would get
removed from the page ("unmounted") and when the request finally does complete,
it will call `dispatch`, but because the component has been removed from the
page, we'll get this warning from React:

```text
Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
```

The best solution to this problem would be to
[cancel the request](https://developers.google.com/web/updates/2017/09/abortable-fetch),
but even then, we'd have to handle the error and prevent the `dispatch` from
being called for the rejected promise.

So see whether you can work out a solution for preventing `dispatch` from being
called if the component is unmounted. Depending on how you implement this, you
might need `useRef`, `useCallback`, and `useEffect`.



---



## My Note: 

This is no longer relevent in React 18, see: https://github.com/kentcdodds/advanced-react-hooks/issues/148

For React 17 see: [react17/src/3-advanced-react-hooks/02-04c-useCallback--extra3--cleanup](https://github.com/ApolloTang/wf--kentcdodds-epic-react/tree/main/react17/src/3-advanced-react-hooks/02-04c-useCallback--extra3--cleanup)

Typescript: [This](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcA5FDvmQLABQ9wAdjFlAXlnAJIAmANlgCC+YBCZwA3vThwYATzBYAXOWACstOgF96jFmw64uABSxNezAOYiYYidLqyFS1WSUXrW3QzrNW7JyYWKgQ-ABuWLy29gA8ACrYqACu-DAAfFIycooq5JShEVFasrzIMMiqiSGpMPQ++gFGXNgAVlj4UTHiCQCiUMRQmY7OuW6U7Z28JXBsg1X9g-V6dC5cQqjyTLjdTAlJtQA0cPGL0JkAvHBmnkw2ouJwAD48GrvPwYWR0Q971SlpTIvNodVg-Ow9U4Dc4rfyGIJ8QQAZQqrCyTjgqFRyVQbnUghmZQqqiYqX42Tm0BJZOWvjhgWM13MljuKPKXBGmOxuPIHhZVkJ5UqcFJ-HJGMpUGpYtpjXhjKSYW+bNY+xqgPRsix5Rx4xCSuK2SJwv+tQp0KlIppOlhBgZLSwkzBKqwfQtw2y2pguvyjtBhoxxul4tkkoWFtlq1ycA2W1wLrVAJgxyhg0ur2RqK4Lxu-JdH0VRV4CdNGuBfqmJbOQxWaxjm222F4yWMUFiGDgV2STAA1kwIAB3JjHXqduDdvuDpjpxO1McYFPVse9dIACmyWqzqlj2xLBzSi-dhw3KF+24bO1+s4PJ2r6XoAEpO5kd-Gs9fk7f3StcOIsSgLybFs2HPOMgNbMdVwAfS9LBjjwCEmCfC4PQxVAB2AGBcAACzgVcEPsAA6NYn05WRcDQLgyHxTRVDI2Q4Eob0oAcL0fWojQyGOIMrTFY4w14-gfAYuBhIYijUCovkvDok9ZCY5IWKkNieXcZkvG4oVg34i1gzE2R9LgCSqImf1plkjERIUpTJBUvUnWKTTiUEnT5lPRDCMlQzDOM30vmKCyRPkrBmNY7k9X86YnOFAjxEI41XKpQTvOyHwGj8O1mhOCBeAgTUjJIMBBDBVQACMIDCHAmGydRqRAUq2GyOwYEEVQsSgaxshxNg+DqhqoEjAhu1+cdJKRZACCwAARYBUDAcocI-Q801XSw5oW7DVGwBDCJm9asOw2JX12JavzTdJSOyX8mH-EAIG7MFsAIecqBgQjuqe1cOH4SSHxWWRtvwd7JN6AhJvwVdV2Q1CRLuh6oiewjcEUygWDHGAoGSLB-oY6yJCh598th+6DF4RHkYGcx4Cub7JJPMTtGOABtABdP7fGC0Lgh27qAGFkDFUq8B7SHkCgKweWOq9S0-VNzmhom4GAZ7Vzh0nyZRqnLsshi1vmg78PF1B2ZEhnmb1ja2cG4bENG4QL1OuWhlXZhMOAAWXVA3d3xl5bzjHSQuR1VSaK4uAeNFfhEstSPtG1q6-3gJnYOObtxsmvb9ZwlmXp5yTwLYfDAKiYCoGOV27A9rN2YTm74Atg6x269PptmrPsNXNOJtb-acJrjFrv-SQEtmC1jhU7Qx1ggD6zjPd1Vlu8ccH+BMYkK5AbevmBf4IXcBF1cwGIEBZryExj9Pj8LsJxwTwbnDV0kNY3Gku4yDjnHZCPkhT+I7DzHXDrESxob5ySCvfDuT8xh+QNFFcOQoP5AIYozMBoYLSgKQcAtuG1H7P19A5OBXkTZBQMieYhjM4Cs37pzRSDgR6SnHtyY4a80orCGtsW2QgwBgAJrfAeicpAjxUtHZh3ZJ5dkkq+BIOUIAjndFDHGm9gZYFBuDGAkMFb0TXquc+P9JKEQKAaR+YDfzgGKlEVQGMsbHiQbVOAABGGxJDmqtTgAAIhcVgNxTigrdSgL1Bx9MHzkOZlbDmcB2EjVRrwNg8QZG8JPMrPCKlOwXCuGpW4AptYkLxnAWIR8sDpGHgg2IAB6Ap94dbpSsiFWhglUo41yYAkSsRKkkMkNE2J8SHyGTKW0uA7N0pYAAB6QFgOHLAHA5xcLAPQIAA) and [This](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcA5FDvmQLABQ9BArgHb7AQtxOpYDKyAlgAiwVGGQxcACwAUAEzESp0gFxxZAOm3IoAc1TrkLAJ4BtALoBKOAF4AfNxYBrFhADuLGwG96cOLicqPAgEKwwWPLYBHaYVDCaPFjRsgTIADa8VvR+cXgJSQCiBEL4srI2DnC+dP7+oeGR0Zq4TFCULPC2cDBQTFi5-pQwbVwVdo41dXUNnU1YBC1tHV1waZkDtXUAvrnbADRwltkMW8OjefiJvADCGekARnjOsoMa2pq6BpWOsrMRUQWS3aWE6cAA-HBFOJJDItDp9KgbOoAG4QYDyOAABis+zeZmhyhkFjxWxOu1OwDmUDSuCwcAACqDFCw9ABBdicaq5GAmMBYdRkfksFl6Wh0Cn0KkRGl4enYVAQdIoyIcmAcFgAHgAKsJJMhJjy+QLyJRFcrIuL-PJ9epdfr6JK6NKsLK6XEAFZYfCqzlcKY9Y2Cyhen3yK1wV3EKDqViuDwsR05Oi8-lwNmoExsNUanV6mAG2JMkVU9l+uAAHzi5pV8hznDz+scVewoYB9cTlOptPpAEl5Ol+AWItytsFJDxBRjBxGbQX1CwmOl0rko9AF0uVxLky63fTi6K+MP6QHxyNDORhaLZ7a4Ivl6v2uu75uk12ZT3q0ra0fJFhGwWhpjsOk6mlgNaWrkc7IHa+bII+0Ybg+27vq6n6tt6AK-iOp4gReFBYG2kFbNBSFbv4a4xk48aeG+9CpvSGZZrg2H-vagGxP2g6sZWjLMqWPEtuB36RKxAGFkJRHyKxybMGw6pcmgzHYPITB0lA4n2LIAD6Z4mnGbieIc+QauoTHZn6mlWGZmZsGJ7GFqe7jACoGgmZwmgMT4by4Gg9JCvxrJkOoAbTOcUD+meoEBSWQWHKRL7LoclFkRS0xpXUvm8GBEHhiFbxDFgIwRdUUX4WaInhvFt7uSwmjQclT5Ufe6QZf4bUBH5YFScFo7TIVxWRXhwaEZhlrVfOiXpI1iEoH6miUR1GUUk6cnlkk5m4JprxbFSLnABkrE2cx9lwY43TeHAZVTgOWBkBNMFTTNz4tRS3lbIELDBEcemHKwqCCCISiwtIFixNg+TXMkkRqa6shKWwKmw1Ahx7eqh3HicuSfd9hIg7ESQCEIogwiosj-YDJNEtIWMfUE8DeA1kZNYcZXbLEekoOgm2nU2yb+Dj8B9Fw3QQ1cSR3MuTy4C8byyGAxAgGIJoMorytWRMfX9XjZPeAxgpXqWZDbCc-VwArJDK550igjtZv+Aot4OT8Wv21CwO6-rOWVfdUL6ibBU7KSbuyCl1GGV4muhfbOtwnrQbdWNVXM9GAdbGbByB6bQf4rHoPB3AtMDRc0eUQX-hleXfsFlXwsFyt9BAA).  I found this is discord.

