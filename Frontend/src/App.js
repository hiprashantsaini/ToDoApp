import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import React, { useContext, useState } from 'react';
import './app.css';
import appContext from './appContext';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [todo, setToDo] = useState('');
  const [editToDo, setEditToDo] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [editToDoId, setEditToDoId] = useState('');


  const { userData, setUserData } = useContext(appContext);
  const [loginForm, setLoginForm] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch('http://localhost:8080/api/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      })
      const res = await data.json();
      if (!res.status) {
        return alert(`${res.message}`);
      }
      alert(`${res.message}`);
      setUserData(res.info);
    } catch (error) {
      alert(error.message);
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch('http://localhost:8080/api/signup', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      })
      const res = await data.json();
      if (!res.status) {
        return alert(`${res.message}`);
      }
      setUserData(res.info);
      alert(`${res.message}`);
    } catch (error) {
      alert(error.message);
    }
  }


  const addToDo = async () => {
    try {
      const data = await fetch('http://localhost:8080/api/addtodo', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userData?.email, todo })
      })
      const res = await data.json();
      if (!res.status) {
        return alert(`${res.message}`);
      }
      setUserData(res.info);
      setToDo('');
      alert(`${res.message}`);
    } catch (error) {
      alert(error.message);
    }
  }


  const updateToDo = async (todoId) => {
    try {
      const data = await fetch('http://localhost:8080/api/updatetodo', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userData?.email, todo:editToDo,todoId })
      })
      const res = await data.json();
      if (!res.status) {
        return alert(`${res.message}`);
      }
      setUserData(res.info);
      setEditToDo('');
      setEditToDoId('');
      setShowEdit(false);
      alert(`${res.message}`);
    } catch (error) {
      alert(error.message);
    }
  }

  const handleDone = async (todoId) => {
    try {
      const data = await fetch('http://localhost:8080/api/donetask', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userData?.email, todoId })
      })
      const res = await data.json();
      if (!res.status) {
        return alert(`${res.message}`);
      }
      setUserData(res.info);
      alert(`${res.message}`);
    } catch (error) {
      alert(error.message);
    }
  }

  const deleteToDo = async (todoId) => {
    try {
      const data = await fetch('http://localhost:8080/api/deletetodo', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userData?.email, todoId })
      })
      const res = await data.json();
      if (!res.status) {
        return alert(`${res.message}`);
      }
      setUserData(res.info);
      alert(`${res.message}`);
    } catch (error) {
      alert(error.message);
    }
  }


  return (
    <>
      <div className='header'>
        <h2>Your Personal Task Manager</h2>
        <h3 style={{ color: "orange",textAlign:"center" }}>Stay on top of your goals and make every day count.</h3>
      </div>
      <div className='todoContainer'>
        <div className='addtodo-section'>
          <input value={todo} type='text' onChange={(e) => setToDo(e.target.value)} placeholder='Write Your To Do' />
          {
            userData ? <button onClick={addToDo}>ADD</button>
              :
              <button onClick={() => { alert("Please login.") }}>ADD</button>
          }

        </div>

        {/* signup form  */}
        {
          !userData ? loginForm ?
            // login form 
            <div className='login-user'>
              <h4>Login User</h4>
              <form onSubmit={handleLogin}>
                <input type='email' value={email} placeholder='Your email' onChange={(e) => setEmail(e.target.value)} required />
                <input type='password' value={password} placeholder='Your password' onChange={(e) => setPassword(e.target.value)} required />
                <button type='submit'>Login</button>
              </form>
              <p>Don't have an account ? <button onClick={() => setLoginForm(false)}>Signup</button></p>
            </div>
            :
            // signup form 
            <div className='login-user'>
              <h4>Signup User</h4>
              <form onSubmit={handleSignUp}>
                <input type='text' value={name} placeholder='Your name' onChange={(e) => setName(e.target.value)} />
                <input type='email' value={email} placeholder='Your email' onChange={(e) => setEmail(e.target.value)} required />
                <input type='password' value={password} placeholder='Your password' onChange={(e) => setPassword(e.target.value)} required />
                <button type='submit'>Signup</button>
              </form>
              <p>Already have an account ? <button onClick={() => setLoginForm(true)}>Login</button></p>
            </div>

            : ''


        }



        <div className='todoes-section'>
          {
            userData ? <>
              <h4 style={{ textAlign: "center", textDecorationLine: "underline", margin: "10px" }}>Hello {userData.name}! List of your all Tasks.</h4>

              {
                userData?.todoes?.map((todo) => {
                  return (
                    !todo.done ?

                      <div className='todo' key={todo._id}>
                        {
                          !showEdit || editToDoId !=todo._id ?
                            <>
                              <div className='todo-text' onClick={() => {
                                handleDone(todo._id);
                              }}><RadioButtonUncheckedIcon style={{ width: "15px" }} /><p>{todo.content}</p></div>
                              <div className='icons'><EditIcon onClick={() => {
                                setEditToDo(todo.content);
                                setEditToDoId(todo._id);
                                setShowEdit(true);
                              }} style={{ width: "20px", cursor: "pointer" }} /><DeleteIcon onClick={() => deleteToDo(todo._id)} style={{ width: "20px", cursor: "pointer" }} /></div>
                            </>
                            :
                            <div className='addtodo-section'>
                              <input type='text' value={editToDo} onChange={(e) => setEditToDo(e.target.value)} />
                              <button onClick={() => { setShowEdit(false) }}>Cancel</button>

                              <button onClick={() => updateToDo(todo._id)}>Update</button>
                            </div>
                        }

                      </div>

                      :

                      <div className='todo' key={todo._id}>
                        {
                          !showEdit || editToDoId !=todo._id ?
                            <>
                              <div className='todo-text'><RadioButtonCheckedIcon style={{ width: "15px", color: "blue" }} /><p>{todo.content}</p></div>
                              <div className='icons'><EditIcon onClick={() => {
                                setEditToDo(todo.content);
                                setEditToDoId(todo._id);
                                setShowEdit(true);
                              }} style={{ width: "20px", cursor: "pointer" }} /><DeleteIcon onClick={() => deleteToDo(todo._id)} style={{ width: "20px", cursor: "pointer" }} /></div>
                            </>
                            :
                            <div className='addtodo-section'>
                              <input type='text' value={editToDo} onChange={(e) => setEditToDo(e.target.value)} />
                              <button onClick={() => { setShowEdit(false) }}>Cancel</button>

                              <button onClick={() => updateToDo(todo._id)}>Update</button>


                            </div>
                        }


                      </div>

                  )
                })
              }
            </>
              : ''
          }

        </div>
      </div>
      <div className='footer'>
        <p>&copy; 2024 My To-Do App. All rights reserved.</p>
      </div>
    </>
  )
}

export default App;