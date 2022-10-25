import React from 'react';

import NavBar from './Components/NavBar';
import UserContext from './Components/UserContext';


function App() {

return(
  <>
<UserContext.Provider value = {
  {users:[{name: 'peter', email: 'peter@mit.edu', password: 'secret', balance:100}],loggedInUser:""}}>
  <NavBar />;
</UserContext.Provider>
</>
);
  
}

export default App;