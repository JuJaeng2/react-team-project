import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Board = () => {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  const handlePostSubmit = () => {
    const newPost = { id: Date.now(), text: postText };
    const updatedPosts = [...posts, newPost];
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    setPostText("");
    setPosts(updatedPosts);
  };

  return (
    <div>
      <nav>
        <div className="nav-wrapper brown lighten-2">
          <Link to="/">
            <span className="brand-logo center">멍멍 왈왈</span>
          </Link>
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li>
              <Link to="/local">보호소 찾기</Link>
            </li>
            <li>
              <Link to="/dog-page">품종별 조회</Link>
            </li>
            <li>
              <Link to="/login">로그인 / 회원가입</Link>
            </li>
            <li>
              <Link to="/Board">커뮤니티</Link>
            </li>
          </ul>
        </div>
      </nav>

      <h2>게시물 작성</h2>
      <textarea
        rows="4"
        cols="50"
        placeholder="게시글을 작성하세요..."
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
      ></textarea>
      <br />
      <button onClick={handlePostSubmit}>Post</button>
      <hr />
      <h2>나의 게시물</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Board;
