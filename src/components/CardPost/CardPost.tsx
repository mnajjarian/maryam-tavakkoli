import React from 'react'
import { Link } from 'react-router-dom'
import { RawDraftContentBlock, RawDraftContentState } from 'draft-js'
import { BlogType } from '../Blog/Blog'
import TimeIcon from '../../assets/icons/time-3.svg'
import IconUser from '../../assets/icons/user.svg'
import IconBubble from '../../assets/icons/bubble.svg'
import { formatDate } from '../../Helper'

type PostProps = {
  post: BlogType
  type?: string
}

function CardIcon({ post, type }: PostProps): JSX.Element {
  const fullName = post.user.firstName + ' ' + post.user.lastName
  const comment = post.comments.length === 0 ? 'No Comments' : post.comments.length + ' Comments'
  const time = (
    <time dateTime="2019-09-12" itemProp={post.createdAt}>
      {formatDate(post.createdAt)}
    </time>
  )
  return (
    <span className="card__post__icon">
      <img src={type === 'comment' ? IconBubble : type === 'user' ? IconUser : TimeIcon} alt="comment icon" />
      <strong>{type === 'comment' ? comment : type === 'user' ? fullName : time}</strong>
    </span>
  )
}

export function CardPost(props: PostProps): JSX.Element {
  const {
    post,
    post: { content },
  } = props
  const draft: RawDraftContentState = JSON.parse(content)
  const { blocks } = draft
  const blocksWithText = blocks.filter((b: RawDraftContentBlock) => b.text.length)
  const title = blocksWithText.filter((b: RawDraftContentBlock) => b.type === 'header-one')[0]
  const p = blocksWithText.filter((b: RawDraftContentBlock) => b.type === 'unstyled')[0]
  const imgUrl: string = draft.entityMap[0] ? draft.entityMap[0].data['src'] : null

  return (
    <div className="card__post">
      <section className="card__post__section">
        <div className="card__post__content">
          <h2>{title.text}</h2>
          <div className="card__post__header">
            <CardIcon post={post} type="time" />
            <CardIcon post={post} type="user" />
            <CardIcon post={post} type="comment" />
          </div>
          <div className="card__post__items">
            <p>
              {p.text.substring(0, 380) + '... '}
              <Link to={`/blog/${title.text.split(' ').join('-')}`}>read more</Link>
            </p>
            {imgUrl && (
              <div className="card__post__image">
                <img className="card__post__image" src={imgUrl} alt={title.text} />
              </div>
            )}
          </div>
          <ul className="card__post__tags">
            {/*         Tags:
            {post.tags.map(tag => (
              <li key={tag}>
                <a href="/">{tag}</a>
              </li>
            ))} */}
          </ul>
        </div>
      </section>
    </div>
  )
}
