import { styled } from '@stitches/react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { getNewsContent } from '@/api/news';
import NewsItem from '@/blocks/NewsItem';
import useRequest from '@/hooks/useRequest';
import Routes from '@/routes';
import { Container } from '@/styles/base';

const NewsWrapper = styled(Container, {
  padding: "1rem",
});

const BackLink = styled(Link, {
  marginLeft: "1rem",
  marginTop: "1rem",
  marginBottom: "2rem"
});

const Error = styled('h5', {
  height: "2rem",
  color: "red",
  display: "flex",
  justifyContent: "center",
});


const NewsDetails = () => {
  const { id } = useParams<{id: string}>();
  const {
    data,
    loading,
    error
  } = useRequest(() => getNewsContent(id ?? ""));

  if (error && !loading) {
    return <Error>Ошибка при загрузке данных</Error>
  }

  return (
    <NewsWrapper direction="vertical">
      <BackLink to={Routes.News.path}>
        Back to news list
      </BackLink>

      <Error>{error}</Error>

      {loading && !data &&(
        <Container css={{margin: "auto"}}>
          ...Loading
        </Container>
      )}

      {data && (
        <NewsItem newsData={data}/>
      )}
    </NewsWrapper>
  );
};

export default NewsDetails;
