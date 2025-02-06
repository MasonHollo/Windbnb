'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
    {
        url:  "test img",
        preview: true,
        spotId: 1
    },
    {
        url:  "test img",
        preview: true,
        spotId: 2
    },
    {
      url:  "test img",
      preview: true,
      spotId: 3
     }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["App Academy", "Beachside Bungalow", "Mountain Cabin"] }
    }, {});
  }
};