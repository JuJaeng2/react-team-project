import React, { Component } from 'react';
// import Input from './Input01';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '홍길동',
      password: '',
      userList: [
        { name: '홍길동', pass: '1234' },
        { name: '이몽룡', pass: '2345' },
        { name: '성춘향', pass: '4567' },
      ],
    };
    this.onChange = this.onChange.bind(this);
    this.onLoginHandler = this.onLoginHandler.bind(this);
  }

  onChange(key, value) {
    this.setState({
      [key]: value,
    });
  }

  onLoginHandler() {
    const { loginHandler } = this.props;
    const { name, password, userList } = this.state;
    userList.forEach((userInfo) => {
      if (name === userInfo.name && password === userInfo.pass) {
        loginHandler();
      }
    });
  }

  render() {
    return (
      <div>
        {/* <div>
          <Input
            label="이름"
            name="name"
            value={this.state.name}
            type="text"
            errorMessage="이름을 입력해야 합니다"
            autoFocus
            onChange={this.onChange}
          />
        </div>
        <div>
          <Input
            label="비밀번호"
            name="password"
            value={this.state.password}
            type="password"
            errorMessage="비밀번호를 입력해야 합니다"
            onChange={this.onChange}
          />
        </div> */}
        <div>
          <button onClick={this.onLoginHandler}>Login</button>
        </div>
      </div>
    );
  }
}

export default Login;
