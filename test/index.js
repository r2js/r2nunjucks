const chai = require('chai');
const request = require('supertest');
const r2base = require('r2base');
const nunjucks = require('../index');

const expect = chai.expect;
process.chdir(__dirname);

const app = r2base();
app.start()
  .serve(nunjucks)
  .load('controller')
  .into(app);

before((done) => {
  done();
});

describe('r2nunjucks', () => {
  it('should render layout view', (done) => {
    app.render('layout.html', (err, html) => {
      expect(html).to.not.equal(undefined);
      expect(html.includes('layout html')).to.equal(true);
      expect(html.includes('index html')).to.equal(false);
      done();
    });
  });

  it('should render index view, extends layout', (done) => {
    app.render('index.html', (err, html) => {
      expect(html).to.not.equal(undefined);
      expect(html.includes('layout html')).to.equal(true);
      expect(html.includes('index html')).to.equal(true);
      done();
    });
  });

  it('should render index view with req data', (done) => {
    request(app)
      .get('/test/paramsRoute?a=queryA')
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.not.equal(undefined);
        expect(res.text.includes('layout html')).to.equal(true);
        expect(res.text.includes('index html')).to.equal(true);
        expect(res.text.includes('queryA')).to.equal(true);
        done();
      });
  });
});

function dropDatabase(done) {
  this.timeout(0);
  done();
}

after(dropDatabase);
