/* eslint-disable camelcase */
import { CommentInterface } from '../components/Blog'

export interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  bio: string
  imageUrl: string
  isAdmin: boolean
}
export interface Blog {
  id: string
  content: string
  createdAt: string
  updatedAt: string
  comments: CommentInterface[]
  user: User
}
export interface DataState {
  isFetched: boolean
  blogs: Blog[]
  gallery: GalleryInterface[]
  users: User[]
}
export interface GalleryInterface {
  created_at: string
  format: string
  height: number
  public_id: string
  type: string
  version: number
  width: number
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
}

export type DataAction =
  | { type: 'FETCH_USERS'; payload: User[] }
  | { type: 'UPDATE_USER'; payload: any }
  | { type: 'UPDATE_USER_IMAGE'; payload: UserUpdateImage }
  | { type: 'ADD_POST'; payload: Blog }
  | { type: 'EDIT_POST'; payload: Blog }
  | { type: 'REMOVE_POST'; payload: string }
  | { type: 'FETCH_POSTS'; payload: Blog[] }
  | { type: 'POSTS_FECHED' }
  | { type: 'FETCH_GALLERY'; payload: GalleryInterface[] }
  | { type: 'ADD_GALLERY'; payload: GalleryInterface }
  | { type: 'SET_AVATAR'; payload: string }
  | { type: 'REMOVE_IMAGE'; payload: string }
  | { type: 'ADD_COMMENT'; payload: CommentInterface }
  | { type: 'REMOVE_COMMENT'; payload: CommentInterface }
  | { type: 'ERROR_MESSAGE'; payload: { error: string } }

const sortByDate = (obj: Blog[]): Blog[] =>
  obj.sort((a: Blog, b: Blog) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)))

/** check for exhaustiveness on reducer */
function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x)
}

export const dataReducer = (state: DataState, action: DataAction): DataState => {
  console.log(action)
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
        blogs: state.blogs.map(blog => (blog.id !== action.payload.id ? blog : action.payload)),
      }
    case 'REMOVE_POST':
      return {
        ...state,
        blogs: state.blogs.filter((blog: Blog) => blog.id !== action.payload),
      }
    case 'REMOVE_IMAGE':
      return {
        ...state,
        gallery: state.gallery.filter((img: GalleryInterface) => img.public_id !== action.payload),
      }
    case 'ADD_COMMENT':
      const post = state.blogs.filter((b: Blog) => b.id === action.payload.post)[0]
      post.comments = post.comments.concat(action.payload)
      return {
        ...state,
        blogs: state.blogs.map((blog: Blog) => (blog.id === action.payload._id ? post : blog)),
      }
    case 'REMOVE_COMMENT':
      const postBlog = state.blogs.filter((b: Blog) => b.id === action.payload.post)[0]
      postBlog.comments = postBlog.comments.filter((comment: CommentInterface) => comment._id !== action.payload._id)
      return {
        ...state,
        blogs: state.blogs.map((blog: Blog) => (blog.id === action.payload.post ? postBlog : blog)),
      }
    case 'ERROR_MESSAGE':
      return {
        ...state,
      }
    default:
      return assertNever(action)
  }
}
