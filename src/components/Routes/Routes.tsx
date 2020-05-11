import { Switch, Route, Redirect } from 'react-router-dom'
import React, { lazy, useContext, ReactNode } from 'react'
import { AuthContext } from 'contexts/authContext'

const lazyImport = (fileName: string): React.LazyExoticComponent<React.ComponentType<any>> =>
  lazy(() => import(`../${fileName}/${fileName}`).then(module => ({ default: module[fileName] })))

const Blog = lazyImport('Blog')
const Post = lazyImport('Post')
const Login = lazyImport('Login')
const Home = lazyImport('Home')
const About = lazyImport('About')
const Dashboard = lazyImport('Dashboard')

type Props = {
  component: any
  path: string
}
export function Routes(): JSX.Element {
  const {
    authState: { isLoggedIn },
  } = useContext(AuthContext)

  const PrivateRoutes = ({ component: Comp, path, ...rest }: Props): JSX.Element => (
    <Route
      path={path}
      render={(props: any): JSX.Element =>
        isLoggedIn ? (
          <Comp {...props} {...rest} />
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
      <Route exact path="/about" component={About} />
      <Route exact path="/blog" component={Blog} />
      <Route
        exact
        path="/blog/:id"
        component={(props: any): JSX.Element | null => (props ? <Post {...props} /> : null)}
      />
      <PrivateRoutes
        path="/dashboard"
        component={({ match }: { match: { url: string } }): ReactNode => <Dashboard match={match} />}
      />
    </Switch>
  )
}
