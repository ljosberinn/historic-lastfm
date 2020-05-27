const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/.netlify/functions', {
      pathRewrite: {
        '^/\\.netlify/functions': '',
      },
      target: 'http://localhost:9000',
    })
  );
};
