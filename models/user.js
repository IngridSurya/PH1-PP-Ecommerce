'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.UserProfile, { foreignKey: "userProfileId" });
      User.hasMany(models.PurchaseHistory, { foreignKey: "userId" });
      User.hasMany(models.Product, { foreignKey: "userId" });
    }
  }
  User.init({
    userProfileId: {
      allowNull: false,
      validate: {
        notNull: {
          msg: `userProfileId is required.`
        },
        notEmpty: {
          msg: `userProfileId is required.`
        }
      },
      type: DataTypes.INTEGER,
    },
    username: {
      allowNull: false,
      validate: {
        notNull: {
          msg: `username is required.`
        },
        notEmpty: {
          msg: `username is required.`
        }
      },
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      validate: {
        notNull: {
          msg: `password is required.`
        },
        notEmpty: {
          msg: `password is required.`
        }
      },
      type: DataTypes.STRING,
    },
    role: {
      allowNull: false,
      validate: {
        notNull: {
          msg: `role is required.`
        },
        notEmpty: {
          msg: `role is required.`
        }
      },
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};