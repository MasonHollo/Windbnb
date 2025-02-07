// backend/routes/api/session.js
//EXPRESS IMPORTS
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

//Security Imports
const { setTokenCookie, restoreUser } = require('../../utils/auth');
//Utilities
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//Sequlize Imports
const { User } = require('../../db/models');

const router = express.Router();


//Protections for login data
const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
  ];

// Log in
router.post('/', validateLogin, async (req, res, next) => {
  try{
      const { credential, password } = req.body;
  
      const user = await User.unscoped().findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
  
      if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials were invalid.' };
        return next(err); 
      }
  
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.json({
        user: safeUser
      });
    }catch (error) {
      return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
    });


// Log out
router.delete('/', (_req, res) => {
  try{
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
}
);


// Restore session user
router.get('/', (req, res) => {
  try{
    const { user } = req;
    if (user) {
        const safeUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
        };
        return res.json({
            user: safeUser
        });
    } else return res.json({ user: null });
  }catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
}
);

module.exports = router;