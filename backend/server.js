import Express from 'express';
import morgan from 'morgan';
import axios from 'axios';

const server = new Express();
const logger = morgan('combined');
const cors = require('cors');

server.use(logger);
server.use(cors());

const host = '0.0.0.0'
const port = 7000

const hackerNewsHost = 'https://hacker-news.firebaseio.com';

const routes = {
  getNews: () => [hackerNewsHost, 'v0/newstories.json'].join('/'),
  getItem: (id) => [hackerNewsHost, `v0/item/${id}.json`].join('/'),
};


server.get('/news', async (req, res) => {
  try {
    const urlToNewsList = routes.getNews();
    const news = await axios.get(urlToNewsList);
    const last100news = news.data.slice(0, 100);
    const newsData = await Promise.all(last100news.map(async (newsItem) => {
      try {
        const urlToNewsItemData = routes.getItem(newsItem);
        const newsItemData = await axios.get(urlToNewsItemData);
        return newsItemData.data;
      } catch (error) {
        console.error(error);
      }
    }));
    res.send(newsData);
  } catch (error) {
    console.error(error);
  }
});

server.get('/item/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const url = routes.getItem(id);
    const comment = await axios.get(url);
    res.send(comment.data);
  } catch (error) {
    console.error(error);
  }
});

server.listen(port, host, () =>
  console.log(`Server listens http://${host}:${port}`)
)

export default server;
