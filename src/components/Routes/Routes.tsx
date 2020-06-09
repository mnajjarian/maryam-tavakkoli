import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom'
import React, { lazy, useContext, Suspense } from 'react'
import { AuthContext } from '../../contexts/authContext'
import { Login } from '../Login/Login'
import { Dashboard } from '../Dashboard/Dashboard'
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary'
import Loading from '../Loading/Loading'

const lazyImport = (fileName: string): React.LazyExoticComponent<React.FC> =>
  lazy(() => import(`../../pages/${fileName}/${fileName}`).then(module => ({ default: module[fileName] })))

const Home = lazyImport('Home')
const Blog = lazyImport('Blog')
const Post = lazyImport('Post')

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
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/blog/:postId" component={Post} />
          <PrivateRoutes path="/dashboard" Component={Dashboard} />
          <Redirect to="/" />
        </Suspense>
      </ErrorBoundary>
    </Switch>
  )
}
