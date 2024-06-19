'use strict';

const { Category } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../data/products.json');
    for (let i in data) {
      let options = {};
      options.where = { name: data[i].name };
      let category = await Category.findOne(options);

      let productData = data[i].in_game_items.map((el) => {
        return {
          name: el.item_name,
          description: el.description,
          price: el.price,
          stock: el.stock,
          imgUrl: el.image_url,
          userId: 1,
          categoryId: category.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
      await queryInterface.bulkInsert('Products', productData, {});
    };
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, { truncate: true, restartIdentity: true });
  }
};
