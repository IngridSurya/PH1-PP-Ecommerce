'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.hasOne(models.User, { foreignKey: "userProfile" })
    }
  }
  UserProfile.init({
    fullName: {
      allowNull: false,
      validate: {
        notNull: {
          msg: `fullName is required.`
        },
        notEmpty: {
          msg: `fullName is required.`
        }
      },
      type: DataTypes.STRING,
    },
    address: {
      allowNull: false,
      validate: {
        notNull: {
          msg: `address is required.`
        },
        notEmpty: {
          msg: `address is required.`
        }
      },
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      validate: {
        notNull: {
          msg: `email is required.`
        },
        notEmpty: {
          msg: `email is required.`
        }
      },
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};