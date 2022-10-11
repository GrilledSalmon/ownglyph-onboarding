import React, { useEffect, useState } from 'react';
import { authService, dbService } from '../fbase';
import { Link } from 'react-router-dom';

const fsInstance = dbService.getFirestore();
const userCollectionRef = dbService.collection(fsInstance, 'user');
type userType = {
  userId: string;
  name: string;
  email: string;
  verified: Boolean;
};

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isPasswordSame, setIsPasswordSame] = useState(true);

  const auth = authService.getAuth();

  useEffect(() => {
    if (password !== passwordCheck && passwordCheck.length > 0) {
      setIsPasswordSame(false);
    } else {
      setIsPasswordSame(true);
    }
  }, [password, passwordCheck]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'name') {
      setName(event.target.value);
    } else if (event.target.name === 'id') {
      setEmail(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    } else {
      setPasswordCheck(event.target.value);
    }
  };

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      await authService.createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        const userDoc: userType = {
          userId: user.uid,
          name: name,
          email: email,
          verified: false,
        };
        alert(
          '계정인증 메일을 보냈습니다. 이메일 인증 후 서비스 이용이 가능합니다.',
        );
        await dbService.addDoc(userCollectionRef, userDoc);
        await authService.sendEmailVerification(auth.currentUser);
        auth.signOut();
        window.location.replace('/');
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

  return (
    <>
      <h2>회원가입</h2>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={name}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <input
            type="email"
            name="id"
            placeholder="ID(email)"
            value={email}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={onChange}
          ></input>
        </div>
        <div>
          <input
            type="password"
            name="passwordCheck"
            placeholder="Password Check"
            value={passwordCheck}
            onChange={onChange}
          ></input>
        </div>
        {!isPasswordSame && <div>비밀번호가 다릅니다.</div>}
        <button type="submit">가입</button>
      </form>
      <div>
        <Link to="/">홈으로</Link>
      </div>
    </>
  );
};

export default SignUp;
