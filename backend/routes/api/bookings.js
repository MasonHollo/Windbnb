const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Booking, Spot, User } = require('../../db/models');

const router = express.Router();


router.get('/current', requireAuth, async (req, res, next) => {
  try{
  const bookings = await Booking.findAll({
    where: { userId: req.user.id },
    include: {
      model: Spot,
      attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
    }
  });

  res.json({ Bookings: bookings });
}catch (error) {
  return res.status(500).json({ message: 'Something went wrong', error: error.message });
}
});

//
router.post('/:spotId', requireAuth, async (req, res) => {
  try{
  const { spotId } = req.params;
  const { startDate, endDate } = req.body;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  if (spot.ownerId === req.user.id) {
    return res.status(403).json({ message: "You cannot book your own spot" });
  }

  const newBooking = await Booking.create({
    spotId,
    userId: req.user.id,
    startDate,
    endDate
  });

  return res.status(201).json(newBooking);
}catch (error) {
  return res.status(500).json({ message: 'Something went wrong', error: error.message });
}
});

router.put('/:bookingId', requireAuth, async (req, res) => {
  try{
  const { bookingId } = req.params;
  const { startDate, endDate } = req.body;

  const booking = await Booking.findByPk(bookingId);
  if (!booking) {
    return res.status(404).json({ message: "Booking couldn't be found" });
  }

  if (booking.userId !== req.user.id) {
    return res.status(403).json({ message: "You are not authorized to edit this booking" });
  }

  await booking.update({ startDate, endDate });

  return res.json(booking);
}catch (error) {
  return res.status(500).json({ message: 'Something went wrong', error: error.message });
}
});

router.delete('/:bookingId', requireAuth, async (req, res) => {
  try{
  const { bookingId } = req.params;

  const booking = await Booking.findByPk(bookingId);
  if (!booking) {
    return res.status(404).json({ message: "Booking couldn't be found" });
  }

  if (booking.userId !== req.user.id) {
    return res.status(403).json({ message: "You are not authorized to delete this booking" });
  }

  await booking.destroy();

  return res.json({ message: "Successfully deleted" });
}catch (error) {
  return res.status(500).json({ message: 'Something went wrong', error: error.message });
}
});

module.exports = router;







/*
1. Get all spots.           Needs to return 
   M: GET             ----> numOfReviews & 
   R: /api/spots            avgStarRating
                            
2. Get all spots owned by current user.
   M: GET             ----> Needs to return avgRating 
   R: /api/spots/current      & previewImage

3. Get details of a spot from spotId   
   M: GET
   R: /

   */  