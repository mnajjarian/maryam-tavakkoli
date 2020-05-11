import React, { useContext } from 'react'
import { DataContext } from '../../contexts/dataContext'
import { convertFromRaw, EditorState, RawDraftContentState } from 'draft-js'
import renderHTML from 'react-render-html'
import { stateToHTML } from 'draft-js-export-html'
import { BlogType } from '../Blog/Blog'
import { Comment } from '../Comment/Comment'
import Loading from '../Loading/Loading'
import LinkedinIcon from '../../assets/icons/linkedin-2.svg'
import FacebookIcon from '../../assets/icons/facebook-2.svg'
import TwitterIcon from '../../assets/icons/twitter-2.svg'
import { Layout } from 'components/Layout/Layout'

type Match = {
  match: {
    params: {
      id: string
    }
  }
}
export function Post({ match }: Match): JSX.Element {
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
  const post: BlogType = blogs.find((p: BlogType) => p.content.includes(title))

  if (!post) {
    return <Loading />
  }
  const rawDraft: RawDraftContentState = JSON.parse(post.content)

  const content = convertFromRaw(rawDraft)
  const editorState: EditorState = EditorState.createWithContent(content)
  const editorContentHtml = stateToHTML(editorState.getCurrentContent())

  return (
    <Layout>
      <main className="post">
        <article className="post__article">
          <header className="post__header">
            <p>
              {'By '}
              <strong>{post.user.firstName + ' ' + post.user.lastName}</strong>
              <time className="post__time">
                {' '}
                {new Intl.DateTimeFormat('en-us', {
                  year: 'numeric',
                  month: 'long',
                  day: '2-digit',
                }).format(new Date(post.createdAt))}
              </time>
            </p>
          </header>
          {renderHTML(editorContentHtml)}
          <footer className="post__footer">
            <div className="post__social">
              <div className="post__social__buttons ">
                <div className="post__social__facebook">
                  <img src={FacebookIcon} alt="facebook" />
                </div>
                <div className="post__social__linkedin">
                  <img src={LinkedinIcon} alt="linkedin" />
                </div>
                <div className="post__social__twitter">
                  <img src={TwitterIcon} alt="twitter" />
                </div>
              </div>
            </div>
          </footer>
          <Comment comments={post.comments} postId={post.id} />
        </article>
      </main>
    </Layout>
  )
}
