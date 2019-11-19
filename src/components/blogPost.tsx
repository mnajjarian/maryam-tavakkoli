import React from "react";
import { Link } from "react-router-dom";

const timeIcon = require("../assets/icons/time-3.svg");
const iconUser = require("../assets/icons/user.svg");
const iconBubble = require("../assets/icons/bubble.svg");

type Paragraph = {
  title: string;
  text: string[];
};

type PostProps = {
  post: {
    id: string;
    author: string;
    authorImg: string;
    authorBio: string;
    title: string;
    shortDescription: string;
    paragraph: Paragraph[];
    imgUrl: string;
    tags: string[];
    createdAt: string;
  };
};
const Post = (props: any) => {
  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en-us", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    }).format(new Date(date));

  const {
    post,
    post: { content }
  } = props;

  const draft = JSON.parse(content);
  const { blocks } = draft;
  const blocksWithText = blocks.filter((b: any) => b.text.length);
  const title = blocksWithText.filter((b: any) => b.type === "header-two")[0];
  const p = blocksWithText.filter((b: any) => b.type === "unstyled")[0];
  const imgUrl = draft.entityMap[0] ? draft.entityMap[0].data["src"] : null;
  return (
    <div className="posts">
      <section className="posts__section" >
        <div className="posts__content">
          <h2>{title.text}</h2>
          <div className="posts__header">
            <span className="posts__icon">
              <img src={timeIcon} alt="clock icon" />
              <strong>
                <time dateTime="2019-09-12" itemProp={post.createdAt}>
                  {formatDate(post.createdAt)}
                </time>
              </strong>
            </span>
            <span className="posts__icon">
              <img src={iconUser} alt="user icon" />
              <strong>{post.author}</strong>
            </span>
            <span className="posts__icon">
              <img src={iconBubble} alt="comment icon" />
              <strong>3 Comments</strong>
            </span>
          </div>
          <div className="posts__items">
            <p>
              {p.text.substring(0, 380) + "... "}
              <Link to={`/blog/${title.text.split(" ").join("-")}`}>
                read more
              </Link>
            </p>
            {imgUrl && (
              <div className="posts__image">
                <img className="posts__image" src={imgUrl} alt={post.title} />
              </div>
            )}
          </div>
          <ul className="posts__tags">
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
  );
};

export default Post;
