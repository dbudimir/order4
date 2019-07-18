module.exports = {
   exportPathMap() {
      return {
         '/': { page: '/' },
         '/chains/[name]': { page: '/chains/:name' },
         '/orders/all': { page: '/orders/all' },
         '/orders/[id]': { page: '/orders/id' },
         '/user/[user]': { page: '/user/:user' },
         '/login': { page: '/signup' },
      };
   },
};
