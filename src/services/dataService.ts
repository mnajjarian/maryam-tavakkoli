import { Dispatch } from 'react'
import axios from 'axios'
import { customAxios } from './customAxios'
import { DataAction, User } from '../reducers/dataReducer'

export type CommentState = {
  commenter?: string
  email?: string
  comment: string
}
type NewPost = { userId: string; content: string }

export class DataServices {
  private dispatch: Dispatch<DataAction>
  constructor(dataDispatch: Dispatch<DataAction>) {
    this.dispatch = dataDispatch
  }
  getPosts = (): void => {
    customAxios
      .get('/posts')
      .then(res => {
        this.dispatch({
          type: 'FETCH_POSTS',
          payload: res.data,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  createNewPost = (newPost: NewPost): void => {
    customAxios
      .post('/posts', newPost)
      .then(res => {
        this.dispatch({
          type: 'ADD_POST',
          payload: res.data,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  updatePost = (blogId: string | undefined, content: string): void => {
    customAxios
      .put(`/posts/${blogId}`, { content: content })
      .then(res => {
        this.dispatch({
          type: 'EDIT_POST',
          payload: res.data,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  getUsers = (): void => {
    customAxios.get('/users').then(res => {
      this.dispatch({
        type: 'FETCH_USERS',
        payload: res.data,
      })
    })
  }
  updateUser = (objId: string, obj: { imageUrl: string } | Omit<User, '_id' | 'isAdmin'>, publicId?: string): void => {
    console.log(obj)
    customAxios
      .put(`/users/${objId}`, { obj: obj, publicId: publicId })
      .then(res => {
        if (res.data._id) {
          this.dispatch({
            type: 'UPDATE_USER',
            payload: res.data,
          })
        } else {
          this.dispatch({
            type: 'ERROR_MESSAGE',
            payload: res.data,
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  removeImage = (publicId: string): void => {
    customAxios.delete(`/assets/${publicId}`).then(() => {
      this.dispatch({
        type: 'REMOVE_IMAGE',
        payload: publicId,
      })
    })
  }
  removeAssets = (publicIds: string[]): void => {
    customAxios.post('/assets', publicIds).then(res => {
      console.log(res.data)
    })
  }
  removePost = (blogId: string): void => {
    customAxios.delete(`/posts/${blogId}`).then(() => {
      this.dispatch({
        type: 'REMOVE_POST',
        payload: blogId,
      })
    })
  }
  addComment = (comment: CommentState): void => {
    customAxios
      .post('/comments', comment)
      .then(res => {
        this.dispatch({
          type: 'ADD_COMMENT',
          payload: res.data,
        })
      })
      .catch((err: Error) => {
        console.log(err)
      })
  }
  removeComment = (commentId: string): void => {
    customAxios
      .delete(`/comments/${commentId}`)
      .then(res => {
        this.dispatch({
          type: 'REMOVE_COMMENT',
          payload: res.data,
        })
      })
      .catch(() => {
        window.location.href = '/dashboard/posts'
      })
  }
  getGallery = (): void => {
    axios
      .get(`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDNAME}/image/list/xmas.json`)
      .then(res => {
        this.dispatch({
          type: 'FETCH_GALLERY',
          payload: res.data.resources,
        })
      })
      .catch((err: Error) => {
        console.log(err)
      })
  }
}
