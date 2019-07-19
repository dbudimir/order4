import { Route } from 'now-next-routes';

export default {
   // Index
   index: new Route({ page: '/index', pattern: '/' }),

   // Users
   'user/[id]': new Route({ page: '/user/[id]', pattern: '/user:id' }),
};
