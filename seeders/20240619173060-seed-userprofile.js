'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = {
      userId: 1,
      fullName: 'admin',
      address: 'hacktiv8',
      email: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    await queryInterface.bulkInsert('UserProfiles', [ data ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserProfiles', null, { truncate: true, restartIdentity: true });
  }
};
