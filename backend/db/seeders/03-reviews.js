'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
    
        review: "Amazing place, very clean!",
        stars: 5
      },
      {

        review: "Nice spot, but a bit noisy.",
        stars: 3
      },
      {
       
        review: "Great location and host.",
        stars: 4
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["App Academy", "Beachside Bungalow", "Mountain Cabin"] }
    }, {});
  }
};
