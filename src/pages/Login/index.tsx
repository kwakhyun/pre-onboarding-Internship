import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AxiosError } from "axios";

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

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await authAPI.signin(email, password);
      if (response.status === 200) {
        localStorage.setItem("token", response.data["access_token"]);
        navigate("/main");
      }
    } catch (error) {
      if ((error as AxiosError).response) {
        const responseData = (error as AxiosError).response?.data as {
          statusCode: number;
          message: string;
        };
        setModalContent(
          responseData.statusCode === 401
            ? "이메일 또는 비밀번호가 일치하지 않습니다."
            : responseData.message
        );
        setModalTitle("로그인 실패");
        setIsFailed(true);
      } else if ((error as AxiosError).request) {
        setModalTitle("로그인 실패");
        setModalContent("응답이 없습니다. 서버가 정상 작동하는지 확인하세요.");
        setIsFailed(true);
      } else {
        setModalTitle("로그인 실패");
        setModalContent("알 수 없는 오류가 발생했습니다.");
        setIsFailed(true);
      }
    }
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
