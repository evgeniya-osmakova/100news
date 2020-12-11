import chai from 'chai';
import chaiHttp from 'chai-http';
import nock from 'nock';
import _ from 'lodash';
import app from '../server.js';

chai.use(chaiHttp);
chai.should();

describe('GET /news', () => {
  it('should get 100 news', (done) => {
    chai.request(app)
      .get('/news')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(100);
        done();
      });
  });

  it('should return correct data', (done) => {
    const id1 = _.uniqueId();
    const id2 = _.uniqueId();

    const newsIds = [id1, id2];

    const newsItem1 = {
      by: 'dhouston',
      descendants: 71,
      id: id1,
      kids: [
        9224,
        8917,
      ],
      score: 104,
      time: 1175714200,
      title: 'My YC app: Dropbox - Throw away your USB drive',
      type: 'story',
      url: 'http://www.getdropbox.com/u/2/screencast.html',
    };
    const newsItem2 = {
      by: 'abc',
      descendants: 10,
      id: id2,
      kids: [
        434,
        135,
      ],
      score: 100,
      time: 1175414200,
      title: 'For every cycle a HW engineer saves, a SW engineer will add two instructions',
      type: 'story',
      url: 'https://fabiensanglard.net/silicone/',
    };

    const newsData = [
      {
        by: 'dhouston',
        descendants: 71,
        id: id1,
        kids: [
          9224,
          8917,
        ],
        score: 104,
        time: 1175714200,
        title: 'My YC app: Dropbox - Throw away your USB drive',
        type: 'story',
        url: 'http://www.getdropbox.com/u/2/screencast.html',
      }, {
        by: 'abc',
        descendants: 10,
        id: id2,
        kids: [
          434,
          135,
        ],
        score: 100,
        time: 1175414200,
        title: 'For every cycle a HW engineer saves, a SW engineer will add two instructions',
        type: 'story',
        url: 'https://fabiensanglard.net/silicone/',
      },
    ];

    nock('https://hacker-news.firebaseio.com')
      .get('/v0/newstories.json')
      .reply(200, newsIds);

    nock('https://hacker-news.firebaseio.com')
      .get(`/v0/item/${id1}.json`)
      .reply(200, newsItem1);

    nock('https://hacker-news.firebaseio.com')
      .get(`/v0/item/${id2}.json`)
      .reply(200, newsItem2);

    chai.request(app)
      .get('/news')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.should.be.deep.equal(newsData);
        done();
      });
  });
});

describe('GET /item/:id', () => {
  it('should get a single item', (done) => {
    const id = _.uniqueId();

    chai.request(app)
      .get(`/item/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should return correct data', (done) => {
    const id = _.uniqueId();

    const data = {
      by: 'dhouston',
      descendants: 71,
      id: 8863,
      kids: [
        9224,
        8917,
      ],
      score: 104,
      time: 1175714200,
      title: 'My YC app: Dropbox - Throw away your USB drive',
      type: 'story',
      url: 'http://www.getdropbox.com/u/2/screencast.html',
    };

    nock('https://hacker-news.firebaseio.com')
      .get(`/v0/item/${id}.json`)
      .reply(200, data);

    chai.request(app)
      .get(`/item/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.be.deep.equal(data);
        done();
      });
  });
});
