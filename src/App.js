import React from 'react';

import NavBar from './Components/NavBar';
import UserContext from './Components/UserContext';
import { AuthUserProvider } from './firebase/auth';


function App() {

return(
  <>
  <AuthUserProvider>
   <UserContext.Provider value = {
  {users:[{name: 'peter', email: 'peter@mit.edu', password: 'secret', balance:100}],loggedInUser:""}}>
  <NavBar />;
</UserContext.Provider> 
  </AuthUserProvider>

</>
);
  
}

export default App;