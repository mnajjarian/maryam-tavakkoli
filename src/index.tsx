import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import App from "./components/App";
import "./styles/_main.scss";
import { DataProvider } from "./contexts/dataContext";

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
