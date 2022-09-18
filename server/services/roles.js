'use strict';
const _ = require('lodash');

module.exports = ({ strapi }) => ({
  getRoles() {
    return strapi.entityService.findMany('plugin::users-permissions.role', { populate: ['permissions'] });
  },
  addPermissionToRole(role, action) {
    return strapi.entityService.create('plugin::users-permissions.permission', {
      data: {
        action,
        role,
      },
    });
  }
});
