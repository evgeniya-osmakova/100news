import err from './hanging_404.gif'
import { styled } from '@stitches/react';
import { Link } from 'react-router-dom';
import Routes, { Pages } from '@/routes';
import Button from '@/components/Button';


const PageContent = styled('div', {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
});

function NotFound() {
  return (
    <PageContent>
      <img src={err} alt="404 error" />
      <h2>
        Page not found
      </h2>
      <Link to={Routes[Pages.News].path}>
        <Button text="To the home page" />
      </Link>
    </PageContent>
  );
}

export default NotFound;
