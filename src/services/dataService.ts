import { Dispatch } from 'react'
import axios from 'axios'
import { customAxios } from './customAxios'
import { DataState, DataAction, User } from '../reducers/dataReducer'

export type CommentState = {
  commenter?: string
  email?: string
  comment: string
}
type NewPost = { userId: string; content: string }

type DataService = {
  getPosts: () => void
  getGallery: () => void
  createNewPost: (newPost: NewPost) => void
  updatePost: (blogId: string, content: string) => void
  removePost: (blogId: string) => void
  getUsers: () => void
  updateUser: (objId: string, obj: User, publicId: string) => void
  removeAssets: (publicId: string[]) => void
  removeImage: (publicId: string) => void
  addComment: (comment: CommentState) => void
  removeComment: (commentId: string) => void
}

export function useDataService(state: DataState, dispatch: Dispatch<DataAction>): DataService {
  const getPosts = (): void => {
    customAxios
      .get('/posts')
      .then(res => {
        dispatch({
          type: 'FETCH_POSTS',
          payload: res.data,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  const createNewPost = (newPost: NewPost): void => {
    customAxios
      .post('/posts', newPost)
      .then(res => {
        dispatch({
          type: 'ADD_POST',
          payload: res.data,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  const updatePost = (blogId: string, content: string): void => {
    customAxios
      .put(`/posts/${blogId}`, { content: content })
      .then(res => {
        dispatch({
          type: 'EDIT_POST',
          payload: res.data,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  const getUsers = (): void => {
    customAxios.get('/users').then(res => {
      dispatch({
        type: 'FETCH_USERS',
        payload: res.data,
      })
    })
  }
  const updateUser = (objId: string, obj: User, publicId: string): void => {
    console.log(obj)
    customAxios
      .put(`/users/${objId}`, { obj: obj, publicId: publicId })
      .then(res => {
        if (res.data._id) {
          dispatch({
            type: 'UPDATE_USER',
            payload: res.data,
          })
        } else {
          dispatch({
            type: 'ERROR_MESSAGE',
            payload: res.data,
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  const removeImage = (publicId: string): void => {
    customAxios.delete(`/assets/${publicId}`).then(() => {
      dispatch({
        type: 'REMOVE_IMAGE',
        payload: publicId,
      })
    })
  }
  const removeAssets = (publicIds: string[]): void => {
    customAxios.post('/assets', publicIds).then(res => {
      console.log(res.data)
    })
  }
  const removePost = (blogId: string): void => {
    customAxios.delete(`/posts/${blogId}`).then(() => {
      dispatch({
        type: 'REMOVE_POST',
        payload: blogId,
      })
    })
  }
  const addComment = (comment: CommentState): void => {
    customAxios
      .post('/comments', comment)
      .then(res => {
        dispatch({
          type: 'ADD_COMMENT',
          payload: res.data,
        })
      })
      .catch((err: Error) => {
        console.log(err)
      })
  }
  const removeComment = (commentId: string): void => {
    customAxios
      .delete(`/comments/${commentId}`)
      .then(res => {
        dispatch({
          type: 'REMOVE_COMMENT',
          payload: res.data,
        })
      })
      .catch((err: Error) => {
        console.log(err)
      })
  }
  const getGallery = (): void => {
    axios
      .get(`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDNAME}/image/list/xmas.json`)
      .then(res => {
        dispatch({
          type: 'FETCH_GALLERY',
          payload: res.data.resources,
        })
      })
      .catch((err: Error) => {
        console.log(err)
      })
  }
  return {
    getPosts,
    getGallery,
    createNewPost,
    updatePost,
    removePost,
    getUsers,
    updateUser,
    removeAssets,
    removeImage,
    addComment,
    removeComment,
  }
}
