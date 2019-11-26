import { Dispatch } from 'react';
import axios from 'axios';
import { customAxios } from './customAxios';
import { DataState, DataAction } from '../reducers/dataReducer';

export const useDataService = (state: DataState, dispatch: Dispatch<DataAction>) => {
    const getProfile = () => {
        customAxios.get('/profile')
        .then(res => {
            dispatch({
                type: 'FETCH_PROFILE',
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
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
        getProfile,
        getGallery,
        createNewPost,
        updatePost,
        removePost
    };
};