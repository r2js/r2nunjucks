module.exports = (app) => {
  app.get('/test/:route', (req, res) => {
    res.render('index.html');
  });
};
