import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom'
import React, { lazy, useContext } from 'react'
import { AuthContext } from 'contexts/authContext'
import { Home } from '../../pages/Home/Home'
import { Blog } from '../../pages/Blog/Blog'

const lazyImport = (fileName: string): React.LazyExoticComponent<any> =>
  lazy(() => import(`../${fileName}/${fileName}`).then(module => ({ default: module[fileName] })))

const Post = lazy(() => import('../../pages/Post/Post').then(module => ({ default: module.Post })))
const Login = lazyImport('Login')

const Dashboard = lazyImport('Dashboard')

type PropsType = {
  Component: React.FunctionComponent<RouteComponentProps>
  path: string
}
export function Routes(): JSX.Element {
  const {
    authState: { isLoggedIn },
  } = useContext(AuthContext)

  const PrivateRoutes = ({ Component, path, ...rest }: PropsType): JSX.Element => (
    <Route
      path={path}
      render={(props: RouteComponentProps): JSX.Element =>
        isLoggedIn ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/blog" component={Blog} />
      <Route
        exact
        path="/blog/:id"
        component={(props: PropsType): JSX.Element | null => (props ? <Post {...props} /> : null)}
      />
      <PrivateRoutes
        path="/dashboard"
        Component={({ match }: { match: { url: string } }): JSX.Element => <Dashboard match={match} />}
      />
    </Switch>
  )
}
