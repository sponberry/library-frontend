import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from "./components/Notify"
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    })
  }

  const logout = () => {    
    setToken(null)    
    localStorage.clear()    
    client.resetStore()  
  }

  return (
    <div>
      <div style={{ "marginBottom" : 10 }}>
        <button style={{ marginRight: 2 }} onClick={() => setPage('authors')}>authors</button>
        <button style={{ marginRight: 2 }} onClick={() => setPage('books')}>books</button>
        {token
          ? <button style={{ marginRight: 2 }} onClick={() => setPage('add')}>add book</button>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'} 
        setError={notify} 
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
        setPage={setPage}
      />

      <LoginForm 
        setToken={setToken}
        setError={notify}
        show={page === 'login'}
        setPage={setPage}
        />

      {!token
        ? null
        : <button
          style={{ marginTop: 10, backgroundColor: "#ea9393", padding: 5, border: "solid 1px black" }}
          onClick={() => logout()}
        >
          logout
        </button>
      }

    </div>
  )
}

export default App