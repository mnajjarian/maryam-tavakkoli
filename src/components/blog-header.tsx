import React from "react";

const imgTech = require("../assets/images/tech-image.jpg");
interface Paragraph {
  title: string;
  text: string[];
}
interface Props {
  posts: {
    id: string;
    title: string;
    paragraph: Paragraph[];
    imgUrl: string;
    createdAt: string;
  };
}

const BlogHeader = (props: Props) => {
  const {
    posts: { title, paragraph, imgUrl, createdAt }
  } = props;
  return (
    <div className="blog__header">
      <div className="blog__header__content">
        <div className="blog__header__items">
          <h2>{title}</h2>
          <p>{paragraph[0].text[0].substring(0, 320)}...</p>
          <span>
            {new Intl.DateTimeFormat("en-us", {
              year: "numeric",
              month: "short",
              day: "2-digit"
            }).format(new Date(createdAt))}
          </span>
        </div>
        <img src={imgTech} alt="tech" />
      </div>
    </div>
  );
};

export default BlogHeader;
