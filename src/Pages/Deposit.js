import React, { useState, useContext } from 'react';
import UserContext from '../Components/UserContext';
import Card from '../Components/Card'
import { set, ref, onValue } from "firebase/database";
import { database } from "../firebase/firebase";

function Deposit(){
    const [show, setShow]         = useState(true);
    const [status, setStatus]     = useState("");
    const [deposit, setDeposit]   = useState("");
    const [balance, setBalance]   = useState(0);
    const [disabled, setDisabled] = useState(true);
    const ctx = useContext(UserContext); 

    const validate = amount => {
      if(!amount) {
        setStatus('Error: Please enter a value');
        return false;
      }
      if(!Number(amount)) {
        setStatus('Error: Please enter a valid number');
        return false;
      }
      if(amount < 0) {
        setStatus("Error: Cannot deposit a negative number");
        return false;
      }
      return true;
   ; }
  
    const depositMoney = amount => {
      if (!validate(amount)) return;
      // setBalance(Number(balance) + Number(amount));
      setShow(false);
      setStatus("");
      // const db = getDatabase();
      // const ref = db.ref('https://bad-bank-c9466-default-rtdb.firebaseio.com');
      
      // const usersRef = ref.child('users')
      // const target = usersRef.child(ctx.loggedInUser.id);
      // target.update({
      //   'balance': Number(balance) + Number(amount)
      // })
      set(ref(database, 'users/' + ctx.loggedInUser.id),{
        email: ctx.loggedInUser.email,
        userId: ctx.loggedInUser.id,
        balance: Number(balance) + Number(amount),
      } )
      // const targetUser = ctx.loggedInUser;
      // const newArray = ctx.users.map(user => {
      //   if (user.email === targetUser) {
      //     user.balance += Number(amount)
      //   }
      //   return user;
      // })
      // ctx.user = newArray;
      return alert("Success!")
    };
  
    function clearForm(){
      setDeposit("");
      setShow(true);
    }
  
    React.useEffect(() => {
      if (!deposit) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }, [deposit]);

    React.useEffect(() => {
      const userDataRef = ref(database, 'users/' + ctx.loggedInUser.id);
      onValue(userDataRef, (snapshot) => {
  const data = snapshot.val();
  setBalance(data.balance)
})
    }, [])
  
    return (
      <Card
        bgcolor="primary"
        header="Deposit"
        status={status}
        body={
          show ? (  
                <>
                <h5>Balance: ${balance}</h5>
                <br/>
                Deposit
                <br/>
                <input 
                type="deposit" 
                className="form-control" 
                id="deposit" 
                placeholder="Amount" 
                value={deposit} 
                onChange={e => setDeposit(e.currentTarget.value)}
                />

                <br/>
                <button 
                type="submit" 
                className="btn btn-light" 
                onClick={() => depositMoney(deposit)} 
                disabled={disabled}>Deposit</button>
                </>
              ) : (
                <>
                <h5>Success</h5>
                <button type="submit" 
                className="btn btn-light" 
                onClick={clearForm}>Make another deposit?</button>
                </>
              )}
      />
    )
  }


  export default Deposit;