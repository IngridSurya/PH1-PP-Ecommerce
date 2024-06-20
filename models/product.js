'use strict';
const {
  Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.PurchaseHistory, { foreignKey: "productId" });
      Product.belongsTo(models.User, { foreignKey: "userId" });
      Product.belongsTo(models.Category, { foreignKey: "categoryId" });
    }
    static async getDetails(categoryId, name) {
      try {
        let options = {};
        options.include = [
          { model: sequelize.models.User },
          { model: sequelize.models.Category }
        ]
        options.where = {};
        options.where.stock = { [Op.gt]: 0 };
        if (categoryId) {
          options.where.categoryId = categoryId;
        }
        if (name) {
          options.where.name = { [Op.iLike]: `%${name}%` };
        }
        options.order = [['stock','desc']];
        let data = await Product.findAll(options);
        return data;
      } catch (error) {
        throw error;
      }
    }
  }
  Product.init({
    name: {
      allowNull: false,
      validate: {
        notNull: {
          msg: "name is required."
        },
        notEmpty: {
          msg: "name is required."
        }
      },
      type: DataTypes.STRING
    },
    description: DataTypes.STRING,
    price: {
      allowNull: false,
      validate: {
        notNull: {
          msg: "price is required."
        },
        notEmpty: {
          msg: "price is required."
        }
      },
      type: DataTypes.INTEGER
    },
    stock: {
      allowNull: false,
      validate: {
        notNull: {
          msg: "stock is required."
        },
        notEmpty: {
          msg: "stock is required."
        }
      },
      type: DataTypes.INTEGER
    },
    categoryId: {
      allowNull: false,
      validate: {
        notNull: {
          msg: "categoryId is required."
        },
        notEmpty: {
          msg: "categoryId is required."
        }
      },
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      validate: {
        notNull: {
          msg: "userId is required."
        },
        notEmpty: {
          msg: "userId is required."
        }
      },
      type: DataTypes.INTEGER
    },
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};