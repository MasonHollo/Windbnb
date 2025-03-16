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
        url:  "https://robbreport.com/wp-content/uploads/2022/05/Stone-Home-6.jpg",
        preview: true,
        spotId: 1,
        userId:1
    },
    {
        url:  "https://cdn.vox-cdn.com/thumbor/kFJ_36eTxBTnLPRysSUWUmTCTDQ=/0x0:1000x666/1370x1028/filters:focal(420x253:580x413):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/62569177/Featured_Listing__The_Late_Leonard_Miller_s_23_Star_Island_Lists_for__49_Million.0.0.jpeg",
        preview: true,
        spotId: 2,
        userId: 2
    },
    {
      url:  "https://yocolorado.com/cdn/shop/articles/lucas-ludwig-VlWKGkYPo_U-unsplash_Cropped_6ec2c6ff-dfb1-4891-95d5-87636153ddaf.jpg?v=1632447355&width=1400",
      preview: true,
      spotId: 3,
      userId: 3
     },
     {
      url:  "https://media.vrbo.com/lodging/34000000/33950000/33941900/33941841/ceb1db47.jpg?impolicy=resizecrop&rw=1200&ra=fit",
      preview: true,
      spotId: 4,
      userId: 2
     },
     {
      url:  "https://onekindesign.com/wp-content/uploads/2020/01/Modern-Southern-Farmhouse-Steve-Powell-Homes-01-1-Kindesign.jpg",
      preview: true,
      spotId: 5,
      userId: 1
     }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};