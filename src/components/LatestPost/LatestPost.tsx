import React, { useContext } from 'react'
import { extractFromDraft } from '../../Helper'
import { DataContext } from 'contexts/dataContext'
import { BlogType } from '../../pages/Blog/Blog'
import { Link } from 'react-router-dom'

type Props = {
  post: BlogType
}
export function CardPost({ post }: Props): JSX.Element {
  return (
    <div className="col-sm-12 col-md-4">
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

export function PostTab({ post }: Props): JSX.Element {
  return (
    <div className="">
      <div>{extractFromDraft(post.content).title}</div>
      <div>{extractFromDraft(post.content).p.substring(0, 100)}</div>
    </div>
  )
}

export function LastPost(): JSX.Element {
  const {
    data: { blogs },
  } = useContext(DataContext)

  const lastPosts = blogs.slice(0, 3)

  return (
    <section className="latest">
      <div className="latest__header">
        <h2 className="latest__title">Latest posts</h2>
      </div>
      <div className="row">
        {lastPosts.map((blog: BlogType) => (
          <PostTab key={blog.id} post={blog} />
        ))}
      </div>
    </section>
  )
}
