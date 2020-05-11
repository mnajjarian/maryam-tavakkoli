import React, { useContext } from 'react'
import { PostBlock } from '../PostBlock/PostBlock'
import { extractFromDraft } from '../../Helper'
import { DataContext } from 'contexts/dataContext'

export function Jumbotron(): JSX.Element {
  const {
    data: { blogs },
  } = useContext(DataContext)
  if (!blogs[0]) {
    return <div></div>
  }

  return (
    <div
      className="jumbotron"
      style={{
        backgroundImage: `url(${extractFromDraft(blogs[0].content).url})`,
      }}
    >
      <div className="jumbotron__overlay">
        <div className="jumbotron__post">
          <h1 className="jumbotron__title">{extractFromDraft(blogs[0].content).title}</h1>
          <p className="jumbotron__text">{extractFromDraft(blogs[0].content).p.substring(0, 200)}...</p>
          <a
            href={`/blog/${extractFromDraft(blogs[0].content)
              .title.split(' ')
              .join('-')}`}
            className="jumbotron__button"
            rel="noopener noreferrer"
            target="_blank"
          >
            Read more
          </a>
        </div>
        {blogs.length > 1 && <PostBlock />}
      </div>
    </div>
  )
}
