import React from "react";
import { RawDraftContentState, RawDraftContentBlock } from 'draft-js';
import { BlogType } from './Blog';

type Props = {
  post: BlogType
}

const BlogHeader = (props: Props) => {
  if(!props.post) {
    return <div></div>
  }
  const {post, post: {content} } = props;
  const draft: RawDraftContentState = JSON.parse(content);
  const { blocks } = draft;

  const title = blocks.filter((b: RawDraftContentBlock ) => b.type === 'header-two')
  const p = blocks.filter((b: RawDraftContentBlock) => b.type === 'unstyled')

  return (
    <div className="blog__header">
              <div className="blog__header__content">
        <div className="blog__header__items">
          <h2>{title[0].text}</h2>
        <p>{p[0].text.substring(0, 320)}...</p>
             <span>
            {new Intl.DateTimeFormat("en-us", {
              year: "numeric",
              month: "short",
              day: "2-digit"
            }).format(new Date(post.createdAt))}
          </span> 
        </div>
       {/*  <img src={require(`../${imgUrl}`)} alt="tech" /> */}
      </div>
    </div>
  );
};

export default BlogHeader;
