'use strict';

const bootstrap = require('./bootstrap');
const services = require('./services');
const contentTypes = require('./content-types');
const routes = require('./routes');
const controllers = require('./controllers');
module.exports = {
  bootstrap,
  services,
  contentTypes,
  routes,
  controllers
};
