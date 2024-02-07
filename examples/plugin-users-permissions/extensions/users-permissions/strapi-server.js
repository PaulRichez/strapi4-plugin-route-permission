'use strict';

/**
 * extend User.
 */

const routes = require('./routes');

module.exports = (plugin) => {
  console.log(routes);
  //register routes
  Object.keys(routes).forEach(key => {
    if (!plugin.routes[key]) {
      plugin.routes[key] = routes[key];
      return;
    }
    const declaredRoutes = routes[key]
    if (!declaredRoutes?.routes || !Array.isArray(declaredRoutes?.routes)) return;
    declaredRoutes?.routes?.forEach(route => {
      const indexIfRouteAlreadyExists = plugin.routes[key].routes.findIndex(r => r.path === route.path);
      if (indexIfRouteAlreadyExists > -1) {
        plugin.routes[key].routes[indexIfRouteAlreadyExists] = route;
        console.log( plugin.routes[key].routes.find(r => r.path === route.path));
      } else {
        plugin.routes[key].routes.push(route);
      }
    });
  });

  return plugin;
};
