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
        lat:'37.778572',
        lng:'-122.389717',
        name: 'SF Giants',
        description: 'SF Giants stadium',
        price:'39.444',
        previewImage:'https://upload.wikimedia.org/wikipedia/commons/8/8e/Oracle_Park_2021.jpg' ,
        avgRating:5.0
      },
      {
        ownerId: 2,
        address: '400 Ballpark Dr',
        city: ' West Sacramento',
        state: 'california',
        country: 'United States',
        lat:'38.344934',
        lng:'121.304968',
        name: 'Sutter Health Park',
        description: 'Rivercats baseball stadium',
        price:'9933.99',
        previewImage: 'https://www.sacbee.com/latest-news/5r7msx/picture249671663/alternates/LANDSCAPE_1140/RB_River_Cats_Giants.JPG',
        avgRating: 3.5
      },
      {
        ownerId: 3,
        address: '347 Don Shula Dr Suite 102',
        city: 'Miami Gardens',
        state: 'Florida',
        country: 'United States',
        lat:'25.957960',
        lng:'-80.239311',
        name: 'Hard Rock Stadium',
        description: 'Miami Dolphins Football stadium',
        price:'1447.67',
        previewImage: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/14/53/31/ed.jpg' ,
        avgRating: 2.5
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

