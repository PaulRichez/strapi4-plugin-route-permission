'use strict';
module.exports = async ({ strapi }) => {
  // bootstrap phase
  // get Routes with roles on config
  const routes = strapi.service('plugin::route-permission.routes').getRoutesWithRolesConfigured();
  // get Roles with permissions
  const roles = await strapi.service('plugin::route-permission.roles').getRoles();
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
          return await strapi.service('plugin::route-permission.roles').addPermissionToRole(selectedRole, action);
        }
      }
    })
  })
  console.log(`Route permission plugin ::::: ${counterPermUpdated} generated permissions `)
};