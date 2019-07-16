const routes = require('next-routes');

module.exports = routes()
   .add('index', '/')
   .add('signup', '/signup')
   .add('login', '/signup')
   .add('create-order', '/create-order')
   .add('orders/all', '/orders/')
   .add('orders/:user', '/orders/[user]')
   .add('chains/:name', '/chains/[name]');
