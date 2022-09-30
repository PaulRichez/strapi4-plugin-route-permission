'use strict';
module.exports = async ({ strapi }) => {
  // bootstrap phase
  // get Routes with roles on config
  const routes = strapi.service('plugin::route-permission.routes').getRoutesWithRolesConfigured();
  // get Roles with permissions
  const roles = await strapi.entityService.findMany('plugin::users-permissions.role', { populate: ['permissions'] });
  const prevsRouteConfig = await strapi.entityService.findMany('plugin::route-permission.route-permission', { populate: ['role'] })
  // generate permisison route/role
  var counterPermUpdated = 0;
  await routes.forEach(async (route) => {
    return await route.roles.forEach(async (role) => {
      const selectedRole = roles.find(r => r.type === role);
      if (selectedRole) {
        const action = `${route.type}::${route.name}.${route.controller}.${route.action}`;
        // permission no found
        if (!selectedRole.permissions.find(p => p.action === action)) {
          if (prevsRouteConfig.find(r => r.action === action && r.role.id === selectedRole.id)) {
            console.log(`Permission on role ${role} ::::: ${action} was removed from admin`)
            return null;
          } else {
            console.log(`Generating permission on role ${role} ::::: ${action}`)
            counterPermUpdated++;
            await strapi.entityService.create('plugin::route-permission.route-permission', {
              data: {
                action,
                role: selectedRole,
              },
            });
            return await strapi.entityService.create('plugin::users-permissions.permission', {
              data: {
                action,
                role: selectedRole,
              },
            });
          }
        }
      }
    })
  })
  console.log(`Route permission plugin ::::: ${counterPermUpdated} generated permissions `)
};