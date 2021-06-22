import React, { useState, useEffect } from "react"
import ValidationNotice from "./ValidationNotice"
import { useMutation } from "@apollo/client"
import { UPDATE_AUTHOR, ALL_AUTHORS } from "../queries"

const SetBirthyear = ({ setError }) => {
  const [name, setName] = useState("")
  const [born, setBorn] = useState("")
  const [validation, setValidation] = useState(null)

  const [ changeAuthor, result ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS} ]
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError("author not found")
    }
  }, [result.data]) // eslint-disable-line

  const checkFields = (e) => {
    e.preventDefault()
    if (!name || !born) {
      setValidation("field required")
      setTimeout(() => {
        setValidation(null)
      }, 5000)
      return
    }
    setValidation(null)
    submit()
  }

  const submit = () => {
    const birthYear = Number(born)
    changeAuthor({ variables: { name, born: birthYear }})
    setName("")
    setBorn("")
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={(e) => checkFields(e)}>
        <div>
          <label for="name">name: </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <ValidationNotice message={validation} />
        </div>
        <div>
          <label for="born">birth year: </label>
          <input
            id="born"
            value={born}
            onChange={(e) => setBorn(e.target.value)}
          />
          <ValidationNotice message={validation} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetBirthyear