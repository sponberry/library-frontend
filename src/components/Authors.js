import { useQuery } from '@apollo/client'  
import React from 'react'
import SetBirthyear from './SetBirthyear'
import { ALL_AUTHORS } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show || result.loading) {
    return null
  }
  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {props.token
        ? <SetBirthyear setError={props.setError} authors={authors} />
        : null
      }
      
    </div>
  )
}

export default Authors
