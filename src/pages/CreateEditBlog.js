import React, { useState, useContext, useEffect } from "react";
import { BlogContext } from "../context/BlogContext";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreateEditBlog() {
  const { blogs, addBlog, editBlog } = useContext(BlogContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [comments, setComments] = useState([]);

  // Prefill form if editing
  useEffect(() => {
    if (id) {
      const blogToEdit = blogs.find((b) => b.id.toString() === id);
      if (blogToEdit) {
        setTitle(blogToEdit.title);
        setContent(blogToEdit.content);
        setImage(blogToEdit.image || "");
        setComments(blogToEdit.comments || []);
      }
    }
  }, [id, blogs]);

  // Handle blog submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("⚠️ Please enter both title and content!");
      return;
    }

    if (id) {
      editBlog(Number(id), title, content, image, comments);
      alert("✅ Blog Updated Successfully!");
    } else {
      addBlog(title, content, image, comments);
      alert("🎉 Blog Published Successfully!");
    }

    navigate("/dashboard");
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{id ? "✏️ Edit Blog" : "➕ Create Blog"}</h2>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "60%", padding: "8px", fontSize: "16px" }}
          />
        </div>

        {/* Content with ReactQuill */}
        <div style={{ marginTop: 12 }}>
          <ReactQuill theme="snow" value={content} onChange={setContent} />
        </div>

        {/* Upload Image */}
        <div style={{ marginTop: 12 }}>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {image && (
            <img
              src={image}
              alt="Blog Preview"
              style={{ width: 200, display: "block", marginTop: 8 }}
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            marginTop: 12,
            background: id ? "orange" : "green",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {id ? "Update Blog" : "🚀 Publish"}
        </button>
      </form>
    </div>
  );
}
