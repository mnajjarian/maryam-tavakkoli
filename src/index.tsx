import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from "./components/app";
import "./styles/_main.scss";

const history = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter>
    <Router history={history}>
      <App />
    </Router>
  </BrowserRouter>,
  document.getElementById("root")
);
