import { RawDraftContentState, RawDraftContentBlock } from 'draft-js'
import { ContentBlock } from 'draft-js'

type DraftType = {
  title: string
  p: string
  url: string
}
export const emailValidation = (email: string): RegExpMatchArray | null =>
  email.match(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-\\.]+)\.([a-zA-Z]{2,5})$/)

export const getBlockStyle = (block: ContentBlock): string => {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote'
    case 'unstyled':
      return 'RichEditor-paragraph'
    case 'CODE':
      return 'RichEditor-blockcode'
    case 'STRIKETHROUGH':
      return 'RichEditor-strikethrough'
    default:
      return ''
  }
}
export const extractFromDraft = (content: string): DraftType => {
  const draft: RawDraftContentState = JSON.parse(content)
  const { blocks } = draft
  const blocksWithText = blocks.filter((b: RawDraftContentBlock) => b.text.length)
  const title = blocksWithText.filter((b: RawDraftContentBlock) => b.type === 'header-one')[0]
  const p = blocksWithText.filter((b: RawDraftContentBlock) => b.type === 'unstyled')[0]
  const imgUrl = draft.entityMap[0] ? draft.entityMap[0].data['src'] : null
  return {
    title: title.text,
    p: p.text,
    url: imgUrl,
  }
}

export const formatDateAndTime = (date: string): string =>
  new Intl.DateTimeFormat('en-us', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(new Date(date))
