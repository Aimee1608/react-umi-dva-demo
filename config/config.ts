import { defineConfig } from 'umi';
import routes from './routes';
console.log('config------>');
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  base: '/',
  publicPath: '/static/',
  hash: true,
  history: {
    type: 'hash',
  },
  routes: routes,
});
