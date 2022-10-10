import { User } from 'firebase/auth';
import { authService } from '../fbase';
import { Link } from 'react-router-dom';

const auth = authService.getAuth();

const Home = ({ userObj }: { userObj: User | null }) => {
  const userEmail = userObj?.email;

  const onSignOut = () => {
    authService.signOut(auth);
  };

  return (
    <>
      <h1>Home</h1>
      <h3>{userEmail}님, 어서오세요!</h3>
      <button onClick={onSignOut}>로그아웃</button>
      <div>
        <Link to="/write">글쓰기</Link>
      </div>
      <div>
        <Link to="/posts">게시판 보기</Link>
      </div>
    </>
  );
};

export default Home;
