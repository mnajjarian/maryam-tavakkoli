import React, { useContext } from 'react'
import CardPost from '../CardPost'
import { BlogType } from '../Blog'
import { DataContext } from 'contexts/dataContext'

function BlogBody(): JSX.Element {
  const {
    data: { blogs },
  } = useContext(DataContext)
  if (!blogs.length) {
    return (
      <div className="blog">
        <div className="blog__empty">
          <div>There is nothing here!</div>
          <div>
            You can create new post through your{' '}
            <a className="blog__empty__link" href="/dashboard/create">
              Dashboard
            </a>
            .
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="blog">
      <div className="blog__posts">
        {blogs.map((post: BlogType) => (
          <CardPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default BlogBody
