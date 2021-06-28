import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author {
      name
    }
    published
    id
  }
}
`

export const ADD_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]) {
  addBook (
    title: $title
    author: $author
    published: $published
    genres: $genres
  ) {
    title
    published
    genres
    id
  }
}
`

export const UPDATE_AUTHOR = gql`
mutation changeAuthor($name: String!, $born:Int!) {
  editAuthor(
    name: $name
    setBornTo: $born
  ) {
    name
    id
    born
    bookCount
  }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(
    username: $username
    password: $password
  ) {
    value
  }
}
`