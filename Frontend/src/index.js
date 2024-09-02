import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import appContext from './appContext';
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
const UserContextData=()=>{
  const [userData,setUserData]=useState(null);
  return(
     <appContext.Provider value={{userData,setUserData}}>
         <App />
     </appContext.Provider>
  )
}
root.render(
  <React.StrictMode>
      <UserContextData/>
  </React.StrictMode>
);