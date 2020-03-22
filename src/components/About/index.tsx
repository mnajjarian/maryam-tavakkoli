import React, { useContext } from 'react'
import { DataContext } from '../../contexts/dataContext'
import { AuthContext } from '../../contexts/authContext'
import Layout from '../Layout'
import AvatarIcon from '../../assets/images/avatar.png'

function About(): JSX.Element {
  const { authState } = useContext(AuthContext)

  const {
    data: { users },
  } = useContext(DataContext)

  if (!users.length || !authState) {
    return <div></div>
  }

  const { bio, imageUrl } = users[0]

  return (
    <Layout>
      <section className="about">
        <img className="about__img" src={imageUrl ? imageUrl : AvatarIcon} alt="biography" />
        <article className="about__article">
          <h2 className="about__article__title">
            Hello,
            <span>a bit about me</span>
          </h2>
          <div className="about__links">
            <a href="/about#">my resume</a>
            <a href="/about#">my skills</a>
            <a href="/about#">my works</a>
          </div>
          <p className="about__article__text">{bio}</p>
          {/* {props.text.length > 20 && <Link to={props.href}>{props.btnText}</Link>} */}
        </article>
      </section>
    </Layout>
  )
}

export default About
