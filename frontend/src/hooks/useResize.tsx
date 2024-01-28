import { useEffect, useState } from 'react';
import {
  AMOUNT_TO_ADD_L,
  AMOUNT_TO_ADD_M,
  AMOUNT_TO_ADD_S,
  BASE_AMOUNT_L,
  BASE_AMOUNT_M,
  BASE_AMOUNT_S,
  WIDTH_BIG,
  WIDTH_SMALL,
} from '../utils/constants';
import { TMovieAll } from '../types/types';

interface IUseResizeProps {
  movies: TMovieAll[];
  isSearching: boolean;
}

interface IConfig {
  baseAmount: number;
  amountToAdd: number;
}

const useResize = ({ movies, isSearching }: IUseResizeProps) => {
  const [moviesToRender, setMoviesToRender] = useState<TMovieAll[]>([]);
  const [width, setWidth] = useState(0);
  const [config, setConfig] = useState<IConfig>({
    baseAmount: BASE_AMOUNT_L,
    amountToAdd: AMOUNT_TO_ADD_L,
  });

  const getWidth = () => setWidth(window.screen.width);

  const addMore = () =>
    setConfig((prev) => {
      return { ...prev, baseAmount: (prev.baseAmount += prev.amountToAdd) };
    });

  useEffect(() => {
    getWidth();
    window.addEventListener('resize', getWidth);
    return () => window.removeEventListener('resize', getWidth);
  });

  const resetConfig = () => {
    if (width >= WIDTH_BIG) {
      setConfig({ baseAmount: BASE_AMOUNT_L, amountToAdd: AMOUNT_TO_ADD_L });
    } else if (width < WIDTH_BIG && width >= WIDTH_SMALL) {
      setConfig({ baseAmount: BASE_AMOUNT_M, amountToAdd: AMOUNT_TO_ADD_M });
    } else if (width < WIDTH_SMALL) {
      setConfig({ baseAmount: BASE_AMOUNT_S, amountToAdd: AMOUNT_TO_ADD_S });
    }
  };

  useEffect(() => {
    resetConfig();
  }, [width]);

  useEffect(() => {
    setMoviesToRender(movies.slice(0, config.baseAmount));
  }, [config, movies]);

  useEffect(() => {
    if (isSearching) {
      resetConfig();
    }
  }, [isSearching]);

  return {
    moviesToRender,
    addMore,
  };
};

export default useResize;
