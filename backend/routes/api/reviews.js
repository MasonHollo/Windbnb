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

//add a image to a review from review Id ----- still needs work -------
router.post("/:reviewId/images", async (req, res) => {
  return res.status(200).json({
    message: "this route works"
  })
})


//Delete a review
router.delete('/:reviewId', requireAuth, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { user } = req;


    const review = await Spot.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({
        message: "review couldn't be found"
      });
    }

    if (review.ownerId !== user.id) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }


    await review.destroy();

    return res.status(200).json({
      message: "Successfully deleted"
    });

  } catch (e) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
});

// Edit A Review ------ still needs work ------
router.put('/:reviewId', requireAuth, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { user } = req; 
    const { review ,stars } = req.body;


    const reviews = await Review.findByPk(reviewId);

    if (reviews.ownerId !== user.id) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }

    await reviews.update({
      review, stars
    });


    return res.status(200).json(reviews);

  } catch (e) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
});

module.exports = router;
