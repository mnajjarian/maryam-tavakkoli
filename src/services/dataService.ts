import { Dispatch } from 'react';
import axios from 'axios';
import { customAxios } from './customAxios';
import { DataState, DataAction } from '../reducers/dataReducer';

export interface CommentState { 
    commenter?: string, 
    email?: string, 
    comment: string 
}

export const useDataService = (state: DataState, dispatch: Dispatch<DataAction>) => {
    const getPosts = () => {
        customAxios.get('/posts')
        .then(res => {
             dispatch({
                type: 'FETCH_POSTS',
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    };
    const createNewPost = (newPost: {author: string, content: string }) => {
         customAxios
        .post('/posts', newPost)
        .then(res => {
            dispatch({
                type: 'ADD_POST',
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    };
    const updatePost = (blogId: string, content: string) => {
        customAxios.put(`/posts/${blogId}`, { content: content })
        .then(res => {
            console.log(res.data)
        })
    };
    const getUsers = () => {
        customAxios.get('users')
        .then(res => {
            dispatch({
                type: 'FETCH_USERS',
                payload: res.data
            })
        })
    }
    const updateUser = (objId: string, obj: any, publicId: string) => {
        customAxios.put(`/users/${objId}`, { obj: obj, publicId: publicId } )
        .then(res => {
            dispatch({
                type: 'UPDATE_USER',
                payload: res.data
            })
        })
    }
    const removeImage = (publicId: string) => {
        customAxios.delete(`/assets/${publicId}`)
        .then(res => {
            dispatch({
                type: 'REMOVE_IMAGE',
                payload: publicId
            })
        })
    }
    const removeAssets = (publicIds: string[]) => {
        customAxios.post('/assets', publicIds)
        .then(res => {
            console.log(res.data)
        })
    }
    const removePost = (blogId: string) => {
        customAxios
        .delete(`/posts/${blogId}`)
        .then(res => {
            dispatch({
                type: 'REMOVE_POST',
                payload: blogId
            })
        })
    };
    const addComment = (comment: CommentState) => {
        customAxios
        .post('/comments', comment)
        .then(res => {
            dispatch({
                type: 'ADD_COMMENT',
                payload: res.data
            })
        })
        .catch((err: Error) => {
            console.log(err)
        })
    };
    const removeComment = (commentId: string) => {
        customAxios
        .delete(`/comments/${commentId}`)
        .then(res => {
            dispatch({
                type: 'REMOVE_COMMENT',
                payload: res.data
            });
        })
        .catch((err: Error) => {
            console.log(err)
        })
    };
    const getGallery = () => {
    axios
      .get("https://res.cloudinary.com/dfjemz4f7/image/list/xmas.json")
      .then(res => {
        dispatch({
            type: 'FETCH_GALLERY',
            payload: res.data.resources
        })
      });
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
        removeComment
    };
};