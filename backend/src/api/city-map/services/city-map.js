'use strict';

/**
 * city-map service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::city-map.city-map');
