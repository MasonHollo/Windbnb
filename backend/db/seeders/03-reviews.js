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
        spotId: 1,
        userId: 1,
        comment: "Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!",
        stars: 5
      },
      {
        spotId: 2,
        userId: 2,
        comment: "Nice spot, but a bit noisy.Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!",
        stars: 3
      },
      {
        spotId: 1,
        userId: 1,
        comment: "Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!",
        stars: 1
      },
      {
        spotId: 2,
        userId: 2,
        comment: "Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!",
        stars: 2
      },
      {
        spotId: 5,
        userId: 3,
        comment: "Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!",
        stars: 3
      },{
        spotId: 5,
        userId: 1,
        comment: "Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!",
        stars: 1
      },
      {
        spotId: 4,
        userId: 2,
        comment: "Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!",
        stars: 4
      },
      {
        spotId: 4,
        userId: 3,
        comment: "Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!",
        stars: 2
      },
      {
        spotId: 1,
        userId: 3,
        comment: "Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!",
        stars: 3
      },
      {
        spotId: 2,
        userId: 2,
        comment: "Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!",
        stars: 5
      },
     {
        spotId: 2,
        userId: 2,
        comment: "Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!",
        stars: 1
      },
      {
        spotId: 2,
        userId: 2,
        comment: "Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!",
        stars: 5
      },
      {
        spotId: 5,
        userId: 3,
        comment: "Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!",
        stars: 1
      },{
        spotId: 5,
        userId: 1,
        comment: "Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!",
        stars: 5
      },
      {
        spotId: 4,
        userId: 2,
        comment: "Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!",
        stars: 1
      },
      {
        spotId: 4,
        userId: 3,
        comment: "Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!",
        stars: 5
      },
      {
        spotId: 3,
        userId: 3,
        comment: "Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!Amazing place, very clean!",
        stars: 5
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
