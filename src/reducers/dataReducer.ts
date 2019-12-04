export interface User {
  id: string;
  name: string;
  bio: string;
  imageUrl: string;
}
export interface Blog {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
export interface DataState {
  blogs: Blog[];
  gallery: IGallery[];
  users: User[];
}
export interface IGallery {
  created_at: string;
  format: string;
  height: number;
  public_id: string;
  type: string;
  version: number;
  width: number;
}
export const initialDataState: DataState = {
  blogs: [],
  users: [],
  gallery: []
};
export type DataAction =
  | { type: "FETCH_USERS"; payload: User[] }
  | { type: "UPDATE_USER"; payload: any }
  | { type: "ADD_POST"; payload: Blog }
  | { type: "REMOVE_POST"; payload: string }
  | { type: "FETCH_POSTS"; payload: Blog[] }
  | { type: "FETCH_GALLERY"; payload: IGallery[] }
  | { type: "ADD_GALLERY"; payload: IGallery }
  | { type: 'SET_AVATAR'; payload: string }
  | { type: 'REMOVE_IMAGE'; payload: string }

export const dataReducer = (state: DataState, action: DataAction) => {
  console.log(action)
  switch (action.type) {
    case "FETCH_USERS":
      return { ...state, users: action.payload };
    case "UPDATE_USER":
      const user = state.users.filter((user: User) => user.id === action.payload.userId)[0]
      return {...state,  users: state.users.map((user: User) => user.id !== action.payload.userId ? user : action.payload)};
    case "FETCH_POSTS":
      return { ...state, blogs: action.payload };
    case "FETCH_GALLERY":
      return { ...state, gallery: action.payload };
    case "SET_AVATAR":
      return {...state };
    case 'ADD_GALLERY':
        return {...state, gallery: state.gallery.concat(action.payload) };
    case "ADD_POST":
      return { ...state, blogs: state.blogs.concat(action.payload) };
    case 'REMOVE_POST':
      return { ...state, blogs: state.blogs.filter((blog: Blog) => blog.id !== action.payload )};
    case 'REMOVE_IMAGE':
      return {...state, gallery: state.gallery.filter((img: IGallery) => img.public_id !== action.payload)}
    default:
      return state;
  }
};
