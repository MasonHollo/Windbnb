//IMPORTS
const express = require('express');
require('express-async-errors');
const routes = require('./routes');

//SECURITY IMPORTS
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');

//UTILITY IMPORTS
const cookieParser = require('cookie-parser');
const { environment } = require('./config');


const isProduction = environment === 'production';

//EXPRESS APPLICATION
const app = express();

//MIDDLEWARES
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
  app.use(cors());
}

app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

// ------------MIDDLEWARES MUST BE USED ABOVE THIS -------------

//ROUTES!!!
app.use(routes); 

module.exports = app;