'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('route-permission')
      .service('myService')
      .getWelcomeMessage();
  },
});
