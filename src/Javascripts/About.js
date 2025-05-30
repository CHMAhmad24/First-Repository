import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/table.css'
import axios from 'axios';

function About() {
  const [data, setData] = useState(
    {
      name: '',
      email: '',
      phone: null,
    }
  );
  const nav = useNavigate();

  const handleSubmit = async () => {
    axios
      .post("http://localhost:8000/api/users", data)
      .then((res) => {
        console.log(res.data, 'res')
        setData({
          name: '',
          email: '',
          phone: null,
        });
        nav('/');
      })

      .catch((err) => {
        console.log(err, 'err')
      })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev, [e.target.name]: e.target.value,
    }));
  }

  return (
    <table className='About_data'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr colSpan={3} >
          <td colSpan={1} >
            <input
              name='name'
              type="text"
              value={data.name}
              placeholder="Enter Your Name"
              onChange={handleChange}
            />
          </td>
          <td colSpan={1} >
            <input
              name='email'
              type="text"
              value={data.email}
              placeholder="Enter Your Email"
              onChange={handleChange}
            />
          </td>
          <td colSpan={1} >
            <input
              name='phone'
              type="text"
              value={data.phone}
              placeholder="Enter Phone Number"
              onChange={handleChange}
            />
          </td>
          <td>
            <button onClick={handleSubmit}>Add</button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default About