import React from "react";
import { render } from "@testing-library/react";
import { AuthProvider } from "../contexts/authContext";
import { DataProvider } from "../contexts/dataContext";
import { ReactNode } from "react";
import { BrowserRouter, Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
interface Props {
  children: ReactNode;
}
const AllTheProviders = (props: Props) => {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <Router history={history}>{props.children}</Router>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
};

const customRender = (ui: any, options: any) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";

export { customRender as render };
