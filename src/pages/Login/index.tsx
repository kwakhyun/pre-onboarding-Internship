import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { authAPI } from "../../shared/httpRequest";
import { emailRegExp } from "../../utils/regExp";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/todo");
    }
  }, [navigate]);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailRegExp.test(email)) {
      authAPI
        .signin(email, password)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("token", response.data["access_token"]);
            navigate("/todo");
          }
        })
        .catch(({ response }) => {
          if (response.data.statusCode === 401) {
            setModal(true);
          }
        });
    } else {
      alert("이메일 형식에 맞지 않습니다");
    }
  };
  return (
    <StyledLoginPage>
      <form onSubmit={(event) => handleLogin(event)}>
        <Input
          id="email"
          label="EMAIL"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="이메일 입력"
          required
          margin="10px 0"
        />
        <Input
          id="password"
          label="PASSWORD"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="비밀번호 입력"
          required
          margin="10px 0"
        />
        <Button
          type="submit"
          disabled={!(emailRegExp.test(email) && password.length >= 8)}
          text="SIGN IN"
          margin="20px 0 0 0"
        />
      </form>
      <span onClick={() => navigate("/join")}>SIGN UP</span>
      {modal && (
        <Modal
          title="로그인 실패"
          content="이메일 또는 비밀번호가 일치하지 않습니다."
          onClick={() => setModal(false)}
        />
      )}
    </StyledLoginPage>
  );
}

const StyledLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 300px;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  }

  span {
    margin-top: 15px;
    border-bottom: 1px solid black;
    cursor: pointer;
  }
`;
