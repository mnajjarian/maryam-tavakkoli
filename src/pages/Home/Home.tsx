import React, { useContext } from 'react'
import { Layout } from '../../components/Layout/Layout'
import { Header } from './Header/Header'
import { About } from 'pages/Home/About/About'
import { LatestPost } from './LatestPost/LatestPost'
import { DataContext } from 'contexts/dataContext'
import Loading from 'components/Loading/Loading'

export function Home(): JSX.Element {
  const {
    data: { loading },
  } = useContext(DataContext)

  if (loading) {
    return <Loading />
  }

  return (
    <Layout>
      <Header />
      <About />
      <LatestPost />
    </Layout>
  )
}
