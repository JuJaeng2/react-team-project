import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const hardcodedUsername = "exampleUser";
    const hardcodedPassword = "examplePassword";

    if (username === hardcodedUsername && password === hardcodedPassword) {
      console.log("로그인 성공");
    } else {
      setError("유효하지 않은 사용자명 또는 비밀번호");
    }
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
          </ul>
        </div>
      </nav>

      <div>
        <h2>로그인</h2>
        <div>
          <label htmlFor="username">사용자명:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>로그인</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
