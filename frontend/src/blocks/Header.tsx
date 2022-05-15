import React from 'react';
import { styled } from '@stitches/react';

const StyledHeader = styled('header', {
  height: "5rem",
  width: "100vw",
  backgroundColor: "#ffcf34",
  display: "flex",
});

const Title = styled('h1', {
  margin: "auto",
});

const Header = () => {
  return (
    <StyledHeader>
      <Title>Last 100 news</Title>
    </StyledHeader>
  );
};

export default Header;
