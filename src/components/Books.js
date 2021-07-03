import { useLazyQuery, useQuery } from '@apollo/client'
import React, {useEffect, useState} from 'react'
import { BOOKS_BY_GENRE, ALL_BOOKS } from '../queries'
import BookRow from "./BookRow"

const Books = (props) => {
  const allBooks = useQuery(ALL_BOOKS)
  const [genreFilter, setGenreFilter] = useState("all genres")
  const [getBooks, bookResult] = useLazyQuery(BOOKS_BY_GENRE, {
    fetchPolicy: "cache-and-network"
  })
  const [books, setBooks] = useState(null)

  // triggers on allBooks query data change and filter change
  useEffect(() => {
    if (allBooks.data && genreFilter === "all genres") {
      setBooks(allBooks.data.allBooks)
    }
  }, [allBooks.data, genreFilter]) // eslint-disable-line

  // triggers on booksByGenre data change
  useEffect(() => {
    if (bookResult.data) {
      setBooks(bookResult.data.allBooks)
    }
  }, [bookResult])

  // triggers on genreFilter data change
  useEffect(() => {
    if (genreFilter !== "all genres") {
      getBooks({
        variables: { genre: genreFilter }
      })
      if (bookResult.called) {
        bookResult.refetch()
      }
    }
  }, [genreFilter]) // eslint-disable-line

  if (!props.show || !books) {
    return null
  }

  const allGenres = []
  allBooks.data.allBooks.forEach(book => { book.genres.map(genre => allGenres.push(genre)) });
  const uniqueGenres = [...new Set(allGenres)]

  return (
    <div>
      <h2>books</h2>

      <p>filter by genre:</p>
      <select id="name" value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
            <option value="all genres">all genres</option>            
            {uniqueGenres.map(genre => (
              <option value={genre} key={genre}>{genre}</option>
            ))}
          </select>
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
            <BookRow book={b} genreFilter={genreFilter} key={b.id} />
          )}
          
        </tbody>
      </table>
    </div>
  )
}

export default Books