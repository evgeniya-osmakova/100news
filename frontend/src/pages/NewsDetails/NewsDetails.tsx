import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useRequest from '@/hooks/useRequest';
import { getNewsContent } from '@/api/news';
import NewsItem from '@/blocks/NewsItem';
import { Container } from '@/styles/base';
import Routes, { Pages } from '@/routes';
import { styled } from '@stitches/react';

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
  margin: "0 auto"
});


const NewsDetails = () => {
  const { id } = useParams<{id: string}>();
  const { data, loading, error } = useRequest(() => getNewsContent(id ?? ""));

  if (error && !loading) {
    return <Error>Ошибка при загрузке данных</Error>
  }

  return (
    <NewsWrapper direction="vertical">
      <BackLink to={Routes[Pages.News].path}>
        Back to news list
      </BackLink>
      <Error>{error}</Error>
      {loading && !data && <Container css={{margin: "auto"}}>...Loading</Container>}
      {data && <NewsItem newsData={data}/>}
    </NewsWrapper>
  );
};
export default NewsDetails;
