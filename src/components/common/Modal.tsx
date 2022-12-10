import styled from "styled-components";

type ModalProps = {
  title: string;
  content: string;
  onClose: () => void;
};

export default function Modal({ title, content, onClose }: ModalProps) {
  return (
    <StyledModal>
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
        </div>
        <div className="modal-content">
          <p>{content}</p>
        </div>
        <div className="modal-footer">
          <button onClick={onClose}>확인</button>
        </div>
      </div>
    </StyledModal>
  );
}

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  .modal {
    width: 400px;
    height: 200px;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .modal-header {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 20px;
      margin-top: 5px;
      border-bottom: 1px solid #e5e5e5;
      .icon {
        font-size: 20px;
      }
    }
    .modal-content {
      width: 100%;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 20px;
      border-bottom: 1px solid #e5e5e5;
    }
    .modal-footer {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        width: 100px;
        height: 30px;
        border: none;
        outline: none;
        border-radius: 5px;
        cursor: pointer;
        background-color: #e5e5e5;
      }
    }
  }
`;
