const express = require('express');
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { Review, Spot, SpotImage, User, ReviewImage } = require('../../db/models');


const router = express.Router();

//get all reviews of current user.
router.get('/current', requireAuth, async (req, res) => {
  const reviews = await Review.findAll({ 
    where: { userId: req.user.id },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Spot,
        attributes: [
          'id', 'ownerId', 'address', 'city', 'state', 'country',
          'lat', 'lng', 'name', 'price', 'previewImage'
        ]
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  });
  res.json({ Reviews: reviews });
});

//add a image to a review from review Id
router.post("/:reviewId/images", async (req, res) => {
  return res.status(200).json({
    message: "this route works"
  })
})

module.exports = router;
