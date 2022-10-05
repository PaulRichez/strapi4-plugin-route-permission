'use strict';

module.exports = {
  async getConfiguredRoutes(ctx, next) {
    const routes = await strapi.service('plugin::route-permission.routes').getRoutesWithRolesConfigured();
    const roles = await strapi.entityService.findMany('plugin::users-permissions.role', { populate: ['permissions'] });
    const configuredRoutes = [];
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
    ctx.body = {
      result: configuredRoutes, meta: {
        total: configuredRoutes.length
      }
    };
  },
  async deleteConfiguredRouteHistory(ctx, next) {
    ctx.body = 'delete';
  }
};
