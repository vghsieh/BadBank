import React from 'react';

import NavBar from './Components/NavBar';
import UserContext from './Components/UserContext';
import { AuthUserProvider } from './firebase/auth';


function App() {

return(
  <>
  <AuthUserProvider>
   <UserContext.Provider value = {
  {users:[],loggedInUser:""}}>
  <NavBar />;
</UserContext.Provider> 
  </AuthUserProvider>

</>
);
  
}

export default App;