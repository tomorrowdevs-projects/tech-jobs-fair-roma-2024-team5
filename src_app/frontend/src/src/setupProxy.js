const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/trpc',
    createProxyMiddleware({
      target: 'http://backend:3001/trpc',
      changeOrigin: true,
    })
  );
};

console.log('CREATE MIDDLEWARE')