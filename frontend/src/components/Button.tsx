import React from 'react';
import { CSS, styled } from '@stitches/react';

const StyledButton = styled('button', {
  marginTop: "1rem",
  border: "2px solid black",
  borderRadius: "0.5rem",
  padding: "0.5rem 1rem",
  backgroundColor: "#f6bc00",
  fontSize: "1.5rem",
});

type ButtonProps = {
  text: string,
  onClick?: () => void,
  disabled?: boolean,
  style?: CSS,
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled,
  style
}) => {
  return (
    <StyledButton
      css={style}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </StyledButton>
  );
};

export default Button;
