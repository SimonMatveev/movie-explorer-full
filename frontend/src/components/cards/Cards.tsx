import { FC } from 'react';
import { useLocation } from 'react-router';
import { IMovieBit, IMovieSaved, TMovieAll } from '../../types/types';
import Movie from '../movie/Movie';
import './cards.css';

interface ICardsProps {
  allMoviesLength: number;
  searchedMoviesLength?: number;
  moviesToRender: TMovieAll[];
  handleMovie: ((movie: IMovieSaved) => void) | ((movie: IMovieBit) => void);
  addMore?: () => void;
}

const Cards: FC<ICardsProps> = ({
  allMoviesLength,
  searchedMoviesLength,
  moviesToRender,
  handleMovie,
  addMore,
}) => {
  const location = useLocation();
  const onSaved = location.pathname === '/saved-movies';
  const isMoreLeft = !onSaved ? searchedMoviesLength! > moviesToRender.length : null;
  const notSearchedYet = moviesToRender.length === 0 && allMoviesLength === 0;

  return !notSearchedYet ? (
    <>
      <div className='cards'>
        {moviesToRender.length !== 0 ? (
          <>
            {moviesToRender.map((movie) => (
              <Movie
                key={!onSaved ? movie.id : movie._id}
                movie={movie}
                onSaved={onSaved}
                onClick={handleMovie}
              />
            ))}
          </>
        ) : (
          <div className='cards__not-found'>
            <p className='cards__not-found-text'>Ничего не найдено</p>
          </div>
        )}
      </div>
      {isMoreLeft && (
        <button type='button' className='cards__more' onClick={addMore}>
          Ещё
        </button>
      )}
    </>
  ) : (
    <></>
  );
};

export default Cards;
