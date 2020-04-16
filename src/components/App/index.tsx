/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useContext, useEffect, ReactNode, lazy, Suspense } from 'react'
import { Switch, Route, Redirect, match } from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext'
import { DataContext } from '../../contexts/dataContext'

const lazyImport = (fileName: string) => lazy(() => import(`../${fileName}`))
const Blog = lazyImport('Blog')
const Post = lazyImport('Post')
const Login = lazyImport('Login')
const Home = lazyImport('Home')
const About = lazyImport('About')
const Dashboard = lazyImport('Dashboard')
const Gallery = lazyImport('Dashboard/Gallery')
const Profile = lazyImport('Dashboard/Profile')
const RichEditor = lazyImport('Dashboard/Editor')
const Posts = lazyImport('Dashboard/PostTable')

type Props = {
  component: any
  path: string
}
function App(): JSX.Element {
  const {
    authState: { isLoggedIn },
    authService,
  } = useContext(AuthContext)
  const { dataService } = useContext(DataContext)

  const fetchData = (): void => {
    authService.authenticate()
    dataService.getPosts()
    dataService.getGallery()
    dataService.getUsers()
  }
  useEffect(() => {
    fetchData()
  }, [])

  const PrivateRoutes = ({ component: Comp, path, ...rest }: Props): JSX.Element => (
    <Route
      path={path}
      render={(props): JSX.Element =>
        isLoggedIn ? (
          <Comp {...props} {...rest} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )

  return (
    <Suspense fallback={<div></div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/about" component={About} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/blog/:id" component={(props: any) => (props ? <Post {...props} /> : null)} />
        <PrivateRoutes
          path="/dashboard"
          component={({ match: { url } }: { match: match }): ReactNode => (
            <Dashboard>
              <Route path={`${url}/profile`} component={Profile} exact />
              <Route path={`${url}/gallery`} component={Gallery} exact />
              <Route path={`${url}/create`} component={RichEditor} exact />
              <Route
                path={`${url}/edit/:id`}
                component={({ match }: { match: match }) => <RichEditor blogId={match.params} />}
                exact
              />
              <Route path={`${url}/posts`} component={Posts} exact />
            </Dashboard>
          )}
        />
      </Switch>
    </Suspense>
  )
}

export default App
