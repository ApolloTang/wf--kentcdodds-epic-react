### 2. 💯 use a status

[Production deploy](https://react-hooks.netlify.app/isolated/final/06.extra-2.js)

Our logic for what to show the user when is kind of convoluted and requires that
we be really careful about which state we set and when.

We could make things much simpler by having some state to set the explicit
status of our component. Our component can be in the following "states":

- `idle`: no request made yet
- `pending`: request started
- `resolved`: request successful
- `rejected`: request failed

Try to use a status state by setting it to these string values rather than
relying on existing state or booleans.

Learn more about this concept here:
https://kentcdodds.com/blog/stop-using-isloading-booleans

💰 Warning: Make sure you call `setPokemon` before calling `setStatus`. We'll
address that more in the next extra credit.

