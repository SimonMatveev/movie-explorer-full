import './movies.css';
import SearchBar from '../search-bar/searchBar';
import Cards from '../cards/Cards';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import Preloader from '../preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';
import useResize from '../../hooks/useResize';
import useMovies from '../../hooks/useMovies';
import { NAMES } from '../../utils/constants';
import { IMovieBit } from '../../types/types';

interface IMoviesProps {
  handleMovie: ((movie: IMovieBit) => void);
  movies: IMovieBit[];
  setMovies: Dispatch<SetStateAction<IMovieBit[]>>
}

const Movies: FC<IMoviesProps> = ({ handleMovie, movies, setMovies }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const {
    searchInput,
    setSearchInput,
    isShortsChecked,
    setIsShortsChecked,
    startSearch,
    searchedMovies,
    isSearching,
  } = useMovies({ getAllMovies, movies, name: NAMES[0], needsSaving: true, })
  const { moviesToRender, addMore } = useResize({ movies: searchedMovies, isSearching });

  function getAllMovies() {
    setIsError(false);
    setIsLoading(true);
    moviesApi.getMovies()
      .then(res => setMovies(res))
      .catch(err => {
        setIsError(true);
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <section className='movies'>
      <div className='movies__container'>
        <SearchBar value={searchInput} setValue={setSearchInput} isShortsChecked={isShortsChecked} setIsShortsChecked={setIsShortsChecked} searchMovies={startSearch} />
        {isLoading ?
          <Preloader /> :
          isError ?
            <div className='movies__error'>
              <p className='movies__error-text'>
                Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.<br />Подождите немного и попробуйте ещё раз
              </p>
            </div> :
            <Cards allMoviesLength={movies.length} searchedMoviesLength={searchedMovies.length} handleMovie={handleMovie} addMore={addMore} moviesToRender={moviesToRender} />
        }
      </div>
    </section>
  );
}

export default Movies;
