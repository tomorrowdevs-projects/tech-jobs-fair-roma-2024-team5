const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/trpc',
    createProxyMiddleware({
      target: `${process.env.MYHABIX_BACKEND_URL || 'http://localhost:3001'}/trpc`,
      changeOrigin: true,
    })
  );
};

console.log('CREATE MIDDLEWARE')