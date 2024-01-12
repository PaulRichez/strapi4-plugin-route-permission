'use strict';
module.exports = async ({ strapi }) => {
  // bootstrap phase
  // get Routes with roles on config
  const routes = strapi.service('plugin::route-permission.routes').getRoutesWithRolesConfigured();
  // get Roles with permissions
  const roles = await strapi.entityService.findMany('plugin::users-permissions.role', { populate: ['permissions'] });
  // get routes in db
  const prevsRouteConfig = await strapi.entityService.findMany('plugin::route-permission.route-permission', { populate: ['role'] })
  // generate permisison route/role
  var counterPermUpdated = 0;
  for (const route of routes) {
    await route.roles.forEach(async (role) => {
      const selectedRole = roles.find(r => r.type === role);
      if (selectedRole) {
        // permission no found
        if (!selectedRole.permissions.find(p => p.action === route.perm_action)) {
          if (prevsRouteConfig.find(r => r.action === route.perm_action && r.role.id === selectedRole.id)) {
            strapi.log.info(`Permission on role ${role} ::::: ${route.perm_action} was removed from admin`)
            return null;
          } else {
            strapi.log.info(`Generating permission on role ${role} ::::: ${route.perm_action}`)
            counterPermUpdated++;
            await strapi.entityService.create('plugin::route-permission.route-permission', {
              data: {
                action: route.perm_action,
                role: selectedRole,
              },
            });
            return await strapi.entityService.create('plugin::users-permissions.permission', {
              data: {
                action: route.perm_action,
                role: selectedRole,
              },
            });
          }
        }
      }
    })
  }
  strapi.log.info(`Route permission plugin ::::: ${counterPermUpdated} generated permissions `)
};
