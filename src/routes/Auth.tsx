import React, { useState } from 'react';
import { authService } from '../fbase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const auth = authService.getAuth();

  const toggleSignUp = () => {
    setIsSignUp((prev) => !prev);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'id') {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };
  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      if (isSignUp) {
        await authService.createUserWithEmailAndPassword(auth, email, password);
      } else {
        await authService.signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        alert(`에러발생!(${err.message})`);
      } else {
        console.log(err);
      }
    }
  };

  const googleSignIn = async () => {
    const googleProvider = new authService.GoogleAuthProvider();
    const googleSignInData = await authService.signInWithPopup(
      auth,
      googleProvider,
    );
    console.log('google log in data :', googleSignInData);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="id"
          placeholder="ID"
          value={email}
          onChange={onChange}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
        ></input>
        {isSignUp ? (
          <button type="submit">가입</button>
        ) : (
          <button type="submit">로그인</button>
        )}
      </form>
      <div>
        <button onClick={googleSignIn}>Google 로그인</button>
      </div>
      <span onClick={toggleSignUp} style={{ color: 'blue', cursor: 'pointer' }}>
        {isSignUp ? 'Sign In' : 'Sign Up'}
      </span>
    </>
  );
};

export default Auth;
