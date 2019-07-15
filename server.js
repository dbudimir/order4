const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const pathMatch = require('path-match');

const port = parseInt(process.env.PORT, 10) || 5000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const route = pathMatch();

app.prepare().then(() => {
   createServer((req, res) => {
      const path = req.url.split('/')[1];
      const match = route(`/${path}/:name`);
      const { pathname } = parse(req.url);
      const params = match(pathname);
      if (params === false) {
         handle(req, res);
         return;
      }

      app.render(req, res, path, params);
   }).listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
   });
});
