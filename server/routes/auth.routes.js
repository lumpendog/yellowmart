const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const tokenService = require('../services/token.service');
const User = require('../models/User');
const { generateDefaultUserData } = require('../utils/helpers');
const constants = require('../utils/constants');
const router = express.Router({ mergeParams: true });

const SALT_ROUNDS = constants.BCRYPT_SALT_ROUNDS;

const signUpValidators = [
  check('email', 'Invalid email').isEmail(),
  check('password', 'Password length >= 8').isLength({
    min: 8
  })
];

router.post('/signUp', [
  ...signUpValidators,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'INVALID_DATA',
            code: 400
          }
        });
      }

      const { email, password } = req.body;

      const userExists = await User.findOne({ email });

      if (userExists) {
        return res
          .status(400)
          .json({ error: { message: 'EMAIL_EXISTS', status: 400 } });
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const newUser = await User.create({
        ...req.body,
        ...generateDefaultUserData(),
        password: hashedPassword
      });

      const tokens = tokenService.generateTokens({ _id: newUser._id });
      await tokenService.save(newUser._id, tokens.refreshToken);

      res.status(200).send({ ...tokens, userId: newUser._id });
    } catch (e) {
      res.status(500).json({
        message: 'There is an error on server. Please try again later'
      });
    }
  }
]);

const signInValidators = [
  check('email', 'Invalid email').normalizeEmail().isEmail(),
  check('password', 'Need password').exists()
];

router.post('/signInWithPassword', [
  ...signInValidators,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ error: { message: 'INVALID_DATA', code: 400 } });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(401)
          .json({ error: { message: 'EMAIL_NOT_FOUND', code: 401 } });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res
          .status(401)
          .json({ error: { message: 'WRONG_PASSWORD', code: 401 } });
      }

      const tokens = tokenService.generateTokens({ _id: user._id });
      await tokenService.save(user._id, tokens.refreshToken);

      res.status(200).send({ ...tokens, userId: user._id });
    } catch (e) {
      res.status(500).json({
        message: 'There is an error on server. Please try again later'
      });
    }
  }
]);

router.post('/token', async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;

    const data = tokenService.validateRefreshToken(refreshToken);

    const token = await tokenService.findToken(refreshToken);

    const isTokenInvalid = () =>
      !data || !token || data?._id !== token?.userId?.toString();

    if (isTokenInvalid()) {
      return res
        .status(401)
        .json({ error: { message: 'INVALID_REFRESH_TOKEN', code: 401 } });
    }

    const tokens = tokenService.generateTokens({ _id: data._id });
    await tokenService.save(data._id, tokens.refreshToken);

    res.status(200).send({ ...tokens, userId: data._id });
  } catch (e) {
    res.status(500).json({
      message: 'There is an error on server. Please try again later'
    });
  }
});

module.exports = router;
