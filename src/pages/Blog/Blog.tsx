import React, { useContext } from 'react'
import { BlogBody } from './BlogBody/BlogBody'
import { DataContext } from '../../contexts/dataContext'
import { Layout } from '../../components/Layout/Layout'
import { Jumbotron } from './Jumbotron/Jumbotrun'

export function Blog(): JSX.Element {
  const {
    data: { blogs },
  } = useContext(DataContext)

  if (!blogs.length) {
    return <div></div>
  }

  return (
    <Layout>
      <Jumbotron />
      <BlogBody />
    </Layout>
  )
}
