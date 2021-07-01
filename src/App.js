import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from "./components/Notify"
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import { useApolloClient, useLazyQuery } from '@apollo/client'
import { CURRENT_USER } from "./queries"

const App = () => {
  const [getUser, result] = useLazyQuery(CURRENT_USER)
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const onLogin = () => {
    console.log("result: ", result)
    console.log("login logout function before getUser: ", result.data)
    if (!result.called) {
      getUser()
      return
    }
    setTimeout(() => {
      result.refetch()
    }, 1000)
  }

  useEffect(() => {
    console.log("data sent to setUser: ", result.data)
    if (result.data) {
      setUser(result.data.me)
    }
  }, [result])

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
    setPage("authors")
  }

  // find way to get rid of old user token or retain login
  // mluukkai not working?
  // useEffect(() => {
  //   logout()
  // }, []) // eslint-disable-line

  return (
    <div>
      <div style={{ "marginBottom" : 10 }}>
        <button style={{ marginRight: 2 }} onClick={() => setPage('authors')}>authors</button>
        <button style={{ marginRight: 2 }} onClick={() => setPage('books')}>books</button>
        {token
          ? <span>
              <button style={{ marginRight: 2 }} onClick={() => setPage('add')}>add book</button>
              <button style={{ marginRight: 2 }} onClick={() => setPage('recommended')}>recommended</button>
            </span>
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
        setAppUser={onLogin}
        />
      
      <Recommended
        show={page === "recommended"}
        token={token}
        user={user}
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
      {/* <button onClick={() => console.log(result)}>result</button>
      <button onClick={() => result.refetch()}>Refetch!</button> */}
    </div>
  )
}

export default App