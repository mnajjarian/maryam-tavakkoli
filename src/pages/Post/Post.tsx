import React, { useContext } from 'react'
import { DataContext } from '../../contexts/dataContext'
import { convertFromRaw, EditorState, RawDraftContentState } from 'draft-js'
import renderHTML from 'react-render-html'
import { stateToHTML } from 'draft-js-export-html'
import { BlogType } from '../Blog/Blog'
import { Comment } from './Comment/Comment'
import Loading from '../../components/Loading/Loading'
import LinkedinIcon from '../../assets/icons/linkedin-4.svg'
import FacebookIcon from '../../assets/icons/facebook-2.svg'
import TwitterIcon from '../../assets/icons/twitter-2.svg'
import { Layout } from '../../components/Layout/Layout'
import { formatDate } from 'Helper'

export function Post({ match }: any): JSX.Element {
  const {
    data: { blogs },
  } = useContext(DataContext)
  const {
    params: { id },
  } = match
  if (!id) {
    return <div></div>
  }

  const title: string = id.split('-').join(' ')
  const post: BlogType | undefined = blogs.find((p: BlogType) => p.content.includes(title))

  if (!post) {
    return <Loading />
  }
  const rawDraft: RawDraftContentState = JSON.parse(post.content)

  const content = convertFromRaw(rawDraft)
  const editorState: EditorState = EditorState.createWithContent(content)
  const editorContentHtml = stateToHTML(editorState.getCurrentContent())

  return (
    <Layout>
      <div className="post row">
        <h1 className="post__title">{title}</h1>
        <div className="col-md-8">
          <p className="post__info">
            Published&nbsp;
            <time>{formatDate(post.createdAt)}</time>
            &nbsp;|&nbsp;By&nbsp;{post.user.firstName + ' ' + post.user.lastName}
          </p>
          <div className="post__content ">{renderHTML(editorContentHtml)}</div>

          <div className="post__social">
            <div className="post__social__icon">
              <img src={FacebookIcon} alt="facebook" />
            </div>
            <div className="post__social__icon">
              <img src={LinkedinIcon} alt="linkedin" />
            </div>
            <div className="post__social__icon">
              <img src={TwitterIcon} alt="twitter" />
            </div>
          </div>
          <span className="post__line"></span>
          <Comment comments={post.comments} postId={post.id} />
        </div>
      </div>
    </Layout>
  )
}
