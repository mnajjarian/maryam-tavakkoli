import React, { useState, KeyboardEvent, createRef, useContext } from 'react'
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  DraftEditorCommand,
  convertToRaw,
  AtomicBlockUtils,
  convertFromRaw,
} from 'draft-js'
import { Toolbar } from '../Toolbar/Toolbar'
import { DataContext } from '../../../contexts/dataContext'
import { mediaBlockRenderer } from '../MediaBlockRenderer/MediaBlockRenderer'
import { useHistory, RouteComponentProps } from 'react-router-dom'
import { getBlockStyle, validateDraft } from 'Helper'
import { BlogType } from 'pages/Blog/Blog'
import { DataServices } from 'services/dataService'

type HandleKeyCommand = 'handled' | 'not-handled'

type Props = {
  postId: string
}
export function RichEditor({ match }: RouteComponentProps<Props>): JSX.Element {
  const {
    params: { postId },
  } = match

  const { data, dataDispatch } = useContext(DataContext)
  const dataService = new DataServices(dataDispatch)
  const blogPost = postId ? data.blogs.filter((b: BlogType) => b.id === postId)[0] : null
  const blogState: EditorState = blogPost
    ? EditorState.createWithContent(convertFromRaw(JSON.parse(blogPost.content)))
    : EditorState.createEmpty()

  const [editorState, setEditorState] = useState<EditorState>(blogState)

  const history = useHistory()

  const editor = createRef<Editor>()
  const focusEditor = (): void => {
    if (editor.current) {
      editor.current.focus()
    }
  }
  const handleChange = (editorState: EditorState): void => {
    setEditorState(editorState)
  }

  const handleSave = (): void => {
    const content = editorState.getCurrentContent()
    const editorContent = JSON.stringify(convertToRaw(content))
    if (!validateDraft(editorContent)) {
      focusEditor()
    } else if (!postId) {
      dataService.createNewPost({
        content: editorContent,
        userId: data.users[0]._id,
      })
      history.push('/dashboard/posts')
    } else {
      dataService.updatePost(postId, editorContent)
      history.push('/dashboard/posts')
    }
  }

  const handleKeyCommand = (command: DraftEditorCommand, editorState: EditorState): HandleKeyCommand => {
    const newState = RichUtils.handleKeyCommand(editorState, command)

    if (newState) {
      handleChange(newState)
      return 'handled'
    } else {
      return 'not-handled'
    }
  }
  const mapKeyToEditorCommand = (e: KeyboardEvent): DraftEditorCommand | null => {
    if (e.keyCode === 9) {
      const newEditorState = RichUtils.onTab(e, editorState, 4)
      if (newEditorState !== editorState) {
        handleChange(newEditorState)
      }
      return null
    }
    return getDefaultKeyBinding(e)
  }

  const onAddImage = (publicId: string): void => {
    const urlValue = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDNAME}/image/upload/${publicId}.jpg`
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntitiy = contentState.createEntity('image', 'IMMUTABLE', { src: urlValue })
    const entityKey = contentStateWithEntitiy.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntitiy,
    })
    setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '))
    setTimeout(() => focusEditor(), 0)
  }

  const contentState = editorState.getCurrentContent()
  let className = 'RichEditor-editor'
  if (!contentState.hasText()) {
    if (
      contentState
        .getBlockMap()
        .first()
        .getType() !== 'unstyled'
    ) {
      className += ' RichEditor-hidePlaceholder'
    }
  }

  return (
    <div className="editor">
      <div className="RichEditor">
        <Toolbar
          variant={postId ? 'Save' : 'Publish'}
          onAddImage={onAddImage}
          editorState={editorState}
          handleChange={handleChange}
          handleSave={handleSave}
        />
        <div className={className} onClick={focusEditor}>
          <Editor
            ref={editor}
            blockStyleFn={getBlockStyle}
            blockRendererFn={mediaBlockRenderer}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={mapKeyToEditorCommand}
            onChange={handleChange}
            placeholder="Tell a story..."
          />
        </div>
      </div>
    </div>
  )
}
