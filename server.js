const next = require('next');
const express = require('express');
const routes = require('./routes');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
   express()
      .use(handler)
      .get('/post/:slug', (req, res) =>
         app.render(req, res, '/post', { slug: req.params.slug })
      )
      .listen(3000);
});
