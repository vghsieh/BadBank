import React from 'react'
import UserContext from '../Components/UserContext'

export const AllData = () => {
  const ctx = React.useContext(UserContext);
  

  return (
    <>
      <h2>All Data</h2>
      {JSON.stringify(ctx.users)}
      cts

    </>
  )
}
