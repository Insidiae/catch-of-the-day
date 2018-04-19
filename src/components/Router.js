// The Router component handles all of the routing in our React app.
// To use routing in your React app, you need react-router (in our case, react-router-dom)
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import StorePicker from "./StorePicker";
import App from "./App";
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    {/* The Switch tag matches the URL passed into it one by one downwards, and renders the matched component. */}
    <Switch>
      <Route exact path="/" component={StorePicker} />
      <Route path="/store/:storeId" component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
