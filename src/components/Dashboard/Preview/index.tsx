import React from 'react'
import { EditorState, convertFromRaw, RawDraftContentState } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import db from '../draft.db.json'
import renderHTML from 'react-render-html'

const editorContent: RawDraftContentState = db

function Preview(): JSX.Element {
  const content = convertFromRaw(editorContent)
  const editorState = EditorState.createWithContent(content)
  const editorContentHtml = stateToHTML(editorState.getCurrentContent())
  return <div>{renderHTML(editorContentHtml)}</div>
}
export default Preview
