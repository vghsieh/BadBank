import React, { useState, useContext } from "react";
import UserContext from "../Components/UserContext";
import Card from "../Components/Card";
import { set, ref, onValue } from "firebase/database";
import { database } from "../firebase/firebase";

function Withdraw() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [withdraw, setWithdraw] = useState("");
  const [balance, setBalance] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const ctx = useContext(UserContext);

  const validate = amount => {
    if (!amount) {
      setStatus("Error: Please enter a value");
      return false;
    }
    if (!Number(amount)) {
      setStatus("Error: Please enter a valid number");
      return false;
    }
    if (amount < 0) {
      setStatus("Error: Cannot withdraw a negative number");
      return false;
    }
    return true;
  };

  const withdrawMoney = amount => {
    if (!validate(amount)) return;
    setBalance(Number(balance) - Number(amount));
    setShow(false);
    setStatus("");
    set(ref(database, 'users/' + ctx.loggedInUser.userId),{
      email: ctx.loggedInUser.email,
      userId: ctx.loggedInUser.userId,
      balance: Number(balance) - Number(amount),
      password: ctx.loggedInUser.password,
      name: ctx.loggedInUser.name
    } )
   return alert("Success!")
  };

  function clearForm() {
    setWithdraw("");
    setShow(true);
  }

  React.useEffect(() => {
    if (!withdraw) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [withdraw]);

  React.useEffect(() => {
    const userDataRef = ref(database, 'users/' + ctx.loggedInUser.userId);
    onValue(userDataRef, (snapshot) => {
const data = snapshot.val();
const loggedInUser = {
  email: data.email,
  userId: data.userId,
  password: data.password,
  balance: data.balance,
  name: data.name
}
ctx.loggedInUser = loggedInUser
setBalance(data.balance)
})
  }, [])


  return (
    <Card
      bgcolor="primary"
      header="Withdraw"
      status={status}
      body={
        show ? (
          <>
            <h5>Balance: ${balance}</h5>
            <br/>
            Withdraw
            <br/>
            <input
              type="deposit"
              className="form-control"
              id="deposit"
              placeholder="Amount"
              value={withdraw}
              onChange={(e) => setWithdraw(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={() => withdrawMoney(withdraw)}
              disabled={disabled}>Withdraw</button>
          </>
        ) : (
          <>
            <h5>Success</h5>
            <button type="submit" 
            className="btn btn-light" 
            onClick={clearForm}>
              Make another withdrawal?</button>
          </>
        )
      }
    />
  );
}

export default Withdraw;

