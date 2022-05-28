import React, { useEffect, useState } from 'react';
import { getNews } from '@/api/news';
import { News } from '@/models/models';
import useRequest from '@/hooks/useRequest';
import NewsItem from '@/blocks/NewsItem';
import Button from '@/components/Button';
import { styled } from '@stitches/react';
import { generatePath, Link } from 'react-router-dom';
import Routes, { Pages } from '@/routes';
import { Container } from '@/styles/base';

const NewsWrapper = styled('section', {
  padding: "1rem",
  height: "100%",
});

const Error = styled('h5', {
  height: "2rem",
  color: "red",
  display: "flex",
  justifyContent: "center",
});

const StyledLink = styled(Link, {
  color: 'black',
  textDecoration: "none",
  "&:hover": {
    color: "#f6bc00",
    transition: "color 0.5s ease",
  },
  "&:hover > div": {
    boxShadow :"0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)",
    transition: "boxShadow 0.2s ease",
  },
  "&:active > div": {
    boxShadow :"0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)",
  }
});

function NewsList() {
  const { data, loading, error, refetch } = useRequest(getNews, 10000);
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    if (news.length === 0 && data) {
      setNews(data);
    }
  }, [data, news])

  if (error && !loading) {
    return <Error>Ошибка при загрузке данных</Error>
  }

  return (
    <>
      <Button onClick={refetch} disabled={loading} text="Check news update" style={{
        margin: "2rem auto",
        display: "block",
      }}/>
      <Error>{error}</Error>
      {loading && news.length === 0 && <Container content="center">...Loading</Container>}
      <NewsWrapper>
        {news.map((newsData) => <StyledLink key={newsData.id} to={generatePath(Routes[Pages.NewsDetails].path, {id: String(newsData.id)})} >
          <NewsItem newsData={newsData} />
        </StyledLink>)}
      </NewsWrapper>
    </>
  );
}

export default NewsList;
