import { FC, useContext } from 'react';
import { BASE_URL } from '../../utils/constants';
import './movie.css';
import { SavedMoviesContext } from '../../contexts/savedMoviesContext';
import { IMovieBit, IMovieSaved, TMovieAll } from '../../types/types';
interface IMovieProps {
  movie: TMovieAll;
  onSaved: boolean;
  onClick: ((movie: IMovieSaved) => void) | ((movie: IMovieBit) => void);
}

const Movie: FC<IMovieProps> = ({ movie, onSaved, onClick }) => {
  const savedMovies = useContext(SavedMoviesContext);
  const isSaved = savedMovies.some(item => item.movieId === movie.id);

  let btnType;
  if (onSaved) {
    btnType = ' movie__btn_t_delete';
  } else {
    if (isSaved) {
      btnType = ' movie__btn_t_saved';
    } else {
      btnType = ' movie__btn_t_save';
    }
  }

  const durationConverted = movie.duration > 60 ? `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м` : `${movie.duration}м`;

  const handleClick = () => {
    onClick(movie as IMovieSaved & IMovieBit);
  }

  return (
    <article className='movie'>
      <img className='movie__img' src={!onSaved && typeof movie.image !== 'string' ? `${BASE_URL}${movie.image.url}` : movie.image as string} alt={movie.nameRU} />
      <div className='movie__text'>
        <p className='movie__title'>{movie.nameRU}</p>
        <p className='movie__duration'>{durationConverted}</p>
      </div>
      <button type='button' className={`movie__btn${btnType}`} onClick={handleClick}>{!isSaved && !onSaved ? 'Сохранить' : ''}</button>
    </article>
  );
}

export default Movie;
