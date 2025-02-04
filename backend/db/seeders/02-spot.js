'use strict';

const { Spot } = require('../models');  
const bcrypt = require("bcryptjs");

console.log(Spot);
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '24 Willie Mays Plaza',
        city: 'San Francisco',
        state: 'california',
        country: 'United States',
        name: 'SF Giants',
        description: 'SF Giants stadium',
        price:'39'
      },
      {
        ownerId: 2,
        address: '400 Ballpark Dr',
        city: ' West Sacramento',
        state: 'california',
        country: 'United States',
        name: 'Sutter Health Park',
        description: 'Rivercats baseball stadium',
        price:'99'
      },
      {
        ownerId: 3,
        address: '347 Don Shula Dr Suite 102',
        city: 'Miami Gardens',
        state: 'Florida',
        country: 'United States',
        name: 'Hard Rock Stadium',
        description: 'Miami Dolphins Football stadium',
        price:''
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['SF Giants', 'Sutter Health Park', 'Hard Rock Stadium'] }
    }, {});
  }
};

