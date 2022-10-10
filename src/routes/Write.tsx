import { User } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { dbService } from '../fbase';
import React, { useState } from 'react';

const fsInstance = dbService.getFirestore();
const collectionRef = dbService.collection(fsInstance, 'posts');

type PostType = {
  id?: string;
  content?: string;
  title?: string;
  creatorId?: string | undefined;
  userEmail?: string | undefined | null;
  createdAt?: number;
};

const Write = ({ userObj }: { userObj: User | null }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.target.name === 'title') {
      setTitle(event.target.value);
    } else {
      setContent(event.target.value);
    }
  };

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (title === '') {
      alert('제목을 작성해주세요.');
    } else {
      const post: PostType = {
        title,
        content,
        createdAt: Date.now(),
        creatorId: userObj?.uid,
        userEmail: userObj?.email,
      };

      try {
        const docRef = await dbService.addDoc(collectionRef, post);
        console.log('post결과', docRef);
        setTitle('');
        setContent('');
        alert('제출 완료!');
        // window.location.replace('/'); // 새로고침되는 것 같네;;
      } catch (err) {
        console.log(err);
        if (err instanceof Error) {
          alert(`작성 완료(${err.message})`);
        } else {
          alert('작성에 실패했습니다.');
        }
      }
    }
  };
  return (
    <>
      <h2>글쓰기</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          placeholder="제목"
          value={title}
          onChange={onChange}
        ></input>
        <div>
          <textarea
            name="content"
            placeholder="내용"
            value={content}
            onChange={onChange}
          ></textarea>
        </div>
        <button type="submit">글 작성</button>
      </form>
      <div>
        <Link to="/">홈으로</Link>
      </div>
    </>
  );
};

export { type PostType };
export default Write;
