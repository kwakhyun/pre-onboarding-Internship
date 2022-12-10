import React from "react";
import styled from "styled-components";

type ButtonProps = {
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  text?: string;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  bgColor?: string;
};

export default function Button({
  className,
  type,
  disabled,
  onClick,
  text,
  width,
  padding,
  margin,
  bgColor,
}: ButtonProps) {
  return (
    <StyledButton
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}
      width={width}
      padding={padding}
      margin={margin}
      bgColor={bgColor}
    >
      {text}
    </StyledButton>
  );
}

const StyledButton = styled.button<ButtonProps>`
  width: ${({ width }) => (width ? width : "200px")};
  height: ${({ height }) => (height ? height : "30px")};
  padding: ${({ padding }) => (padding ? padding : "0")};
  margin: ${({ margin }) => (margin ? margin : "0")};
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "#2f74c0")};
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    background-color: #ccc;
    color: #fff;
    cursor: not-allowed;
  }
`;
