'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
        Spot.belongsTo(models.User, { foreignKey: 'ownerId' }); 
    }
    
  }

  Spot.init(
    {
      ownerId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
          }
      },
      address:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len: [1, 50]
        }
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 50]
          },
        },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 50],
        },
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50],
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [1,50]
        }
      },
      description:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 250]
        }
      },
      price:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max:99
        }
      }
    },
    {
      sequelize,
      modelName: 'Spot',
      defaultScope: {
        // attributes: {
        //   exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
        // },
      },
    }
  );
  return Spot;
};