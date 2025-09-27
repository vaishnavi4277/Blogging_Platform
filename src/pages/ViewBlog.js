import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function ViewBlog() {
  const location = useLocation();
  const blog = location.state?.blog;

  if (!blog) {
    return (
      <p style={{ padding: 20 }}>
        ⚠️ No blog found. Go back to <Link to="/dashboard">Dashboard</Link>
      </p>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{blog.title}</h1>
      <p>
        🕒{" "}
        {blog.createdAt
          ? new Date(blog.createdAt).toLocaleString()
          : "Unknown date"}
      </p>
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          style={{ width: "100%", maxHeight: 300, objectFit: "cover" }}
        />
      )}
      <div
        dangerouslySetInnerHTML={{ __html: blog.content }}
        style={{ marginTop: 12, background: "#fff", padding: 12 }}
      />
      <Link to="/dashboard">
        <button style={{ marginTop: 20 }}>⬅ Back</button>
      </Link>
    </div>
  );
}
