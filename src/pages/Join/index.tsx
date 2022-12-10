import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { authAPI } from "../../shared/httpRequest";
import { emailRegExp } from "../../utils/regExp";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";

export default function JoinPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const handleJoin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword && messageRef.current) {
      confirmPasswordRef.current?.focus();
      messageRef.current.style.display = "block";
    } else {
      authAPI
        .signup(email, password)
        .then((response) => {
          if (response.status === 201) {
            setModalTitle("회원가입 성공");
            setModalContent("회원가입이 완료되었습니다.");
            setIsSuccess(true);
          }
        })
        .catch(({ response }) => {
          setModalTitle("회원가입 실패");
          setModalContent(response.data.message);
          setIsFailed(true);
        });
    }
  };

  return (
    <StyledJoinPage>
      <form onSubmit={(e) => handleJoin(e)}>
        <Input
          id="email"
          label="EMAIL"
          type="text"
          value={email}
          ref={emailRef}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 입력"
          required
          margin="10px 0"
        />
        <Input
          id="password"
          label="PASSWORD"
          type="password"
          value={password}
          ref={passwordRef}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 입력"
          required
          margin="10px 0"
        />
        <Input
          className="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
          placeholder="비밀번호 확인"
          ref={confirmPasswordRef}
          required
          margin="0 0 10px 0"
        />
        <div className="error-message" ref={messageRef}>
          비밀번호가 일치하지 않습니다.
        </div>
        <Button
          type="submit"
          disabled={!(emailRegExp.test(email) && password.length >= 8)}
          text="SIGN UP"
          margin="20px 0 0 0"
        />
      </form>
      <span onClick={() => navigate("/")}>SIGN IN</span>

      {isSuccess && (
        <Modal
          title={modalTitle}
          content={modalContent}
          onClose={() => navigate("/")}
        />
      )}
      {isFailed && (
        <Modal
          title={modalTitle}
          content={modalContent}
          onClose={() => setIsFailed(false)}
        />
      )}
    </StyledJoinPage>
  );
}

const StyledJoinPage = styled.div`
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
    height: 350px;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  }

  span {
    margin-top: 10px;
    border-bottom: 1px solid black;
    cursor: pointer;
  }

  .error-message {
    display: none;
    color: red;
  }
`;
