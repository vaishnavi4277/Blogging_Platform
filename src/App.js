import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateEditBlog from "./pages/CreateEditBlog";
import ViewBlog from "./pages/ViewBlog";
import AdminPanel from "./pages/AdminPanel";
import { BlogProvider } from "./context/BlogContext";
import BlogDetails from './pages/BlogDetails.js';
import Settings from "./pages/Settings";
function App() {
  return (
    <BlogProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateEditBlog />} />
        <Route path="/edit/:id" element={<CreateEditBlog />} />
        <Route path="/blog/:id" element={<ViewBlog />} />
        <Route path="/admin" element={<AdminPanel />} />
       <Route path="/view" element={<BlogDetails />} />
          <Route path="/settings" element={<Settings />} />

      </Routes>
    </BlogProvider>
  );
}

export default App;
