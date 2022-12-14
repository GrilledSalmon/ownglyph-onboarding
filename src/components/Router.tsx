import { User } from 'firebase/auth';
import { Route, Routes } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Posts from '../routes/Posts';
import SignUp from '../routes/SignUp';
import Write from '../routes/Write';

const AppRouter = ({ userObj }: { userObj: User | null }) => {
  console.log('emailVerifired :', userObj?.emailVerified);
  const emailVerified = userObj?.emailVerified;

  return (
    <>
      <Routes>
        {userObj && emailVerified ? (
          <>
            <Route path="*" element={<Home userObj={userObj}></Home>} />
            <Route path="/write" element={<Write userObj={userObj}></Write>} />
            <Route
              path="/posts"
              element={<Posts userObj={userObj} myPost={false}></Posts>}
            />
            <Route
              path="/myposts"
              element={<Posts userObj={userObj} myPost={true}></Posts>}
            />
          </>
        ) : (
          <>
            <Route path="/signup" element={<SignUp></SignUp>} />
            <Route path="*" element={<Auth></Auth>} />
          </>
        )}
      </Routes>
    </>
  );
};

export default AppRouter;
