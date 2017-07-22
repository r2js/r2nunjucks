const express = require('express');
const expressNunjucks = require('express-nunjucks');

module.exports = function Nunjucks(app, conf = {}) {
  const {
    baseDir = process.cwd(),
    maxAge = '1d',
  } = conf;

  app.set('views', `${baseDir}/views`);
  const isDev = app.get('env') === 'development';
  const njk = expressNunjucks(app, {
    watch: isDev,
    noCache: isDev,
  });

  app.use((req, res, next) => {
    const { body = {}, query = {} } = req;
    Object.assign(res.locals, {
      req: { body, query },
    });
    next();
  });

  app.use(express.static(`${baseDir}/public`, { maxAge }));

  return { njk };
};
