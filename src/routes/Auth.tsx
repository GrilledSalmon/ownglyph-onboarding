import React, { useState } from 'react';
import { authService } from '../fbase';
import { Link } from 'react-router-dom';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = authService.getAuth();

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
      await authService.signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user && !user.emailVerified) {
        alert('이메일 인증 후 서비스 이용 가능합니다.')
        auth.signOut();
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
        <button type="submit">로그인</button>
      </form>
      <div>
        <button onClick={googleSignIn}>Google 로그인</button>
      </div>
      <Link to="/signup">회원가입</Link>
    </>
  );
};

export default Auth;
