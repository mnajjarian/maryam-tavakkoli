import * as React from "react";
import { Switch, Route } from "react-router";
import Biography from "./bio";
import Footer from "./footer";
import About from "./about";
import Blog from "./blog";
import Post from "./post";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Biography} />
        <Route exact path="/about" component={About} />
        <Route exact path="/blog" component={Blog} />
        <Route
          exact
          path="/blog/:id"
          component={(props: any) => (props ? <Post {...props} /> : null)}
        />
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
