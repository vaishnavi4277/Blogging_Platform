import React, { useEffect, useState, useContext } from "react";
import "./dashboard.css";
import { BlogContext } from "../context/BlogContext";
import { Link, useNavigate } from "react-router-dom";
import CommentList from "../components/CommentList";
import Settings from "./Settings";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState("posts");
  const { blogs, deleteBlog } = useContext(BlogContext);
  const navigate = useNavigate();

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (!user) return <p className="please-login">⚠️ Please login first.</p>;

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">EchoBlog</h2>
        <ul className="menu">
          <li onClick={() => setActivePage("posts")}>📄 Posts</li>
          <li onClick={() => setActivePage("stats")}>📊 Stats</li>
          <li onClick={() => setActivePage("comments")}>💬 Comments</li>
          <li onClick={() => setActivePage("earnings")}>💰 Earnings</li>
          <li onClick={() => setActivePage("pages")}>📑 Pages</li>
          <li onClick={() => setActivePage("layout")}>📐 Layout</li>
          <li onClick={() => setActivePage("theme")}>🎨 Theme</li>
         <li onClick={() => navigate("/settings")}>⚙️ Settings</li>
          <li onClick={() => setActivePage("reading")}>📚 Reading List</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="content">
        <div className="user-info">
          <h2>Welcome, {user.name} 👋</h2>
        </div>

        {/* POSTS PAGE */}
        {activePage === "posts" && (
          <div className="blogs-section">
            <div className="blogs-header">
              <h3>Your Blogs ({blogs.length})</h3>
              <Link to="/create">
                <button className="create-btn">+ Create New Blog</button>
              </Link>
            </div>

            <div className="blogs-list">
              {blogs.length === 0 ? (
                <p>No blogs published yet.</p>
              ) : (
                blogs.map((b) => (
                  <div key={b.id || b._id} className="blog-card simple">
                    {/* Title */}
                    <h4
                      className="blog-title"
                      onClick={() => navigate("/view", { state: { blog: b } })}
                      style={{ cursor: "pointer" }}
                    >
                      {b.title || "Untitled Blog"}
                    </h4>

                    {/* Actions */}
                    <div className="actions">
                      <button
                        className="edit-btn"
                        onClick={() => navigate(`/edit/${b.id || b._id}`)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteBlog(b.id || b._id)}
                      >
                        🗑 Delete
                      </button>
                      <Link to="/view" state={{ blog: b }}>
                        <button className="view-btn">👀 View</button>
                      </Link>
                    </div>

                    {/* Date */}
                    <small>
                      🕒{" "}
                      {b.createdAt
                        ? new Date(b.createdAt).toLocaleString()
                        : "Unknown date"}
                    </small>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* OTHER PAGES */}
        {activePage === "stats" && <h3>📊 Stats coming soon...</h3>}
        {activePage === "comments" && <CommentList />}
        {activePage === "earnings" && <h3>💰 Earnings page</h3>}
        {activePage === "pages" && <h3>📑 Manage your pages</h3>}
        {activePage === "layout" && <h3>📐 Layout settings</h3>}
        {activePage === "theme" && <h3>🎨 Theme customizer</h3>}
        {activePage === "comments" && <Settings />}
        {activePage === "reading" && <h3>📚 Reading list</h3>}
      </main>
    </div>
  );
}
