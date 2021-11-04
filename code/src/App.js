import React, { useState, useEffect } from 'react'
import moment from 'moment'

import { API_URL } from 'utils/urls'

export const App = () => {

  const [thoughts, setThoughts] = useState([ { message: 'Hello', createdAt: '2021-11-01', hearts: 0, _id: 'abc123' } ])
  const [newThought, setNewThought] = useState('')

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setThoughts(data))
  }, [])

  const onFormSubmit = (event) => {
    event.preventDefault() //stops the submit from refreshing the page

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: newThought })
    }

    fetch(API_URL, options)
      .then(response => response.json())
      .then(data => setThoughts([data, ...thoughts]))
  }



  return (
    <div>

      <form onSubmit={onFormSubmit}>
        <label htmlFor="newThough">Type your thought</label>
        <input
          id="newThought"
          type="text"
          value={newThought}
          onChange={(event) => setNewThought(event.target.value)}
        />
        <button type="submit">Send thought!</button>
      </form>

      {thoughts.map((thought) => (
        <div key={thought._id}>
          <p>{thought.message}</p>
          <button>&hearts; {thought.hearts}</button>
          <p className="date">Created at: {moment(thought.createdAt).fromNow()}</p>
        </div>
      ))}
      
    </div>
  )
}