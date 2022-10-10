import React, { useEffect, useState } from 'react';
import Header from './Header';
import AppRouter from './Router';
import { authService } from '../fbase';

const auth = authService.getAuth();

function App() {
  const [userObj, setUserObj] = useState(auth.currentUser);
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserObj(user);
    });
  }, []);

  return (
    <div>
      <Header></Header>
      <AppRouter userObj={userObj}></AppRouter>
    </div>
  );
}

export default App;
