import React, { useContext } from "react";
import { DataContext } from "../../contexts/dataContext";
import {
  RawDraftContentState,
  convertFromRaw,
  RawDraftContentBlock
} from "draft-js";
import Button from "../Button";
import { BlogType } from "../Blog";

const Posts = () => {
  const { data: { blogs }, dataService } = useContext(DataContext);
  if (!blogs.length) {
    return <div></div>;
  }
  const getContent = (editorContent: string) => {
    const rawDraft: RawDraftContentState = JSON.parse(editorContent);
    const title: RawDraftContentBlock = rawDraft.blocks.filter(
      (b: any) => b.type === "header-one"
    )[0];
    return title.text;
  };

  const handleClick = (variant: string, blogId: string) => () => {
      if(variant === 'edit') {
          console.log('edit', blogId)
      } else {
        console.log('delete', blogId)
        dataService.removePost(blogId)
      }
  }
  return (
    <div className="posts">
      <div className="posts-table">
        <table>
          <thead>
            <tr>
              <th>Post</th>
              <th>Title</th>
              <th>Created</th>
              <th>Updated</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog: BlogType, index: number) => (
              <tr key={blog._id}>
                <td>{index + 1}</td>
                <td>{getContent(blog.content)}</td>
                <td>{new Date(blog.createdAt).toISOString().slice(0, 10)}</td>
                <td>{new Date(blog.updatedAt).toISOString().slice(0, 10)}</td>
                <td>
                  <Button text="Edit" handleClick={handleClick('edit', blog._id)} />
                </td>
                <td>
                  <Button text="Delete" handleClick={handleClick('delete', blog._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div></div>
    </div>
  );
};

export default Posts;
