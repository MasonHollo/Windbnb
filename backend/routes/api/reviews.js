const express = require('express');
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { Review } = require('../../db/models');
const { Spot } = require('../../db/models');
const { SpotImage } = require("../../db/models");
const { User } = require("../../db/models");
const { ReviewImage } = require("../../db/models");


const router = express.Router();

//
router.get('/current', requireAuth, async (req, res) => {
  const reviews = await Review.findAll({ 
    where: { userId: req.user.id },
    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName'] // Limit fields
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

router.post('/:spotId', requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { review, stars } = req.body;
  
  const newReview = await Review.create({
    spotId,
    userId: req.user.id,
    review,
    stars
  }); 

  return res.status(201).json(newReview);
});

module.exports = router;
