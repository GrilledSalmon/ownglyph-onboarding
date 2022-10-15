import React, { useEffect, useState } from 'react';
import Header from './Header';
import AppRouter from './Router';
import { authService } from '../fbase';
import style from '../scss/app.module.scss';

const auth = authService.getAuth();

function App() {
  const [userObj, setUserObj] = useState(auth.currentUser);
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserObj(user);
    });
  }, []);

  return (
    <div id={style['entire-wrap']}>
      <Header></Header>
      <AppRouter userObj={userObj}></AppRouter>
    </div>
  );
}

export default App;
