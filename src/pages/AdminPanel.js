import React, { useEffect, useState } from 'react';
import API from '../services/api';

export default function AdminPanel(){
  const [users, setUsers] = useState([]);

  useEffect(()=>{ fetchUsers(); },[]);

  const fetchUsers = async () => {
    try {
      const res = await API.get('/api/auth/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding:20 }}>
      <h2>Admin Panel</h2>
      <p>Note: To enable admin routes, backend must expose user list route. This stub demonstrates the UI.</p>
      <ul>
        {users.map(u=> <li key={u._id}>{u.name} ({u.email}) - {u.role}</li>)}
      </ul>
    </div>
  );
}
