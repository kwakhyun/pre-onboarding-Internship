import React, { ChangeEvent, forwardRef, memo, Ref } from "react";
import styled from "styled-components";

type InputProps = {
  className?: string;
  id?: string;
  label?: string;
  name?: string;
  type?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
};

export default memo(
  forwardRef(function Input(
    {
      className,
      id,
      label,
      name,
      type,
      value,
      onChange,
      placeholder,
      width,
      height,
      padding,
      margin,
    }: InputProps,
    ref: Ref<HTMLInputElement>
  ) {
    return (
      <StyledInput
        label={label}
        width={width}
        height={height}
        padding={padding}
        margin={margin}
      >
        <div className={className}>
          {label && <label htmlFor={id}>{label}</label>}
          <input
            ref={ref}
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        </div>
      </StyledInput>
    );
  })
);

const StyledInput = styled.div<InputProps>`
  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-bottom: ${({ label }) => (label ? "20px" : "0")};
    label {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 5px;
    }
    input {
      width: ${({ width }) => (width ? width : "200px")};
      height: ${({ height }) => (height ? height : "30px")};
      padding: ${({ padding }) => (padding ? padding : "0 10px")};
      margin: ${({ margin }) => (margin ? margin : "0")};
      border: none;
      border-radius: 5px;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    }
  }
`;
