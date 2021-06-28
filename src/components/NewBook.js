import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'
import ValidationNotice from './ValidationNotice'


const NewBook = ({ show, setError }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [validation, setValidation] = useState(null)

  const [ createBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    // onError: (error) => {      
    //   setError(error.graphQLErrors[0].message)    
    // }
  })

  if (!show) {
    return null
  }

  const checkFields = (e) => {
    e.preventDefault()
    if (!title || !author || !published) {
      setValidation("field required")
      setTimeout(() => {
        setValidation(null)
      }, 5000)
      return
    }
    setValidation(null)
    submit()
  }
  
  const submit = async () => {
    const publishedYear = Number(published)
    createBook({ variables: {
      title, author, published: publishedYear, genres
    }})
    console.log(`adding book ${title}`)

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={checkFields}>
        <div style={{ marginBottom: 5 }}>
          title{" "}
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <ValidationNotice message={validation} />
        </div>
        <div style={{ marginBottom: 5 }}>
          author{" "}
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <ValidationNotice message={validation} />
        </div>
        <div style={{ marginBottom: 5 }}>
          published{" "}
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
          <ValidationNotice message={validation} />
        </div>
        <div style={{ marginBottom: 5 }}>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          {" "}
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' | ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook