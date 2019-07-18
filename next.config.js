module.exports = {
   exportPathMap() {
      return {
         '/': { page: '/' },
         '/chains/[name]': { page: '/chains/:name' },
         '/orders/all': { page: '/orders/all' },
         '/orders/[id]': { page: '/orders/id' },
         '/user/[user]': { page: '/user/:user' },
         '/tag/vegan': { page: '/user/:tag', query: { tag: 'vegan' } },
         '/tag/spicy': { page: '/user/:tag', query: { tag: 'spicy' } },
         '/login': { page: '/signup' },
      };
   },
};

// const withTypescript = require('@zeit/next-typescript');
// const withCSS = require('@zeit/next-css');

// module.exports = withTypescript(
//    withCSS({
//       exportPathMap: async defaultPathMap => ({
//          '/': { page: '/index', query: { lang: 'English' } },
//          '/fr': { page: '/index', query: { lang: 'French' } },
//       }),
//    })
// );
