import React, { useContext } from 'react'
import Jumbotron from '../Jumbotron'
import BlogBody from '../BlogBody'
import { DataContext } from '../../contexts/dataContext'
import { User } from 'reducers/dataReducer'
import Layout from '../Layout'

export interface CommentInterface {
  _id: string
  comment: string
  post: string
  commenter: string
  email: string
  createdAt: string
}
export interface BlogType {
  id: string
  content: string
  user: User
  createdAt: string
  updatedAt: string
  comments: CommentInterface[]
}

function Blog(): JSX.Element {
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

export default Blog
