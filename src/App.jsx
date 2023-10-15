import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };

    fetch('http://localhost:5000/users', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const newUsers = [...users, data];
        setUsers(newUsers);
        form.reset();
      })
      .catch()

  }

  return (
    <>
      <h1 className=' text-3xl font-bold text-blue-950 text-center m-4 pt-3'>Users managements system</h1>
      <h3 className=' font-semibold text-blue-800 text-center'>number of users :{users.length}</h3>

      <div className="m-4 p-4 bg-black border rounded-lg">
        <form onSubmit={handleFormSubmit} className="border p-4 space-y-4">
          <input type="text" name="name" className="w-full border p-2 rounded" placeholder="Name" />
          <input type="email" name="email" className="w-full border p-2 rounded" placeholder="Email" />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">Submit</button>
        </form>
      </div>


      <div className=' '>
        {
          users.map(user =>

            <li key={user.id}>
              <div className='flex gap-6'>
                <p>{user.id}</p>
                <h1>{user.name}</h1>
                <h1>{user.email}</h1>
              </div>
            </li>

          )
        }
      </div>
    </>
  )
}

export default App
