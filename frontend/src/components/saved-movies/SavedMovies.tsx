import './saved-movies.css';
import SearchBar from '../search-bar/searchBar';
import Cards from '../cards/Cards';
import { FC, useContext, useEffect, useState } from 'react';
import { SavedMoviesContext } from '../../contexts/savedMoviesContext';
import useMovies from '../../hooks/useMovies';
import { NAMES } from '../../utils/constants';
import { IMovieSaved, TMovieAll } from '../../types/types';

interface ISavedMoviesProps {
  handleMovie: ((movie: IMovieSaved) => void)
}

const SavedMovies: FC<ISavedMoviesProps> = ({ handleMovie }) => {
  const savedMovies = useContext<IMovieSaved[]>(SavedMoviesContext);
  const [movies, setMovies] = useState<TMovieAll[]>([]);
  const {
    searchInput,
    setSearchInput,
    isShortsChecked,
    setIsShortsChecked,
    startSearch,
    searchedMovies,
    setSearchedMovies,
  } = useMovies({ getAllMovies, movies, name: NAMES[1], needsSaving: false, })

  function getAllMovies() {
    setMovies(savedMovies);
  };

  useEffect(() => {
    getAllMovies();
    if (savedMovies.length === 0) setSearchedMovies([]);

  }, [savedMovies])

  return (
    <section className='saved-movies'>
      <div className='saved-movies__container'>
        <SearchBar value={searchInput} setValue={setSearchInput} isShortsChecked={isShortsChecked} setIsShortsChecked={setIsShortsChecked} searchMovies={startSearch} />
        <Cards allMoviesLength={movies.length} handleMovie={handleMovie} moviesToRender={searchedMovies} />
      </div>
    </section>
  );
}

export default SavedMovies;
