import React from 'react'
import UserContext from '../Components/UserContext';
import { ref, onValue } from "firebase/database";
import { database } from "../firebase/firebase";


export const AllData = () => {
  const ctx = React.useContext(UserContext);
  const [ allData, setAllData ] = React.useState([])
  
  React.useEffect(() => {
    const userDataRef = ref(database, 'users');
    onValue(userDataRef, (snapshot) => {
      const data = snapshot.val();
const allUsers = []
      for  (const user in data) {
        const userData = {
           name: data[user].name,
           email: data[user].email,
       password: data[user].password,
       balance: data[user].balance
        }
        allUsers.push(userData)
     }
     setAllData(allUsers)
    })
  }, [])

  React.useEffect(() => {
ctx.users = allData
  },[allData])

  return (
    <>
      <h2>All Data</h2>
      {JSON.stringify(allData)}
    </>
  )
}

