'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require ('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserProfile, { foreignKey: "userId" });
      User.hasMany(models.PurchaseHistory, { foreignKey: "userId" });
      User.hasMany(models.Product, { foreignKey: "userId" });
    }
  }
  User.init({
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
    hooks: {
      beforeCreate(instance, opt){
        let ikan = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(instance.password, ikan);
        
        instance.password = hash;
      }
    }
  });
  return User;
};