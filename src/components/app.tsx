import React, { useContext, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router";
import Biography from "./bio";
import About from "./about";
import Blog from "./blog";
import Post from "./post";
import Login from "./login";
import Dashboard from "./Dashboard/dashboard";
import { AuthContext } from "../contexts/authContext";
import { DataContext } from "../contexts/dataContext";
import Gallery from "./gallery";
import Profile from "./Dashboard/profile";
import RichEditor from "./Dashboard/editor";
import Nav from "./Dashboard/nav";

interface Props {
  component: any;
  path: string;
}
const App = () => {
  const {
    authState: { isLoggedIn }
  } = useContext(AuthContext);
  const { dataService } = useContext(DataContext);
  const fetchAllPosts = () => dataService.getPosts();
  const fetchProfile = () => dataService.getProfile();
  useEffect(() => {
    fetchAllPosts();
    fetchProfile();
  }, []);
  const PrivateRoutes = ({ component: Comp, path, ...rest }: Props) => (
    <Route
      path={path}
      render={props =>
        isLoggedIn ? (
          <Comp {...props} {...rest} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
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
        <PrivateRoutes
          path="/dashboard"
          component={({ match: { url } }: { match: any }) => (
            <Dashboard>
              <Route path={`${url}/profile`} component={Profile} exact />
              <Route path={`${url}/gallery`} component={Gallery} exact />
              <Route path={`${url}/create`} component={RichEditor} />
            </Dashboard>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
