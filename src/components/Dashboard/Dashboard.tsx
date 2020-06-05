import React, { ReactNode, lazy } from 'react'
import { Nav } from './Nav/Nav'
import { Route, RouteComponentProps } from 'react-router-dom'
import { Notification } from '../Notification/Notification'

const lazyImport = (fileName: string): React.LazyExoticComponent<React.ComponentType<React.FC>> =>
  lazy(() => import(`../Dashboard/${fileName}/${fileName}`).then(module => ({ default: module[fileName] })))

const Gallery = lazyImport('Gallery')
const Profile = lazyImport('Profile')
const RichEditor = lazyImport('RichEditor')
const Posts = lazyImport('Posts')
const Draft = lazyImport('Draft')

export function Dashboard({ match }: RouteComponentProps): JSX.Element {
  const { url } = match

  return (
    <DashboardWrapper>
      <Route path={`${url}/profile`} component={Profile} exact />
      <Route path={`${url}/gallery`} component={Gallery} exact />
      <Route path={`${url}/create`} component={RichEditor} exact />
      <Route path={`${url}/drafts`} component={Draft} exact />
      <Route path={`${url}/edit/:postId`} component={RichEditor} exact />
      <Route path={`${url}/posts`} component={Posts} exact />
    </DashboardWrapper>
  )
}

export function DashboardWrapper({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="dashboard">
      <Nav />
      <Notification />
      <div className="dashboard__content">{children}</div>
    </div>
  )
}
