const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Review, Spot, SpotImage, User, ReviewImage } = require('../../db/models');

const router = express.Router();

const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be within -90 and 90'),
  check('lng')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be within -180 and 180'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .isFloat({ min: 0 })
    .withMessage('Price per day must be a positive number'),
  handleValidationErrors
];

//get spots owned by currnet user
router.get('/current', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const spots = await Spot.findAll({
      where: { ownerId: userId }
    });

    return res.status(200).json({ Spots: spots });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});


router.get('/:spotId', async (req, res) => {
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId, {
    include: [
      {
        model: SpotImage,
        attributes: ['id', 'url', 'preview']
      },
      {
        model: User,
        as: 'Owner',
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Review,
        attributes: ['id', 'userId', 'stars', 'review', 'createdAt', 'updatedAt'],
      }
    ]
  });

  if (!spot) {
    return res.status(404).json({
      message: "Spot not found."
    });
  }
  return res.json({
    id: spot.id,
    ownerId: spot.ownerId,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lng,
    name: spot.name,
    description: spot.description,
    price: spot.price,
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt,
    avgRating: spot.star,
    SpotImages: spot.SpotImages,
    Owner: spot.Owner,
    Reviews: spot.Reviews
  });
});



router.get('/', async (req, res) => {
  const spots = await Spot.findAll();
  res.status(200).json({ Spots: spots });
});

router.post('/', requireAuth, validateSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const { user } = req;

  const newSpot = await Spot.create({
    ownerId: user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  });

  return res.status(201).json(newSpot);
});

//Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
  try {
    const { spotId } = req.params;
    const { user } = req;


    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found"
      });
    }

    if (spot.ownerId !== user.id) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }


    await spot.destroy();

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

// Edit A Spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
  try {
    const { spotId } = req.params;
    const { user } = req;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;


    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found"
      });
    }

    if (spot.ownerId !== user.id) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }

    await spot.update({
      address, city, state, country, lat, lng, name, description, price
    });


    return res.status(200).json(spot);

  } catch (e) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
});


// Add Image to Spot
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;
  const { user } = req;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found"
      });
    }

    if (spot.ownerId !== user.id) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }

    const newImage = await SpotImage.create({
      spotId,
      url,
      preview
    });

    return res.status(200).json({
      id: newImage.id,
      url: newImage.url,
      preview: newImage.preview
    });
  } 
);


//CREATE A REVIEW FOR A SPOT BASED ON SPOTID
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
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

//GET ALL REVIEWS BY A SPOTS ID
router.get('/:spotId/reviews', requireAuth, async (req, res) => {
  const { spotId } = req.params;
   const spot = await Spot.findByPk(spotId)
   
   if (!spot) {
    return res.status(404).json({
      message: "Spot not found."
    });
   }
    const reviews = await Review.findAll({
      where: { spotId },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        },
        {
          model: ReviewImage,
          attributes: ['id', 'url'],
        }
      ]
    });
    return res.status(200).json({ Reviews: reviews });
}); 

module.exports = router;
