const express = require('express');
const router = express.Router();
const got = require('got');
const { query, validationResult } = require('express-validator');
require('dotenv').config();

// 34.76985711209172, 32.42820350617798
router.get(
  '/',
  [query('lat').isNumeric(), query('lon').isNumeric()],
  (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  async (req, res, next) => {
    const { lat, lon } = req.query;

    //   // Заглушка
    // const lat = 34.76985711209172;
    // const lon =32.42820350617798;
    // ///////////////////////////

    try {
      const response = await got(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          searchParams: {
            lat,
            lon,
            appid: process.env.API_KEY,
          },
        }
      );

      const {
        weather: [weather],
        wind,
        name,
        sys: { country },
      } = JSON.parse(response.body);
      res.json({
        country,
        name,
        weather,
        wind,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

// parser: '@babel/eslint-parser',
// requireConfigFile: false,
