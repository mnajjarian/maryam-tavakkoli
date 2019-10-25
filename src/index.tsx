import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { AuthProvider } from "./contexts/authContexts";
import App from "./components/app";
import "./styles/_main.scss";

const history = createBrowserHistory();

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Router history={history}>
        <App />
      </Router>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("root")
);
