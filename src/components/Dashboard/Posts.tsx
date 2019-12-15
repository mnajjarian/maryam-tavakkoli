import React, { useContext } from "react";
import { DataContext } from "../../contexts/dataContext";
import Button from "../Button";
import { BlogType } from "../Blog";
import { extractFromDraft } from "../Jumbotron";

const Posts = () => {
  const {
    data: { blogs },
    dataService
  } = useContext(DataContext);
  if (!blogs.length) {
    return <div></div>;
  }

  const handleClick = (blogId: string) => () => {
    console.log("delete", blogId);
    dataService.removePost(blogId);
  };
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
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog: BlogType, index: number) => (
              <tr key={blog.id}>
                <td>{index + 1}</td>
                <td>
                  <a
                    href={`/blog/${extractFromDraft(blog.content)
                      .title.split(" ")
                      .join("-")}`}
                  >
                    {extractFromDraft(blog.content).title}
                  </a>
                </td>
                <td>{new Date(blog.createdAt).toISOString().slice(0, 10)}</td>
                <td>{new Date(blog.updatedAt).toISOString().slice(0, 10)}</td>
                <td>
                  <a href={`/dashboard/edit/${blog.id}`}>
                    <Button text="Edit" />
                  </a>
                </td>
                <td>
                  <Button text="Delete" handleClick={handleClick(blog.id)} />
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
