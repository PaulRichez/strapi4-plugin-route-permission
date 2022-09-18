'use strict';
const _ = require('lodash');

module.exports = ({ strapi }) => ({
  getRoutesWithRolesConfigured() {
    const routes = [];
    // get routes from each API
    for (const apiName in strapi.api) {
      const api = strapi.api[apiName];
      _.forEach(api.routes, router => {
        router.routes.forEach((route) => {
          const [controller, action] = _.get(route, "handler").split(".")
          if (route?.config?.roles) {
            routes.push({
              type: 'api',
              name: apiName,
              controller,
              action,
              roles: route.config.roles,
            });
          }
        })
      })
    }
    // get routes from each Plugin
    for (const pluginName in strapi.plugins) {
      const plugin = strapi.plugins[pluginName];
      _.forEach(plugin.routes, router => {
        router.routes.forEach((route) => {
          if (route?.config?.roles) {
            const [controller, action] = _.get(route, "handler").split(".")
            routes.push({
              type: 'plugin',
              name: pluginName,
              controller,
              action,
              roles: route.config.roles,
            });
          }
        })
      })
    }

    return routes;
  }
});
