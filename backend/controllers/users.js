const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const DataError = require('../errors/DataError');
const { JWT_SECRET_DEV } = require('../utils/config');
const {
  GET_USER_ERR,
  CREATE_USER_ERR,
  PATCH_USER_ERR,
  LOGOUT_MSG,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

function getCurrentUser(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataError(GET_USER_ERR));
      } else next(err);
    });
}

function createUser(req, res, next) {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        email,
        password: hash,
      })
    )
    .then((user) =>
      res.status(201).send({
        data: {
          name: user.name,
          email: user.email,
        },
      })
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError(CREATE_USER_ERR));
      } else next(err);
    });
}

function updateUser(req, res, next) {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError(PATCH_USER_ERR));
      } else next(err);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.send({
        data: {
          name: user.name,
          email: user.email,
          _id: user._id,
        },
      });
    })
    .catch(next);
}

function logout(req, res, next) {
  try {
    res.clearCookie('jwt');
    res.send({ message: LOGOUT_MSG });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getCurrentUser,
  createUser,
  updateUser,
  login,
  logout,
};
