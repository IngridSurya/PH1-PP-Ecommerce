
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Products', 'userId', { allowNull: false, type: Sequelize.INTEGER, references: { model: "Users", key: "id" } });
    await queryInterface.addColumn('Products', 'imgUrl', Sequelize.STRING);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Products', 'userId');
    await queryInterface.removeColumn('Products', 'imgUrl');
  }
};
