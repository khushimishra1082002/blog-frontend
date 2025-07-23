import React from 'react'

const ErrorMessages = (props) => {
  return (
    <>
      <div className=' text-orange-500 text-sm font-RobotoFlex font-medium'>
        {props.children}
      </div>
    </>
  )
}

export default ErrorMessages
