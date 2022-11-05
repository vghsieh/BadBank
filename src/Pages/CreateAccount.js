import React, { useState, useContext} from 'react'
import UserContext from '../Components/UserContext';
import Card from '../Components/Card'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { doc, setDoc } from "firebase/firestore"; 
import { database } from "../firebase/firebase";



export const CreateAccount = () => {
    const [show, setShow]         = useState(true);
    const [status, setStatus]     = useState('');
    const [name, setName]         = useState('');
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const ctx = useContext(UserContext);  
  

    
    function validateName(field, label){
        if (!field) {
          setStatus('Error: ' + label);
          setTimeout(() => setStatus(''),3000);
          return false;
        }
        return true;
    }

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
    
    function validatePwLength (field, label) {
      if (field.length < 6) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
    }
    
    // async function writeUserData(db, name, userId, balance) {
    //   await setDoc(doc(db, 'users', userId), {
    //     name: name,
    //     userId: userId,
    //     balance: balance,
    //   });
    // }

  
    async function handleCreate(){
      console.log(name,email,password);
      if (!validateName(name,     'Name required'))     return;
      if (!validateEmail(email,    'Email required'))    return;
      if (!valRealEmail(email,    'Enter a valid email'))    return;
      if (!validatePassword(password, 'Password required')) return;
      if (!validatePwLength(password, 'Password must be 6 or more characters')) return;
      // ctx.users.push({name,email,password,balance:100});
      const auth = getAuth();
      let userId = ''
createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    userId = user.uid;
    const userEmail = user.email

    await set(ref(database, 'users/' + userId),{
      name: name,
      email: userEmail,
      userId: userId,
      password: password,
      balance: 100,
    } )
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
      setShow(false);
    }    
  
    function clearForm(){
      setName('');
      setEmail('');
      setPassword('');
      setShow(true);
    }
  
    return (
      <Card
        bgcolor="primary"
        header="Create Account"
        status={status}
        body={show ? (  
                <>
                Name<br/>
                <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
                Email address<br/>
                <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                Password<br/>
                <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                <button type="submit" className="btn btn-light" onClick={handleCreate}>Create Account</button>
                </>
              ):(
                <>
                <h5>Success!</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
                </>
              )}
      />
    )
  }
