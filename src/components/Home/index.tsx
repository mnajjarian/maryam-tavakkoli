import React from 'react'
import { LastPost } from '../LatestPost'
import Layout from '../Layout'
import Header from '../Header'

function Home(): JSX.Element {
  return (
    <Layout>
      <Header />
      <LastPost />
    </Layout>
  )
}

export default Home
