// BlogContext.js
import React, { createContext, useState } from "react";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  const addBlog = (title, content, image, comments = []) => {
    const newBlog = {
      id: Date.now(), // unique id
      title,
      content,
      image,
      comments,
      createdAt: new Date().toISOString(),
    };
    setBlogs([...blogs, newBlog]);
  };

  const editBlog = (id, title, content, image, comments) => {
    setBlogs((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, title, content, image, comments }
          : b
      )
    );
  };

  const deleteBlog = (id) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, editBlog, deleteBlog }}>
      {children}
    </BlogContext.Provider>
  );
};
