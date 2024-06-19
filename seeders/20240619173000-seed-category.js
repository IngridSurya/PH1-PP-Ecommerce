'use strict';

const { Category } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let categoryData = require('../data/products.json').map(el => {
      return {
        name: el.name,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });
    await queryInterface.bulkInsert('Categories', categoryData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, { truncate: true, restartIdentity: true });
  }
};
