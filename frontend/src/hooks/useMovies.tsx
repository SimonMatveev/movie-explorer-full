import { useState, useEffect } from 'react';
import { SHORTS_LENGHT } from '../utils/constants';
import { TMovieAll } from '../types/types';

interface IUseMoviesProps {
  getAllMovies: () => void;
  movies: TMovieAll[];
  name: string;
  needsSaving: boolean;
}

const useMovies = ({ getAllMovies, movies, name, needsSaving }: IUseMoviesProps) => {
  const [searchInput, setSearchInput] = useState<string>(
    localStorage.getItem(`searchInput-${name}`) || ''
  );
  const [isShortsChecked, setIsShortsChecked] = useState<boolean>(
    JSON.parse(localStorage.getItem(`shorts-${name}`) as string) || false
  );
  const [searchedMovies, setSearchedMovies] = useState<TMovieAll[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchMovies = () => {
    if (needsSaving) localStorage.setItem(`searchInput-${name}`, searchInput);
    const regExp = new RegExp(searchInput.toLowerCase());
    setSearchedMovies(
      movies.filter((movie) => {
        if (isShortsChecked && movie.duration > SHORTS_LENGHT) return false;
        return (
          regExp.test(movie.nameEN.toLowerCase()) ||
          regExp.test(movie.nameRU.toLowerCase())
        );
      })
    );
  };

  const startSearch = () => {
    if (movies.length === 0) {
      getAllMovies();
    } else setIsSearching(true);
  };

  useEffect(() => {
    if (movies.length > 0) startSearch();
  }, [movies]);

  useEffect(() => {
    if (isSearching === true) {
      setIsSearching(false);
      searchMovies();
    }
  }, [isSearching]);

  useEffect(() => {
    localStorage.setItem(`shorts-${name}`, JSON.stringify(isShortsChecked));
    if (searchInput.length > 0 || movies.length > 0) startSearch();
  }, [isShortsChecked]);

  return {
    searchInput,
    setSearchInput,
    isShortsChecked,
    setIsShortsChecked,
    startSearch,
    searchedMovies,
    setSearchedMovies,
    isSearching,
  };
};

export default useMovies;
