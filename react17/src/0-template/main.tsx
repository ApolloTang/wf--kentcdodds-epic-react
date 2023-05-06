import React from "react";
import {render} from "react-dom";
import {App} from "./app.jsx";

const reactContainer = document.createElement('div')
reactContainer.innerText =  'react component goes here'
reactContainer.id = 'root'
document.body.appendChild(reactContainer)

render(<App />, reactContainer);
