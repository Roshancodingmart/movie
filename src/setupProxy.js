const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    'https://api.comilio.it/rest/v1/message/',
    proxy({
      target: 'https://api.comilio.it/rest/v1/message/',
      changeOrigin: true,
    })
  );
};