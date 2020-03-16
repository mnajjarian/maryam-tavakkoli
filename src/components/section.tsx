import React from "react";

interface Props {
  imgUrl: string;
  text: string;
}
const Section: React.FC<Props> = ({ imgUrl, text}) => (
  <div className="section">
    <section
      className="section__content"
    >
      <img
        className="section__img"
        src={
          imgUrl ? imgUrl : require("../assets/images/avatar.png")
        }
        alt="biography"
      />
      <article className="section__article">
        <h2 className="section__article--title">Hello,</h2>
        <h3>a bit about me</h3>
        <span className="section__article--span"></span>
        <div className="section__links">
          <a href="/about#" className="section__item">my resume</a>
          <a href="/about#" className="section__item">my resume</a>
          <a href="/about#" className="section__item">my resume</a>
        </div>
        <span className="section__article--span"></span>
        <p className="section__article--text">{text}</p>
        {/* {props.text.length > 20 && <Link to={props.href}>{props.btnText}</Link>} */}
      </article>
    </section>
  </div>
);

export default Section;

const FooterX = (): JSX.Element => {
  return (
    <div className="section__footer">
      <ul className="section__footer__list">
        <li className="section__footer__link">
          <a href="/#">home</a>
        </li>
        <li className="section__footer__link">
          <a href="/#">projects</a>
        </li>
        <li className="section__footer__link">
          <a href="/#">skills</a>
        </li>
        <li className="section__footer__link">
          <a href="/#">contact</a>
        </li>
        <li className="section__footer__link">
          <a href="/blog">blog</a>
        </li>
      </ul>
    </div>
  );
};

const Social = (): JSX.Element => (
  <ul className="section__social">
    <li className="section__social__link">
      <a
        href="https://www.linkedin.com/in/maryam-tavakoli/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <img src={require("../assets/icons/linkedin-2.svg")} alt="icon" />
      </a>
    </li>
    <li className="section__social__link">
      <a
        href="https://www.facebook.com/maryam.tavakkoli.39566"
        rel="noopener noreferrer"
        target="_blank"
      >
        <img src={require("../assets/icons/facebook-2.svg")} alt="icon" />
      </a>
    </li>
    <li className="section__social__link">
      <a
        href="https://www.facebook.com/maryam.tavakkoli.39566"
        rel="noopener noreferrer"
        target="_blank"
      >
        <img src={require("../assets/icons/twitter-2.svg")} alt="icon" />
      </a>
    </li>
  </ul>
);
