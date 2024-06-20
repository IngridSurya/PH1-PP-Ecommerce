'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PurchaseHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PurchaseHistory.belongsTo(models.Product, { foreignKey: "productId" });
      PurchaseHistory.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  PurchaseHistory.init({
    productId: {
      allowNull: false,
      validate: {
        notNull: {
          msg: "productId is required."
        },
        notEmpty: {
          msg: "productId is required."
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
    quantity: {
      allowNull: false,
      validate: {
        notNull: {
          msg: "quantity is required."
        },
        notEmpty: {
          msg: "quantity is required."
        }
      },
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'PurchaseHistory',
  });
  return PurchaseHistory;
};