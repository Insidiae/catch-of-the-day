// Import dependencies
// This gets the entire React file
import React from "react";
// This just gets the render method from react-dom
import { render } from "react-dom";
import "./css/style.css";

// Import Components
import Router from "./components/Router";

// To actually interact with the DOM, React must first be mounted to a (typically empty) div on the page.
// Mount your components using the render() method from react-dom
// Your created components can now be used as a self-closing tag in this render() function.
render(<Router />, document.querySelector("#main"));
