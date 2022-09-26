'use strict';
module.exports = async ({ strapi }) => {
  // bootstrap phase
  // get Routes with roles on config
  const routes = strapi.service('plugin::route-permission.routes').getRoutesWithRolesConfigured();
  // get Roles with permissions
  const roles = await strapi.entityService.findMany('plugin::users-permissions.role', { populate: ['permissions'] });
  // generate permisison route/role
  var counterPermUpdated = 0;
  await routes.forEach(async (route) => {
    return await route.roles.forEach(async (role) => {
      const selectedRole = roles.find(r => r.type === role);
      if (selectedRole) {
        const action = `${route.type}::${route.name}.${route.controller}.${route.action}`;
        const perm = selectedRole.permissions.find(p => p.action === action);
        if (!perm) {
          console.log(`generating permission on role ${role} ::::: ${action}`)
          counterPermUpdated++;
          return await strapi.entityService.create('plugin::users-permissions.permission', {
            data: {
              action,
              role,
            },
          });
        }
      }
    })
  })
  console.log(`Route permission plugin ::::: ${counterPermUpdated} generated permissions `)
};