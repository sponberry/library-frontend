import React from "react"

const ValidationNotice = ({ message }) => {
  if (!message) {
    return null
  }

  return (
    <div style={{ "color": "red" }}>
      {message}
    </div>
  )
}

export default ValidationNotice