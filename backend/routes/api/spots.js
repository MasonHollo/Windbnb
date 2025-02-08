const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Review, Spot, SpotImage, User, ReviewImage } = require('../../db/models');
const { Op } = require('sequelize');

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
    .withMessage('Name must be less than 50 characters')
    .withMessage('Name is required'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .isFloat({ min: 0 })
    .withMessage('Price per day must be a positive number'),
  handleValidationErrors
];

const validateReview = [
  check('review')
  .exists({ checkFalsy: true })
  .withMessage("Review text is required"),
check('stars')
  .isFloat({ min: 1, max:5 })
  .withMessage("Stars must be an integer from 1 to 5"),
handleValidationErrors

]

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
  try {
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
        message: "Spot couldn't be found"
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

  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});


//GET ALL SPOTS
router.get('/', async (req, res) => {
  try {
    const spots = await Spot.findAll(({
      attributes: {
        include: [
          [
            Sequelize.fn('COUNT', Sequelize.col('Reviews.id')),
            'numOfReviews'
          ],
          [
            Sequelize.fn('AVG', Sequelize.col('Reviews.stars')),
            'avgStarRating'
          ]
        ]
      },
      include: [
        {
          model: Review,
          attributes: [],
        }
      ]
    }));
    
    res.status(200).json({ Spots: spots,numOfReviews,avgStarRating });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});


//CREATE A SPOT
router.post('/', requireAuth, validateSpot, async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
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


router.get('/', async (req, res) => {

  try {
  const { minLat, maxLat, minLng, maxLng, minPrice, maxPrice, page, size } = req.query;

  page = parseInt(page);
  size = parseInt(size);

  if (Number.isNaN(page)) page = 1;
  if (Number.isNaN(size)) size = 20;

  const query = {};

  if (minLat !== undefined) {
    query.lat = { [Op.gte]: minLat };
  }
  if (maxLat !== undefined) {
    query.lat = { [Op.lte]: maxLat };
  }

  if (minLng !== undefined) {
    query.lat = { [Op.gte]: minLng };
  }
  if (maxLng !== undefined) {
    query.lat = { [Op.lte]: maxLng};
  }
  if (minPrice !== undefined) {
    query.price = { [Op.gte]: minPrice };
  }
  if (maxPrice !== undefined) {
    query.price = { [Op.lte]: maxPrice };
  }

  const spots = await Spot.findAll({
    where: query,
    limit: size,
    offset: (page - 1) * size
  });

  res.json({ Spots: spots, page, size });

} catch (error) {
  return res.status(500).json({ 
    message: "Something went wrong", 
    error: error.message });
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
  try {
    const { spotId } = req.params;
    const { url, preview, userId } = req.body;
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
      preview,
      userId
    });

    return res.status(200).json({
      id: newImage.id,
      url: newImage.url,
      preview: newImage.preview,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});


//CREATE A REVIEW FOR A SPOT BASED ON SPOTID
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
  try {
    const { spotId } = req.params;
    const { review, stars } = req.body;

    const spot = await Spot.findByPk(spotId)

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found"
      });
    }

    const reviews = await Review.findOne({
      where: {
        userId: req.user.id,
        spotId: spot.id
      }
    });

    if (reviews) {
      return res.status(400).json({
        message: "User already has a review for this spot"
      });
    }

    const newReview = await Review.create({
      userId: req.user.id,
      spotId,
      review,
      stars
    });

    return res.status(201).json(newReview);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

//GET ALL REVIEWS BY A SPOTS ID
router.get('/:spotId/reviews', async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});



module.exports = router;
