import React, { useContext } from 'react'
import { CardPost } from '../CardPost/CardPost'
import { DataContext } from '../../../contexts/dataContext'
import { BlogInterface } from 'reducers/dataReducer'

export function BlogBody(): JSX.Element {
  const { data } = useContext(DataContext)
  const blogs = data.blogs.filter(blog => blog.draft !== false)

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
    <div className="row articles">
      <div className="col-sm-12 col-md-8">
        {blogs.map((post: BlogInterface) => (
          <CardPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
