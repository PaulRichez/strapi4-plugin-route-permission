'use strict';
const _ = require('lodash');

module.exports = {
  async getConfiguredRoutes(ctx, next) {
    const routes = await strapi.service('plugin::route-permission.routes').getRoutesWithRolesConfigured();
    const roles = await strapi.entityService.findMany('plugin::users-permissions.role', { populate: ['permissions'] });
    let configuredRoutes = [];
    await routes.forEach(async (route) => {
      return await route.roles.forEach(async (role) => {
        const selectedRole = roles.find(r => r.type === role);
        if (selectedRole) {
          if (!selectedRole.permissions.find(p => p.action === route.perm_action)) {
            configuredRoutes.push({
              role: role,
              status: 2,
              permission: route.perm_action
            })
          } else {
            configuredRoutes.push({
              role: role,
              status: 1,
              permission: route.perm_action
            })
          }
        } else {
          configuredRoutes.push({
            role: role,
            status: 3,
            permission: route.perm_action
          })
        }
      });
    });
    const total = configuredRoutes.length;
    if (ctx.query.sort) {
      configuredRoutes = _.orderBy(configuredRoutes, [ctx.query.sort.split(':')[0]], [ctx.query.sort.split(':')[1].toLowerCase()]);
    }
    if (ctx.query.page) {
      const pageSize = ctx.query.pageSize || 10;
      const start = pageSize * (ctx.query.page - 1);
      const end = Number(start) + pageSize;
      console.log(start, end)
      configuredRoutes = configuredRoutes.splice(start, end)
    }
    ctx.body = {
      result: configuredRoutes, pagination: {
        total,
        page: ctx.query.page || 1,
        pageSize: ctx.query.pageSize || 10,
        pageCount: Math.ceil(total / (ctx.query.pageSize || 10))
      }
    };
  },
  async deleteConfiguredRouteHistory(ctx, next) {
    ctx.body = 'delete';
  }
};
