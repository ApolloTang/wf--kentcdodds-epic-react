import React from "react";
import {render} from "react-dom";
import {App} from "./hook-flow.js";

const reactContainer = document.createElement('div')
reactContainer.innerText =  'react component goes here'
reactContainer.id = 'root'
document.body.appendChild(reactContainer)

// const root = createRoot(reactContainer!);
render(<App />, reactContainer);
// Ref: https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis


