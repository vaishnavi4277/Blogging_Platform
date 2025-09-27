import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

export default function BlogDetails() {
  const location = useLocation();
  const blog = location.state?.blog;

  const [liked, setLiked] = useState(blog?.liked || false);
  const [comments, setComments] = useState(blog?.comments || []);
  const [newComment, setNewComment] = useState("");

  if (!blog) {
    return (
      <p style={{ padding: 20 }}>
        ⚠️ No blog data. Go back to <Link to="/dashboard">Dashboard</Link>
      </p>
    );
  }

  // Toggle like
  const handleLike = () => {
    setLiked((prev) => !prev);
  };

  // Add comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments([...comments, newComment]);
    setNewComment("");
  };

  // Delete comment
  const handleDeleteComment = (index) => {
    setComments(comments.filter((_, i) => i !== index));
  };

  return (
    <div
      className="blog-details"
      style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}
    >
      <Link to="/dashboard">
        <button className="back-btn">⬅ Back to Dashboard</button>
      </Link>

      {/* Title */}
      <h2 className="blog-title">{blog.title}</h2>

      {/* Date */}
      <small className="blog-date">
        🕒{" "}
        {blog.createdAt
          ? new Date(blog.createdAt).toLocaleString()
          : "Unknown date"}
      </small>

      {/* Image */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="blog-image"
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "cover",
            borderRadius: "10px",
            marginTop: "10px",
          }}
        />
      )}

      {/* Content */}
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
        style={{
          marginTop: "15px",
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          overflowWrap: "break-word",
          wordBreak: "break-word",
          whiteSpace: "pre-line",
          maxWidth: "100%",
          overflowX: "auto",
        }}
      />

      {/* Like Button */}
      <div style={{ marginTop: "15px" }}>
        <button
          onClick={handleLike}
          style={{
            background: liked ? "red" : "gray",
            color: "#fff",
            border: "none",
            padding: "8px 12px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {liked ? "❤️ Liked" : "🤍 Like"}
        </button>
      </div>

      {/* Comments Section */}
      <div style={{ marginTop: "30px" }}>
        <h3>💬 Comments</h3>
        {comments.length > 0 ? (
          <ul>
            {comments.map((c, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span>{c}</span>
                <button
                  onClick={() => handleDeleteComment(i)}
                  style={{
                    background: "red",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "2px 6px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}

        {/* Comment Input */}
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={{
            width: "70%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleAddComment}
          style={{
            marginLeft: "10px",
            background: "blue",
            color: "#fff",
            padding: "10px 15px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
