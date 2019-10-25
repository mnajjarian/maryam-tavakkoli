import React from "react";
import { Switch, Route } from "react-router";
import Biography from "./bio";
import About from "./about";
import Blog from "./blog";
import Post from "./post";
import Login from './login';
import Dashboard from './Dashboard/dashboard';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Biography} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/about" component={About} />
        <Route exact path="/blog" component={Blog} />
        <Route
          exact
          path="/blog/:id"
          component={(props: any) => (props ? <Post {...props} /> : null)}
        />
        <Route exact path='/dashboard' component={Dashboard} />

      </Switch>
    </div>
  );
};

export default App;
