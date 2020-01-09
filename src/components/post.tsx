import React, { Fragment, useContext } from "react";
import Nav from "./Navbar";
import { DataContext } from "../contexts/dataContext";
import { convertFromRaw, EditorState, RawDraftContentState } from "draft-js";
import renderHTML from "react-render-html";
import { stateToHTML } from "draft-js-export-html";
import { BlogType } from "./Blog";
import Comment from "./Comment";
import Loading from './Loading';

const Post = ({ match }: { match: any }) => {
  const {
    data: { blogs }
  } = useContext(DataContext);
  const {
    params: { id }
  } = match;
  if (!id) {
    return <div></div>;
  }

  const title: string = id.split("-").join(" ");
  const post: BlogType = blogs.find((p: BlogType) => p.content.includes(title));

  if (!post) {
    return <Loading />
  }
  const rawDraft: RawDraftContentState = JSON.parse(post.content);

  const content = convertFromRaw(rawDraft);
  const editorState: EditorState = EditorState.createWithContent(content);
  const editorContentHtml = stateToHTML(editorState.getCurrentContent());

  return (
    <Fragment>
      <div className="nav__wrapper">
        <Nav />
      </div>
      <main className="post">
        <article className="post__article">
          <header className="post__header">
            <p>
              {"By "}
              {post.author}
              <time className="post__time">
                {" . "}
                {new Intl.DateTimeFormat("en-us", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit"
                }).format(new Date(post.createdAt))}
              </time>{" "}
            </p>
          </header>
          {renderHTML(editorContentHtml)}
          <footer className="post__footer">
            <div className="post__social">
             {/*  <span className="post__social__title">Share the blog post</span> */}
              <div className="post__social__buttons">
                <div className="post__social__facebook"></div>
                <div className="post__social__linkedin"></div>
                <div className="post__social__twitter"></div>
              </div>
            </div>
          </footer>
         {/*  {post.comments.length > 0 && */}
        <Comment comments={post.comments} postId={post.id} />
       {/*  } */}
        </article>
        
{/*         <div className="related__posts">
          <h2 className="related__posts__title">Related blog posts</h2>
          <span className="related__posts--line"></span>
          <div className="related__posts__card">
            <ul className="related__posts__list">
              <li className="related__posts__items">
                <img
                  className="related__posts--img"
                  src={require(`../assets/images/tech-image.jpg`)}
                  alt="related post"
                />
                <p className="related__posts--text">{title}</p>
              </li>
            </ul>
          </div>
        </div> */}
      </main>
    </Fragment>
  );
};

export default Post;
