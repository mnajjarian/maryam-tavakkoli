import Biography from "../components/Bio"

export interface Profile {
    id: string;
    name: string;
    biography: string;
}
export interface Blog {
    id: string;
    content: string;
    createdAt: string;
}
export interface DataState {
    blogs: Blog[],
    profile: Profile | unknown
}
export const initialDataState: DataState = {
    blogs: [],
    profile: null as unknown,
}
export type DataAction = 
| { type: 'FETCH_PROFILE', payload: any } 
| { type: 'ADD_POST', payload: Blog } 
| { type: 'FETCH_POSTS', payload: Blog[] }


export const dataReducer = (state: DataState, action: DataAction) => {
    switch (action.type) {
        case 'FETCH_PROFILE':
            return {...state, profile: action.payload };
        case 'FETCH_POSTS':
            return {...state, blogs: action.payload }
        case 'ADD_POST':
            return {...state, blogs: state.blogs.concat(action.payload)}
            break;
        default:
            return state;
    }
}