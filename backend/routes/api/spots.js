const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');

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
    
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        return res.status(404).json({
            // title: "Resource Not Found",
            message: "Spot not found.",
            // errors: { message: "The requested resource couldn't be found." }
        });
    }
    return res.json(spot);
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
        message: "Spot not found."
      });
    }

    if (spot.ownerId !== user.id) {
      return res.status(403).json({
        message: "Forbidden"
      });
    }


    await spot.destroy();

    return res.status(200).json({
      message: "Spot deleted"
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
  const { Op } = require('sequelize');

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
module.exports = router;
