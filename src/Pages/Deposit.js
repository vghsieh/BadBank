import React, { useState, useContext } from 'react';
import UserContext from '../Components/UserContext';
import Card from '../Components/Card'

function Deposit(){
    const [show, setShow]         = useState(true);
    const [status, setStatus]     = useState('');
    const [deposit, setDeposit]   = useState('');
    const [balance, setBalance]   = useState(100);
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
    }
  
    const depositMoney = amount => {
      if (!validate(amount)) return;
      setBalance(Number(balance) + Number(amount));
      setShow(false);
      setStatus('');
      ctx.users.push(Number(amount) + Number(balance));
    }
  
  
    function clearForm(){
      setDeposit('');
      setShow(true);
    }
  
    React.useEffect(() => {
          if (!deposit) {
              setDisabled(true);
          }
          else {
              setDisabled(false);
          }
      }, [deposit]);
  
    return (
      <Card
        bgcolor="primary"
        header="Deposit"
        status={status}
        body={show ? (  
                <>
                <h5>Balance: ${balance}</h5>
                <br/>
                Deposit<br/>
                <input type="deposit" className="form-control" id="deposit" placeholder="Amount" value={deposit} onChange={e => setDeposit(e.currentTarget.value)}/><br/>
                <button type="submit" className="btn btn-light" onClick={() => depositMoney(deposit)} disabled={disabled}>Deposit</button>
                </>
              ):(
                <>
                <h5>Success</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Make another deposit?</button>
                </>
              )}
      />
    )
  }

  export default Deposit;