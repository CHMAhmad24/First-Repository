import React from 'react'
import { useState, useRef } from 'react'

export default function About() {
  const [input, setInput] = useState('');
  handleAdd = () => {
    setInput('');
  };
    return (
      <>
        <input
          type="text"
          value={input}
          placeholder="Enter a task"
          onChange={(e) => setInput(e.target.value)}
          
        />
        <button onClick={handleAdd}>Add</button>
      </>
    )
  }
