import React, { useEffect, useState } from 'react';
import { authService, dbService } from '../fbase';
import { Link } from 'react-router-dom';
import style from '../scss/signup.module.scss';

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
    <div className={style['signup']}>
      <div className={style['container']}>
        <div className={style['box']}>
          <div id={style['signup-title']}>회원가입</div>
        </div>
        <div className={style['box']}>
          <div id={style['signup-process']}>
            <div className={style['process-1']}>1.정보입력</div>
            <div className={style['process-2']}>2.이메일 인증</div>
          </div>
        </div>
        <div className={style['box']}>
          <div id={style['signup-content']}>
            <form onSubmit={onSubmit}>
              <div className={style['content-box']}>
                <div className={style['box-title']}>이름</div>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                ></input>
              </div>
              <div className={style['content-box']}>
                <div className={style['box-title']}>아이디(이메일)</div>
                <input
                  type="email"
                  name="id"
                  placeholder="example@example.com"
                  value={email}
                  onChange={onChange}
                ></input>
              </div>
              <div className={style['content-box']}>
                <div className={style['box-title']}>비밀번호</div>
                <input
                  type="password"
                  name="password"
                  placeholder="영문, 숫자를 포함한 8자 이상의 비밀번호"
                  value={password}
                  onChange={onChange}
                ></input>
              </div>
              <div className={style['content-box']}>
                <div className={style['box-title']}>비밀번호 확인</div>
                <input
                  type="password"
                  name="passwordCheck"
                  value={passwordCheck}
                  onChange={onChange}
                ></input>
              </div>
              {!isPasswordSame && (
                <div className={style['caution']}>
                  * 비밀번호가 일치하지 않습니다.
                </div>
              )}

              <div className={style['content-box']}>
                <div className={style['signup-terms']}>
                  <div className={style['agree-entire']}>
                    <i className={style['check-image']}></i>
                    약관 전체 동의
                  </div>
                  <ul>
                    <li>
                      <i className={style['check-image']}></i>
                      <label htmlFor="term-check-age">
                        (필수) 만 14세 이상입니다.
                      </label>
                      <input type="checkbox" id="term-check-age" />
                    </li>
                    <li>
                      <i className={style['check-image']}></i>
                      <label htmlFor="term-check-service">
                        (필수) 온글잎 서비스 약관에 동의합니다.
                      </label>
                      <input type="checkbox" id="term-check-service" />
                    </li>
                    <li>
                      <i className={style['check-image']}></i>
                      <label htmlFor="term-check-indi">
                        (필수) 개인정보 처리 방침에 동의합니다.
                      </label>
                      <input type="checkbox" id="term-check-indi" />
                    </li>
                    <li>
                      <i className={style['check-image']}></i>
                      <label htmlFor="term-check-promotion">
                        (선택) 온글잎 프로모션 정보 수신에 동의합니다.
                      </label>
                      <input type="checkbox" id="term-check-promotion" />
                    </li>
                  </ul>
                </div>
              </div>

              <button type="submit">다음</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
