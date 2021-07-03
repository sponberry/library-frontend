import React from "react"

const Notify = ({errorMessage}) => {  
  if ( !errorMessage ) {    
    return null  
  }  

  if (errorMessage === "added successfully") {
    return (
      <div style={{color: 'green'}}>    
      {errorMessage}    
    </div>  
    )
  }
  return (    
    <div style={{color: 'red'}}>    
      {errorMessage}    
    </div>  
  )
}

export default Notify