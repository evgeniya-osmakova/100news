import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './common.scss';
import News from './News/News';
import Header from './Header/Header';
import NotFound from './NotFound/NotFound';
import NewsItem from './NewsItem/NewsItem';

function App() {
  return (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path='/'>
        <News />
      </Route>
      <Route path={'/:newsItemId'}>
        <NewsItem />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </BrowserRouter>
  );
}

export default App;
