import React, { useContext, useEffect } from "react";
import { Switch, Route, Redirect, match } from "react-router";
import Biography from "./Biography";
import About from "./About";
import Blog from "./Blog";
import Post from "./Post";
import Login from "./Login";
import Dashboard from "./Dashboard/Dashboard";
import { AuthContext } from "../contexts/authContext";
import { DataContext } from "../contexts/dataContext";
import Gallery from "./Dashboard/Gallery";
import Profile from "./Dashboard/Profile";
import RichEditor from "./Dashboard/Editor";
import Posts from "./Dashboard/Posts";

interface Props {
  component: any;
  path: string;
}
const App = () => {
  const {
    authState: { isLoggedIn }
  } = useContext(AuthContext);

  const { dataService } = useContext(DataContext);

  const fetchData = () => {
    dataService.getPosts();
    dataService.getUsers();
    dataService.getGallery();
  };
  useEffect(() => {
    fetchData();
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
              <Route path={`${url}/create`} component={RichEditor} exact />
              <Route
                path={`${url}/edit/:id`}
                component={({ match }: { match: match }) => (
                  <RichEditor blogId={match.params} />
                )}
                exact
              />
              <Route path={`${url}/posts`} component={Posts} exact />
            </Dashboard>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
