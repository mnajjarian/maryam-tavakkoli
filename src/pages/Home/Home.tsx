import React from 'react'
import { Layout } from '../../components/Layout/Layout'
import { Header } from './Header/Header'
import { About } from 'pages/Home/About/About'
import { LatestPost } from './LatestPost/LatestPost'

export function Home(): JSX.Element {
  return (
    <Layout>
      <Header />
      <About />
      <LatestPost />
    </Layout>
  )
}
