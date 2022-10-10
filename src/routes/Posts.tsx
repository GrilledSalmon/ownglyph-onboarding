/* 게시글들 확인할 수 있는 페이지 */

import { User } from 'firebase/auth';
import { onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { dbService } from '../fbase';
import { PostType } from './Write';
import OnePost from './OnePost';
import { Link } from 'react-router-dom';

const fsInstance = dbService.getFirestore();
const collectionRef = dbService.collection(fsInstance, 'posts');
const q = query(collectionRef, orderBy('createdAt', 'desc'));

const Posts = ({
  userObj,
  myPost,
}: {
  userObj: User | null;
  myPost: Boolean;
}) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      const newPosts: PostType[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(newPosts);
    });
  }, []);
  console.log(posts);
  return (
    <>
      {myPost ? (
        <>
          <h2>내 게시글</h2>
          <Link to="/posts">게시판</Link>
          {posts.map((post) => {
            if (userObj && post && userObj.uid === post.creatorId)
              return <OnePost key={post.id} post={post} myPost={myPost}></OnePost>
            return null
          })}
        </>
      ) : (
        <>
          <h2>게시판</h2>
          <div>
            <Link to="/">홈으로</Link>
          </div>
          <div>
            <Link to="/myposts">내 게시글 보기</Link>
          </div>
          {posts.map((post) => {
            if (post) return <OnePost key={post.id} post={post}></OnePost>;
            return null
          })}
        </>
      )}
    </>
  );
};

export default Posts;
