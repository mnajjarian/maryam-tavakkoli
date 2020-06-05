import { Dispatch } from 'react'
import { customAxios } from './customAxios'
import { DataAction, User, GalleryInterface, BlogInterface } from '../reducers/dataReducer'

export type CommentState = {
  commenter?: string
  email?: string
  comment: string
}
type NewPost = { userId: string; content: string; draft: boolean }

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
        console.log('getPosts: ', err)
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
        console.log('createNewPost: ', err)
      })
  }
  updatePost = (blogId: string | undefined, blog: BlogInterface): void => {
    customAxios
      .put(`/posts/${blogId}`, { content: blog.content, draft: blog.draft })
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
    customAxios
      .get('/users')
      .then(res => {
        this.dispatch({
          type: 'FETCH_USERS',
          payload: res.data,
        })
      })
      .catch(err => {
        console.log('getUsers: ', err)
      })
  }
  updateUser = (objId: string, obj: { imageUrl: string } | Omit<User, '_id' | 'isAdmin'>, publicId?: string): void => {
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
        console.log('updateUser: ', err)
      })
  }
  removeImage = (publicId: string): void => {
    customAxios
      .delete(`/assets/${publicId}`)
      .then(() => {
        this.dispatch({
          type: 'REMOVE_IMAGE',
          payload: publicId,
        })
      })
      .catch(err => {
        console.log('removeImage: ', err)
      })
  }
  removeAssets = (publicIds: string[]): void => {
    customAxios.post('/assets', publicIds).then(res => {
      console.log(res.data)
    })
  }
  removePost = (blogId: string): void => {
    customAxios
      .delete(`/posts/${blogId}`)
      .then(() => {
        this.dispatch({
          type: 'REMOVE_POST',
          payload: blogId,
        })
      })
      .catch(err => {
        console.log('removePost: ', err)
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
        console.log('addComment: ', err)
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
    customAxios
      .get('/gallery')
      .then(res => {
        const result = res.data.filter((g: GalleryInterface) => g.format !== 'json')
        this.dispatch({
          type: 'FETCH_GALLERY',
          payload: result,
        })
      })
      .catch((err: Error) => {
        console.log('getGallery: ', err)
      })
  }
}
