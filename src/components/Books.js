import { useQuery } from '@apollo/client'
import React, {useState} from 'react'
import { ALL_BOOKS } from '../queries'
import BookRow from "./BookRow"

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState("all genres")
  const result = useQuery(ALL_BOOKS)

  if (!props.show || result.loading) {
    return null
  }

  const books = result.data.allBooks
  const allGenres = []
  books.forEach(book => { book.genres.map(genre => allGenres.push(genre)) });
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