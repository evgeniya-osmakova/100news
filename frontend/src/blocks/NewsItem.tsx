import { styled } from '@stitches/react';
import React from 'react';
import { useMatch } from 'react-router-dom';

import Routes from '@/routes';
import { Container } from '@/styles/base';
import { News } from '@/types/models';

const Wrapper = styled(Container, {
  position: 'relative',
  border: "1px solid black",
  padding: "1rem",
  maxWidth: "800px",
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: "2rem",
  cursor: "pointer",
});

const NewsItem: React.FC<{newsData: News}> = ({ newsData }) => {
  const isNewsPage = useMatch(Routes.News);
  const {
    by,
    time,
    title,
    url,
  } = newsData;

  return (
    <Wrapper direction="vertical">
      <h3>{title}</h3>

      <Container
        content="between"
        css={{flexWrap: "wrap", borderTop: "1px solid black"}}
      >
        <h5>Author: {by}</h5>
        <p>
          Published at {new Date(time  * 1000).toLocaleString()}
        </p>
      </Container>

      {!isNewsPage &&(
        <a href={url}
          target="_blank"
          rel="noopener noreferrer">read more</a>
      )}
    </Wrapper>
  );
};

export default NewsItem;
