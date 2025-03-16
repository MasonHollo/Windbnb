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
        url:  "https://cf.bstatic.com/xdata/images/hotel/max1280x900/517550012.jpg?k=0ba780f463b4132594597bbb02a4626b8136bac80afc71436ded925a58b0ecfe&o=&hp=1",
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