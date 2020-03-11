import React from "react";
import classNames from "classnames";
//import { Link } from "react-router-dom";

interface Props {
  imgUrl: string;
  title: string;
  href: string;
  btnText: string;
  text: string;
  flexDirect: string;
  borderRadius: string;
}
const Section = (props: Props) => (
  <div className="section">
    <section
      className={classNames({
        section__content: true,
        [`section__content--${props.flexDirect}`]: true
      })}
    >
      <img
        className="section__img"
        style={{ borderRadius: props.borderRadius }}
        src={
          props.imgUrl ? props.imgUrl : require("../assets/images/avatar.png")
        }
        alt="biography"
      />
      <article className="section__article">
        <h2 className="section__article--title">{props.title}</h2>
        <span className="section__article--span"></span>
        <p className="section__article--text">{props.text}</p>
        {/* {props.text.length > 20 && <Link to={props.href}>{props.btnText}</Link>} */}
      </article>
      <Social />
    </section>

    <Footer />
  </div>
);

export default Section;

const Footer = (): JSX.Element => {
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
        <img src={require("../assets/icons/instagram-2.svg")} alt="icon" />
      </a>
    </li>
  </ul>
);
