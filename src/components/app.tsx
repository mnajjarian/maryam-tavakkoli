import * as React from "react";
import { Switch, Route } from "react-router";
import Nav from "./navbar";
import Header from "./header";
import Biography from "./bio";
import Footer from "./footer";
import About from "./about";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Biography} />
        <Route exact path="/about" component={About} />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
