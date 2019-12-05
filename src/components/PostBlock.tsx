import React from 'react'
import { BlogType } from './Blog'
import { extractFromDraft } from './Jumbotron';

interface Props {
    posts: BlogType[]
}
const PostBlock = (props: Props) => {
    const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en-us", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    }).format(new Date(date));
    const sortPosts = props.posts.slice(1);
    return(
        <div className="block">
          <h2 className="block__title">Latest Posts</h2>
          <div className="block__content">
            {sortPosts.map((p: BlogType) => (
              <div key={p.id} className="block__items">
                <time className="block__time">
                  {formatDate(p.createdAt)}
                </time>
                <a
                  className="block__link"
                  target="_blank"
                  href={`/blog/${extractFromDraft(p.content)
                    .title.split(" ")
                    .join("-")}`}
                >
                  {extractFromDraft(p.content).title}
                </a>
              </div>
            ))}
          </div>
        </div>
    )
}

export default PostBlock;