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

  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [isFailed, setIsFailed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/main");
    }
  }, [navigate]);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    authAPI
      .signin(email, password)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data["access_token"]);
          navigate("/main");
        }
      })
      .catch(({ response }) => {
        const responseData = response.data;

        responseData.statusCode === 401
          ? setModalContent("이메일 또는 비밀번호가 일치하지 않습니다.")
          : setModalContent(responseData.message);

        setModalTitle("로그인 실패");
        setIsFailed(true);
      });
  };
  return (
    <StyledLoginPage>
      <form onSubmit={(event) => handleLogin(event)}>
        <img src="/logo.png" alt="logo" width="300px" height="169px" />
        <Input
          id="email"
          label="EMAIL"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="이메일 입력"
          required
          margin="5px 0 0 0"
        />
        <Input
          id="password"
          label="PASSWORD"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="비밀번호 입력"
          required
          margin="5px 0 0 0"
        />
        <Button
          type="submit"
          disabled={!(emailRegExp.test(email) && password.length >= 8)}
          text="SIGN IN"
          margin="25px 0 0 0"
        />
      </form>
      <span onClick={() => navigate("/join")}>SIGN UP</span>

      {isFailed && (
        <Modal
          title={modalTitle}
          content={modalContent}
          onClose={() => setIsFailed(false)}
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
    height: 450px;
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
