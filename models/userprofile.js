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
      UserProfile.belongsTo(models.User, { foreignKey: "userId" })
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
    address: DataTypes.STRING,
    email: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'email is required.'
        },
        isEmail: {
          msg: 'please enter a valid email.'
        }
      }
    },
    userId: {
      allowNull: false,
      validate: {
        notNull: {
          msg: `userId is required.`
        },
        notEmpty: {
          msg: `userId is required.`
        }
      },
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};