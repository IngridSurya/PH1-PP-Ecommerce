'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = {
      userProfileId: 1,
      username: 'sa',
      password: 'sa',
      role: 'seller',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    await queryInterface.bulkInsert('Users', [ data ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, { truncate: true, restartIdentity: true });
  }
};
