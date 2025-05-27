import React, { useEffect, useState } from 'react';
import '../Styles/Contact.css';
import axios from 'axios';

function Contact() {
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({ email: '', phone: '', name: '' });

  useEffect(() => {
    axios.get("http://localhost:8000/api/users")
      .then(res => setUsers(res.data.users))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/users/${id}`)
      .then(() => setUsers(users.filter(user => user._id !== id)))
      .catch(err => console.log(err));
  };

  const startEdit = (user) => {
    setEditId(user._id);
    setForm({ name: user.name, email: user.email, phone: user.phone});
    setErrors({ email: '', phone: '', name: '' }) // Reset errors when starting to edit
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  };

  const validate = () => {
    let valid = true
    const newErrors = { email: '', phone: '' }

    // Email validation
    if (!form.email.includes('@') || !form.email.includes('.') || form.email.includes(' ')) {
      newErrors.email = 'must contain at least 3 characters "@" and "." also avoid spaces example@gmail.com'
      valid = false
    }

    // Phone number validation
    if (form.phone.length < 10 || isNaN(form.phone)) {
      newErrors.phone = 'must be at least 10 digits and should not be empty'
      valid = false
    }

    if (form.name.length < 3 || isNaN(form.name)) {
      newErrors.name = 'must be at least 3 characters and should not be empty'
      valid = false
    }
    
    setErrors(newErrors)
    return valid;
  };

  const saveEdit = (id) => {
    if (!validate()) {
      return;
    } else {
      axios.put(`http://localhost:8000/api/users/${id}`, form)
        .then(() => {
          setUsers(users.map(user => user._id === id ? { ...user, ...form } : user))
          setEditId(null)
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <table className='contact_data'>
      <thead>
        <tr>
          <th>Name</th><th>Email</th><th>Phone</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user._id}>
            {editId === user._id ? (
              <>
                <td><input name="name" value={form.name} onChange={handleChange} />
                  {errors.name && <div style={{ color: 'red', fontSize: '14px', marginLeft: '10px' }}>{errors.name}</div>}
                </td>
                <td>
                  <input name="email" value={form.email} onChange={handleChange} />
                  {errors.email && <div style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>{errors.email}</div>}
                </td>
                <td>
                  <input name="phone" value={form.phone} onChange={handleChange} />
                  {errors.phone && <div style={{ color: 'red', fontSize: '14px', marginLeft: '10px' }}>{errors.phone}</div>}
                </td>
                <td>
                  <button onClick={() => saveEdit(user._id)}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </td>
              </>
            ) : (
              <>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button onClick={() => startEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Contact;
