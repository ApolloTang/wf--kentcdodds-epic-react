import React from "react";
import {createRoot} from "react-dom/client";
import './styles.css'

import App from "./04-classes.js";

const reactContainer = document.createElement('div')
reactContainer.innerText =  'react component goes here'
reactContainer.id = 'root'
document.body.appendChild(reactContainer)

const root = createRoot(reactContainer!);
root.render(<App />);
// Ref: https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis


