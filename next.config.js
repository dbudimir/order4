module.exports = {
   exportPathMap() {
      return {
         '/': { page: '/' },
         '/chains/[name]': { page: '/chains/:name' },
         '/orders/all': { page: '/orders/all' },
         '/orders/[user]': { page: '/orders/:user' },
         '/login': { page: '/signup' },
      };
   },
};
