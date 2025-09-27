import React from 'react';
import { Link } from 'react-router-dom';

export default function BlogCard({ blog }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: 12, marginBottom: 12, borderRadius: 8, background: '#fff' }}>
      <h3><Link to={`/blog/${blog._id}`}>{blog.title || 'Untitled'}</Link></h3>
      {blog.image && <img src={blog.image} alt={blog.title} style={{ width: '100%', maxHeight: 200, objectFit:'cover', borderRadius:8 }} />}
      <p>{(blog.content && (blog.content.replace(/<[^>]+>/g, '').substring(0,150))) || 'No content available'}...</p>
      <small>By {blog.author?.name || 'Unknown'} • {new Date(blog.createdAt).toLocaleString()}</small>
    </div>
  );
}
