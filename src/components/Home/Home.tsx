import React from 'react'
import { LastPost } from '../LatestPost/LatestPost'
import { Layout } from '../Layout/Layout'
import { Header } from '../Header/Header'

export function Home(): JSX.Element {
  return (
    <Layout>
      <Header />
      <LastPost />
    </Layout>
  )
}
