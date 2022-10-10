import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { dbService } from '../fbase';
import { PostType } from './Write';

const fsInstance = dbService.getFirestore();

const OnePost = ({ post, myPost }: { post: PostType; myPost?: Boolean }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.target.name === 'title') {
      setTitle(event.target.value);
    } else {
      setContent(event.target.value);
    }
  };

  const toggleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const onEditClick = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const postDocRef = doc(fsInstance, `posts/${post.id}`);
    await updateDoc(postDocRef, { title: title, content: content });
    toggleEdit();
  };

  const onDeleteClick = async () => {
    const deleteCheck = window.confirm('정말 삭제하시겠습니까?');
    if (deleteCheck) {
      const postDocRef = doc(fsInstance, `posts/${post.id}`);
      await deleteDoc(postDocRef);
    }
  };

  return (
    <>
      {isEdit ? (
        <>
          <form onSubmit={onEditClick}>
            <div>
              <input
                name="title"
                value={title}
                onChange={onChange}
                placeholder="title"
              ></input>
            </div>
            <div>
              <textarea
                name="content"
                value={content}
                onChange={onChange}
                placeholder="content"
              ></textarea>
            </div>
            <button type="submit">수정하기</button>
          </form>
          <button onClick={toggleEdit}>취소</button>
        </>
      ) : (
        <>
          <ul>
            {post.userEmail && <li>작성자 : {post.userEmail}</li>}
            <li>제목 : {post.title}</li>
            <li>내용 : {post.content}</li>
          </ul>
          {myPost && (
            <>
              <button onClick={toggleEdit}>수정</button>
              <button onClick={onDeleteClick}>삭제</button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default OnePost;
