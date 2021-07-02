import React from "react"

const BookRow = ({book, genreFilter}) => {

  // if (genreFilter === "all genres") {
  //   return (
  //     <tr key={book.id}>
  //       <td>{book.title}</td>
  //       <td>{book.author.name}</td>
  //       <td>{book.published}</td>
  //     </tr>
  //   )
  // }

  // if (book.genres.includes(genreFilter)) {
    return (
      <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author.name}</td>
            <td>{book.published}</td>
          </tr>
    )
  // }
  
  // return null
}

export default BookRow