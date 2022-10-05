'use strict';

module.exports = {
  async getConfiguredRoutes(ctx, next) {
    ctx.body = await strapi.service('plugin::route-permission.routes').getRoutesWithRolesConfigured();;
  },
  async deleteConfiguredRouteHistory(ctx, next) {
    ctx.body = 'delete'
  }
};
