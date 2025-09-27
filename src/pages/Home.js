import React, { useEffect, useState } from "react";
import API from "../services/api";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await API.get("/api/blogs");
    setBlogs(res.data);
  };

  const onSearch = async (e) => {
    e.preventDefault();
    const res = await API.get("/api/blogs", { params: { search: q } });
    setBlogs(res.data);
  };

  return (
    <div>
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 30px",
          background: "#fff",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "20px" }}>
          <span style={{ color: "black" }}>E</span>
          <span style={{ color: "#666" }}>CHO</span>{" "}
          <span style={{ color: "blue" }}>Blog</span>
        </div>

        <form onSubmit={onSearch} style={{ flex: 1, margin: "0 40px" }}>
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "20px",
              border: "1px solid #ccc",
            }}
          />
        </form>

        <div>
          <Link to="/login">
            <button
              style={{
                marginRight: "10px",
                padding: "8px 16px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button
              style={{
                marginRight: "10px",
                padding: "8px 16px",
                background: "#0d6efd",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Signup
            </button>
          </Link>
          <Link to="/admin">
            <button
              style={{
                padding: "8px 16px",
                background: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Admin
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        style={{
          textAlign: "center",
          padding: "80px 20px",
          background: "linear-gradient(90deg, #ff7e5f, #feb47b)",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "40px", marginBottom: "10px" }}>
          Welcome to MyBlog
        </h1>
        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
          Create, share, and explore blogs from people around the world.
        </p>
        <button
          style={{
            padding: "12px 24px",
            border: "none",
            borderRadius: "25px",
            background: "white",
            color: "#ff7e5f",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Get Started
        </button>
      </header>

      {/* Blog Listing */}
      <div style={{ padding: "40px", background: "#f9f9f9" }}>
        <h2 style={{ marginBottom: "20px" }}>Latest Blogs</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {blogs.map((b) => (
            <BlogCard key={b._id} blog={b} />
          ))}
        </div>
      </div>
    </div>
  );
}
