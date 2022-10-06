'use strict';

module.exports = ({ strapi }) => ({
  async deleteConfiguredRoutesHistory() {
    await strapi.entityService.deleteMany('plugin::route-permission.route-permission', { });
  }
});
