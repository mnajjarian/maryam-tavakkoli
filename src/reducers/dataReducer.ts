
export interface Profile {
  id: string;
  name: string;
  biography: string;
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
  profile: Profile | unknown;
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
  profile: null as unknown,
  gallery: []
};
export type DataAction =
  | { type: "FETCH_PROFILE"; payload: any }
  | { type: "ADD_POST"; payload: Blog }
  | { type: "REMOVE_POST"; payload: string }
  | { type: "FETCH_POSTS"; payload: Blog[] }
  | { type: "FETCH_GALLERY"; payload: IGallery[] }
  | { type: "ADD_GALLERY"; payload: IGallery };

export const dataReducer = (state: DataState, action: DataAction) => {
  switch (action.type) {
    case "FETCH_PROFILE":
      return { ...state, profile: action.payload };
    case "FETCH_POSTS":
      return { ...state, blogs: action.payload };
    case "FETCH_GALLERY":
      return { ...state, gallery: action.payload };
    case 'ADD_GALLERY':
        return {...state, gallery: state.gallery.concat(action.payload) };
    case "ADD_POST":
      return { ...state, blogs: state.blogs.concat(action.payload) };
    case 'REMOVE_POST':
      return { ...state, blogs: state.blogs.filter((blog: any) => blog.id !== action.payload )}
    default:
      return state;
  }
};
