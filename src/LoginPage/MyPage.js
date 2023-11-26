import React from 'react';

const MyPage = (props) => {
  return props.userData == null ? (
    <div> Loading... </div>
  ) : (
    <div>
      <div>
        <div>
          <span> Mypage</span> <button>logout</button>
        </div>
        <hr />
        <div>
          안녕하세요. <span className="name">{props.userData.userId}</span> 님! 로그인이
          완료되었습니다.
        </div>
        <br />
        <div>나의 유저 네임: {props.userData.userId}</div>
        <div>나의 이메일 주소: {props.userData.email}</div>
      </div>
    </div>
  );
};

export default MyPage;
