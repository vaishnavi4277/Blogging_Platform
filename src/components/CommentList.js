// src/pages/DashboardComments.js
import React, { useContext, useState } from "react";
import { BlogContext } from "../context/BlogContext";

export default function DashboardComments() {
  const { blogs, editBlog } = useContext(BlogContext); // editBlog to update comments
  const [newCommentText, setNewCommentText] = useState({});
  
  // Handle adding comment for a blog
  const handleAddComment = (blogId) => {
    const text = newCommentText[blogId];
    if (!text || !text.trim()) return;

    const blog = blogs.find((b) => b.id === blogId);
    const updatedComments = [...(blog.comments || []), text];

    editBlog(blogId, blog.title, blog.content, blog.image, updatedComments);

    setNewCommentText({ ...newCommentText, [blogId]: "" });
  };

  return (
    <div>
      <h2>💬 All Comments</h2>
      {blogs.length === 0 ? (
        <p>No blogs to show comments for.</p>
      ) : (
        blogs.map((b) => (
          <div key={b.id} style={{ borderBottom: "1px solid #ccc", marginBottom: "20px", paddingBottom: "10px" }}>
            <h3>{b.title}</h3>

            {/* List of comments */}
            {b.comments && b.comments.length > 0 ? (
              <ul>
                {b.comments.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            ) : (
              <p>No comments yet.</p>
            )}

          </div>
        ))
      )}
    </div>
  );
}
