import { Dispatch } from 'react';
import { customAxios } from './customAxios';
import { DataState, Blog, DataAction } from '../reducers/dataReducer';

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
    const createNewPost = (blog: string) => {
        console.log(typeof blog, blog)
         customAxios
        .post('/posts', {draft: blog})
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
    return {
        getPosts,
        getProfile,
        createNewPost
    };
};