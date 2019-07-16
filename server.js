const next = require('next');
const express = require('express');
const routes = require('./routes');

const PORT = parseInt(process.env.PORT, 10) || 5000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
   express()
      .use(handler)
      .listen(PORT, () =>
         process.stdout.write(`Point your browser to: http://localhost:${PORT}\n`)
      );
});
