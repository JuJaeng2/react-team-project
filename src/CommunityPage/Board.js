import React, { useState } from "react";

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handlePostSubmit = () => {
    // 신규 게시글 추가
    setPosts([...posts, newPost]);
    setNewPost({ title: "", content: "" });
  };

  return (
    <div>
      <h1>게시판</h1>

      {/* 새로운 게시글 작성 폼 */}
      <form>
        <label>
          제목:
          <input
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          내용:
          <textarea
            name="content"
            value={newPost.content}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="button" onClick={handlePostSubmit}>
          게시글 작성
        </button>
      </form>

      {/* 게시글 목록 출력 */}
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <strong>{post.title}</strong>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Board;
