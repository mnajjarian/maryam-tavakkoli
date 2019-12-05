import React from "react";
import { RawDraftContentState, RawDraftContentBlock } from "draft-js";
import { BlogType } from "./Blog";

type Props = {
  post: BlogType;
};

const BlogHeader = (props: Props) => {
  if (!props.post) {
    return <div></div>;
  }
  const {
    post,
    post: { content }
  } = props;
  const draft: RawDraftContentState = JSON.parse(content);
  const { blocks } = draft;
  const blocksWithText = blocks.filter(
    (b: RawDraftContentBlock) => b.text.length
  );
  const title = blocksWithText.filter(
    (b: RawDraftContentBlock) => b.type === "header-one"
  )[0];
  const p = blocksWithText.filter(
    (b: RawDraftContentBlock) => b.type === "unstyled"
  )[0];
  
  const imgUrl = draft.entityMap[0] ? draft.entityMap[0].data["src"] : null;

  return (
    <div className="blog__header">
      <div className="blog__header__content">
        <div className="blog__header__items">
          <h2>{title.text}</h2>
          <p>{p.text.substring(0, 320)}...</p>
          <span className="blog__header__date">
            {new Intl.DateTimeFormat("en-us", {
              year: "numeric",
              month: "short",
              day: "2-digit"
            }).format(new Date(post.createdAt))}
          </span>
        </div>
        {imgUrl && (
          <div className="blog__header__image">
            <img className="blog__header__img" src={imgUrl} alt="tech" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogHeader;
