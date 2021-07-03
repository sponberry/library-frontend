import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ADD_BOOK } from '../queries'
import ValidationNotice from './ValidationNotice'


const NewBook = ({ show, setError, setPage, updateCacheWith }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [validation, setValidation] = useState(null)

  const [ createBook ] = useMutation(ADD_BOOK, {
    onError: (error) => {      
      setError(error.graphQLErrors[0].message)    
    },
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    }
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

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
    setPage("books")
    setError("added successfully")
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