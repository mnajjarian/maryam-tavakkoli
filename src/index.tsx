import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { AuthProvider } from "./contexts/authContext";
import App from "./components/App";
import "./styles/_main.scss";
import { DataProvider } from "./contexts/dataContext";

const history = createBrowserHistory();

ReactDOM.render(
  <AuthProvider>
    <DataProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </DataProvider>
  </AuthProvider>,
  document.getElementById("root")
);
