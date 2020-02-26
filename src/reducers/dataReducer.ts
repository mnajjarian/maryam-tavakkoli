import { IComment } from "../components/Blog";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  imageUrl: string;
  isAdmin: boolean;
}
export interface Blog {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  comments: IComment[];
  user: User;
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
export interface UserUpdateImage {
  obj: {
    imageUrl: string;
  };
  userId: string;
}
export const initialDataState: DataState = {
  blogs: [],
  users: [],
  gallery: []
};

export type DataAction =
  | { type: "FETCH_USERS"; payload: User[] }
  | { type: "UPDATE_USER"; payload: any }
  | { type: "UPDATE_USER_IMAGE"; payload: UserUpdateImage }
  | { type: "ADD_POST"; payload: Blog }
  | { type: "REMOVE_POST"; payload: string }
  | { type: "FETCH_POSTS"; payload: Blog[] }
  | { type: "FETCH_GALLERY"; payload: IGallery[] }
  | { type: "ADD_GALLERY"; payload: IGallery }
  | { type: "SET_AVATAR"; payload: string }
  | { type: "REMOVE_IMAGE"; payload: string }
  | { type: "ADD_COMMENT"; payload: IComment }
  | { type: "REMOVE_COMMENT"; payload: IComment };

const sortByDate = (obj: any) =>
  obj.sort(
    (a: any, b: any) =>
      Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
  );

export const dataReducer = (state: DataState, action: DataAction) => {
  switch (action.type) {
    case "FETCH_USERS":
      return { ...state, users: action.payload };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user: User) =>
          user._id !== action.payload.userId ? user : action.payload
        )
      };
    case "UPDATE_USER_IMAGE":
      let userToUpdate = state.users.filter(
        (user: User) => user._id === action.payload.userId
      )[0];
      userToUpdate.imageUrl = action.payload.obj.imageUrl;
      return {
        ...state,
        users: state.users.map((user: User) =>
          user._id !== action.payload.userId ? user : userToUpdate
        )
      };
    case "FETCH_POSTS":
      return { ...state, blogs: sortByDate(action.payload) };
    case "FETCH_GALLERY":
      return { ...state, gallery: action.payload };
    case "SET_AVATAR":
      return { ...state };
    case "ADD_GALLERY":
      return { ...state, gallery: state.gallery.concat(action.payload) };
    case "ADD_POST":
      return { ...state, blogs: state.blogs.concat(action.payload) };
    case "REMOVE_POST":
      return {
        ...state,
        blogs: state.blogs.filter((blog: Blog) => blog.id !== action.payload)
      };
    case "REMOVE_IMAGE":
      return {
        ...state,
        gallery: state.gallery.filter(
          (img: IGallery) => img.public_id !== action.payload
        )
      };
    case "ADD_COMMENT":
      const post = state.blogs.filter(
        (b: Blog) => b.id === action.payload.post
      )[0];
      post.comments = post.comments.concat(action.payload);
      return {
        ...state,
        blogs: state.blogs.map((blog: Blog) =>
          blog.id === action.payload._id ? post : blog
        )
      };
    case "REMOVE_COMMENT":
      const postBlog = state.blogs.filter(
        (b: Blog) => b.id === action.payload.post
      )[0];
      postBlog.comments = postBlog.comments.filter(
        (comment: IComment) => comment._id !== action.payload._id
      );
      return {
        ...state,
        blogs: state.blogs.map((blog: Blog) =>
          blog.id === action.payload.post ? postBlog : blog
        )
      };
    default:
      return state;
  }
};
