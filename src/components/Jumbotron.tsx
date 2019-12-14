import React from "react";
import {
  RawDraftContentState,
  RawDraftContentBlock,
  ContentBlock
} from "draft-js";
import { BlogType } from "./Blog";
import PostBlock from "./PostBlock";

type Props = {
  posts: BlogType[];
};

export const extractFromDraft = (content: string) => {
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
  return {
    title: title.text,
    p: p.text,
    url: imgUrl
  };
};
const Jumbotron = (props: Props) => {
  if (!props.posts[0]) {
    return <div></div>;
  }

  return (
    <div
      className="jumbotron"
      style={{
        backgroundImage: `url(${extractFromDraft(props.posts[0].content).url})`
      }}
    >
      <div className="jumbotron__overlay">
        <div className="jumbotron__post">
          <h1 className="jumbotron__title">
            {extractFromDraft(props.posts[0].content).title}
          </h1>
          <p className="jumbotron__text">
            {extractFromDraft(props.posts[0].content).p.substring(0, 200)}...
          </p>
          <a
            href={`/blog/${extractFromDraft(props.posts[0].content)
              .title.split(" ")
              .join("-")}`}
            className="jumbotron__button"
            rel="noopener noreferrer"
            target="_blank"
          >
            Read more
          </a>
        </div>
        <PostBlock posts={props.posts} />
      </div>
    </div>
  );
};

export default Jumbotron;
