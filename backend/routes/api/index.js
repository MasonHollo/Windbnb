
//Express Imports
const router = require('express').Router();
//place in express imports
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');

//Sequelize Imports
const { User } = require('../../db/models');


//Middleware Imports
const { setTokenCookie } = require('../../utils/auth.js');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');

//Middleware
router.use(restoreUser);

//routes for api (place under middlewares)

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/spots', spotsRouter);

// Keep this route to test frontend setup in Mod 5
router.post('/test', function (req, res) {
  res.json({ requestBody: req.body });
});


//Routes
router.post('/test', function (req, res) {
  res.json({ requestBody: req.body });
});

// GET /api/set-token-cookie
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

// GET /api/restore-user
router.get('/restore-user', (req, res) => {
  return res.json(req.user);
}
);

// GET /api/require-auth
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

// // POST /spot/:id/images

// router.post('/api/spots/:spotId/images', async(req, res, next) => {

//   const { id } = req.params;
//   const { url, preview } = req.body;

//   const spot =  await Spot.findByPk(id);

//   //[]'Error response with status 404 is given when a spot does not exist with the provided id'
//   if (!spot) {
//     return res.status(404).json({ message: 'Spot not found' });
//   }

//   //[]'Only the owner of the spot is authorized to add an image'
//   if (spot.ownerId !== req.user.id) {
//     return res.status(403).json({ message: 'You are not authorized to add images to this spot' });
//   }

//   //[]'New image exists in the database after request'
//   const image = Image.create({
//     url,
//     previewImage: preview,
//     spotId: spot.id
//   });

//   //[]'Image data returned includes the id, url, and preview'
//   return res.status(200).json({
//     id: image.id,
//     url: image.url,
//     previewImage: image.previewImage
//   });
// });



module.exports = router;



