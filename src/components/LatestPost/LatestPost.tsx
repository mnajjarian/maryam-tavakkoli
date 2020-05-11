import React, { useContext } from 'react'
import { extractFromDraft } from '../../Helper'
import { DataContext } from 'contexts/dataContext'
import { BlogType } from '../Blog/Blog'
import { Link } from 'react-router-dom'

type Props = {
  post: BlogType
}
export function CardPost({ post }: Props): JSX.Element {
  return (
    <div className="latest__card">
      <Link
        to={`/blog/${extractFromDraft(post.content)
          .title.split(' ')
          .join('-')}`}
      >
        <img className="latest__card__img" src={extractFromDraft(post.content).url} alt="related post" />
        <div className="latest__card__body">
          <p className="latest__card__text">{extractFromDraft(post.content).title}</p>
        </div>
      </Link>
    </div>
  )
}

export function LastPost(): JSX.Element {
  const {
    data: { blogs },
  } = useContext(DataContext)

  const lastPosts = blogs.slice(0, 3)

  return (
    <div className="latest">
      <h2 className="latest__title">Latest posts</h2>
      <div className="latest__line"></div>
      <div className="latest__posts">
        {lastPosts.map((blog: BlogType) => (
          <CardPost key={blog.id} post={blog} />
        ))}
      </div>
    </div>
  )
}
