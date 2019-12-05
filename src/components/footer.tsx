import React from "react";

const Footer = () => (
  <div className="footer">
    <section className="footer__section">
      <h2 className="footer__section-h2">Contact</h2>
      <ul className="footer__section__list">
        <li className="footer__section__items">
          <a
            className="footer__section__link"
            href="https://www.linkedin.com/in/maryam-tavakoli/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="footer__section__linkedin"></div>
          </a>
        </li>
        <li className="footer__section__items">
          <a
            className="footer__section__link"
            href="https://www.facebook.com/maryam.tavakkoli.39566"
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="footer__section__facebook"></div>
          </a>
        </li>
      </ul>
    </section>
    <div className="footer__subtitle">
      site by{" "}
      <a
        className="footer__subtitle__link"
        href="https://github.com/mnajjarian"
        rel="noopener noreferrer"
        target="_blank"
      >
        mahdi najjarian
      </a>
    </div>
  </div>
);

export default Footer;
