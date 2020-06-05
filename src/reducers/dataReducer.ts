/* eslint-disable camelcase */

export interface User {
  _id: string
  isAdmin: boolean
  username: string
  firstName: string
  lastName: string
  imageUrl?: string
  title: string
  bio: string
}
export interface CommentInterface {
  _id: string
  comment: string
  post: string
  commenter: string
  email: string
  createdAt: string
}
export interface BlogInterface {
  id: string
  content: string
  createdAt: string
  updatedAt: string
  comments: CommentInterface[]
  user: User
  draft: boolean
}
export interface DataState {
  isFetched: boolean
  blogs: BlogInterface[]
  gallery: GalleryInterface[]
  users: User[]
  message: string | null
}
export interface GalleryInterface {
  created_at: string
  format: string
  height: number
  public_id: string
  type: string
  version: number
  width: number
  secure_url: string
}
export interface UserUpdateImage {
  obj: {
    imageUrl: string
  }
  userId: string
}
export const initialDataState: DataState = {
  isFetched: false,
  blogs: [],
  users: [],
  gallery: [],
  message: null,
}

export type DataAction =
  | { type: 'FETCH_USERS'; payload: User[] }
  | { type: 'UPDATE_USER'; payload: any }
  | { type: 'UPDATE_USER_IMAGE'; payload: UserUpdateImage }
  | { type: 'ADD_POST'; payload: BlogInterface }
  | { type: 'EDIT_POST'; payload: BlogInterface }
  | { type: 'REMOVE_POST'; payload: string }
  | { type: 'FETCH_POSTS'; payload: BlogInterface[] }
  | { type: 'POSTS_FECHED' }
  | { type: 'FETCH_GALLERY'; payload: GalleryInterface[] }
  | { type: 'ADD_GALLERY'; payload: GalleryInterface }
  | { type: 'SET_AVATAR'; payload: string }
  | { type: 'REMOVE_IMAGE'; payload: string }
  | { type: 'ADD_COMMENT'; payload: CommentInterface }
  | { type: 'REMOVE_COMMENT'; payload: CommentInterface }
  | { type: 'ERROR_MESSAGE'; payload: string }
  | { type: 'REMOVE_MESSAGE' }

const sortByDate = (obj: BlogInterface[]): BlogInterface[] =>
  obj.sort((a: BlogInterface, b: BlogInterface) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)))

/** check for exhaustiveness on reducer */
function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x)
}

export const dataReducer = (state: DataState, action: DataAction): DataState => {
  //console.log(action)
  switch (action.type) {
    case 'FETCH_USERS':
      return { ...state, users: action.payload }
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((user: User) => (user._id !== action.payload.userId ? user : action.payload)),
      }
    case 'UPDATE_USER_IMAGE':
      const userToUpdate = state.users.filter((user: User) => user._id === action.payload.userId)[0]
      userToUpdate.imageUrl = action.payload.obj.imageUrl
      return {
        ...state,
        users: state.users.map((user: User) => (user._id !== action.payload.userId ? user : userToUpdate)),
      }
    case 'FETCH_POSTS':
      return { ...state, blogs: sortByDate(action.payload) }
    case 'POSTS_FECHED':
      return { ...state, isFetched: true }
    case 'FETCH_GALLERY':
      return { ...state, gallery: action.payload }
    case 'SET_AVATAR':
      return { ...state }
    case 'ADD_GALLERY':
      return { ...state, gallery: state.gallery.concat(action.payload) }
    case 'ADD_POST':
      return { ...state, blogs: state.blogs.concat(action.payload) }
    case 'EDIT_POST':
      return {
        ...state,
        blogs: state.blogs.map(blog => (blog.id === action.payload.id ? action.payload : blog)),
      }
    case 'REMOVE_POST':
      return {
        ...state,
        blogs: state.blogs.filter((blog: BlogInterface) => blog.id !== action.payload),
      }
    case 'REMOVE_IMAGE':
      return {
        ...state,
        gallery: state.gallery.filter((img: GalleryInterface) => img.public_id !== action.payload),
      }
    case 'ADD_COMMENT':
      const post = state.blogs.filter((b: BlogInterface) => b.id === action.payload.post)[0]
      post.comments = post.comments.concat(action.payload)
      return {
        ...state,
        blogs: state.blogs.map((blog: BlogInterface) => (blog.id === action.payload._id ? post : blog)),
      }
    case 'REMOVE_COMMENT':
      const postBlog = state.blogs.filter((b: BlogInterface) => b.id === action.payload.post)[0]
      postBlog.comments = postBlog.comments.filter((comment: CommentInterface) => comment._id !== action.payload._id)
      return {
        ...state,
        blogs: state.blogs.map((blog: BlogInterface) => (blog.id === action.payload.post ? postBlog : blog)),
      }
    case 'ERROR_MESSAGE':
      return {
        ...state,
        message: action.payload,
      }
    case 'REMOVE_MESSAGE':
      return {
        ...state,
        message: null,
      }
    default:
      return assertNever(action)
  }
}
