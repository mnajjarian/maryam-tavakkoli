import React, { ReactNode, lazy } from 'react'
import { Nav } from './Nav/Nav'
import { Route, match } from 'react-router-dom'

type Match = match
const lazyImport = (fileName: string): React.LazyExoticComponent<React.ComponentType<any>> =>
  lazy(() => import(`../Dashboard/${fileName}/${fileName}`).then(module => ({ default: module[fileName] })))

const Gallery = lazyImport('Gallery')
const Profile = lazyImport('Profile')
const RichEditor = lazyImport('RichEditor')
const Posts = lazyImport('PostTable')

export function Dashboard({ match }: { match: Match }): JSX.Element {
  const { url } = match

  return (
    <DashboardWrapper>
      <Route path={`${url}/profile`} component={Profile} exact />
      <Route path={`${url}/gallery`} component={Gallery} exact />
      <Route path={`${url}/create`} component={RichEditor} exact />
      <Route
        path={`${url}/edit/:id`}
        component={({ match }: { match: match }): JSX.Element => <RichEditor blogId={match.params} />}
        exact
      />
      <Route path={`${url}/posts`} component={Posts} exact />
    </DashboardWrapper>
  )
}

export function DashboardWrapper({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="dashboard">
      <Nav />
      {children}
    </div>
  )
}
