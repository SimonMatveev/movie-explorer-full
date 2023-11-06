const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const DelError = require('../errors/DelError');
const DataError = require('../errors/DataError');
const {
  ADD_MOVIE_ERR,
  DEL_MOVIE_NOT_OWN_ERR,
  DEL_MOVIE_NOT_FOUND_ERR,
  DEL_MOVIE_VALIDATION_ERR,
  DEL_MOVIE_WRONG_ID_ERR,
} = require('../utils/constants');

function getMovies(req, res, next) {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
}

function addMovie(req, res, next) {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.status(201).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError(ADD_MOVIE_ERR));
      } else {
        next(err);
      }
    });
}

function deleteMovie(req, res, next) {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) throw new NotFoundError(DEL_MOVIE_NOT_FOUND_ERR);
      if (movie.owner.toString() !== req.user._id) throw new DelError(DEL_MOVIE_NOT_OWN_ERR);
      return Movie.deleteOne(movie)
        .then(() => {
          res.send({ data: movie });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError(DEL_MOVIE_VALIDATION_ERR));
      } else if (err.name === 'CastError') {
        next(new DataError(DEL_MOVIE_WRONG_ID_ERR));
      } else next(err);
    });
}

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
