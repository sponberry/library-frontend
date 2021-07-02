import React, { useEffect, useState } from "react"
import { useLazyQuery } from "@apollo/client"
import { BOOKS_BY_GENRE } from "../queries"
import BookRow from "./BookRow"

const Recommended = ({ show, token, user }) => {
  
  const [getBooks, result] = useLazyQuery(BOOKS_BY_GENRE)
  const [books, setBooks] = useState(null)

  useEffect(() => {
    if (result.data) {
      console.log(result.data)
      setBooks(result.data.allBooks)
    }
  }, [result])

  useEffect(() => {
    if (show && user !== null) {
      console.log(user)
      getBooks({ 
        variables: { genre: user.favoriteGenre}
      })
    }
  }, [show, getBooks, user])

  useEffect(() => {
    if (!token) {
      setBooks(null)
    }
  }, [token])

  if (!show || !token || !books || user === null) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre: <b>{user.favoriteGenre}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(b =>
            <BookRow book={b} key={b.id} />
          )}
          
        </tbody>
      </table>
    </div>
  )
}

export default Recommended