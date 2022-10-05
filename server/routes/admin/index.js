'use strict';

module.exports = {
    type: "admin",
    routes: [
        {
            method: 'GET',
            path: '/configured-routes',
            handler: 'admin-route-permission.getConfiguredRoutes',
            config: {
                policies: [],
            }
        },
        {
            method: 'DELETE',
            path: '/configured-routes-history',
            handler: 'admin-route-permission.deleteConfiguredRouteHistory',
            config: {
                policies: [],
            }
        }
    ]
}