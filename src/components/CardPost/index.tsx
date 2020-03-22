import React from 'react'
import { Link } from 'react-router-dom'
import { RawDraftContentBlock, RawDraftContentState } from 'draft-js'
import { BlogType } from '../Blog'

import timeIcon from '../../assets/icons/time-3.svg'
import iconUser from '../../assets/icons/user.svg'
import iconBubble from '../../assets/icons/bubble.svg'

interface PostProps {
  post: BlogType
}
export const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en-us', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(date))
const CardPost = (props: PostProps) => {
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
            <span className="card__post__icon">
              <img src={timeIcon} alt="clock icon" />
              <strong>
                <time dateTime="2019-09-12" itemProp={post.createdAt}>
                  {formatDate(post.createdAt)}
                </time>
              </strong>
            </span>
            <span className="card__post__icon">
              <img src={iconUser} alt="user icon" />
              <strong>{post.user.firstName + ' ' + post.user.lastName}</strong>
            </span>
            <span className="card__post__icon">
              <img src={iconBubble} alt="comment icon" />
              <strong>{post.comments.length === 0 ? 'No' : post.comments.length} Comments</strong>
            </span>
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

export default CardPost
