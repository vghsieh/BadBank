import React, { useState, useContext} from 'react'
import UserContext from '../Components/UserContext';
import Card from '../Components/Card'
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { useAuth } from '../firebase/auth';
// import { auth } from '../firebase/firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";




export const Login = () => {
    const [show, setShow]         = useState(true);
    const [status, setStatus]     = useState('');
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const { authUser, isLoading } = useAuth();
    const ctx = useContext(UserContext);  
  

    function validateEmail(field, label){
        if(!field){
          setStatus('Error: ' + label);
          setTimeout(() => setStatus(''),3000);
          return false;
        } 
        return true;
    }

    function valRealEmail(field, label){
      const regex =  (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);
        if(regex.test(field) === false){
          setStatus('Error: ' + label);
          setTimeout(() => setStatus(''),3000);
          return false;
        } 
        return true;
    }


    function validatePassword(field, label){
        if (!field) {
          setStatus('Error: ' + label);
          setTimeout(() => setStatus(''),3000);
          return false;
        }
        return true;
    }
    
    

    function handleCreate(){
      console.log(email,password);
      if (!validateEmail(email,    'Email required'))    return;
      if (!valRealEmail(email,    'Enter a valid email'))    return;
      if (!validatePassword(password, 'Password required')) return;


const isValid = ctx.users.find(user => {
    if (user.email === email && user.password === password) {
        return user
    } 
});
if (isValid === undefined) {
    return alert("User does not exist")
}
ctx.loggedInUser = isValid.email
const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
}

// function clearForm(){
//   setEmail('');
//   setPassword('');
//   setShow(true);
// }

    return (
      <Card
        bgcolor="primary"
        header="Login"
        status={status}
        body={show ? (  
                <>

                Email address<br/>
                <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                Password<br/>
                <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                <button type="submit" className="btn btn-light" onClick={handleCreate}>Login</button>
                </>
              ):(
                <>

                </>
              )}
      />
    )
  }


