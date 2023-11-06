import { IMovieBit, IMoviesApiPrors } from "../types/types";
import { BASE_URL } from "./constants";
import { testData } from "./functions";

function MoviesApi({ baseUrl, headers, }: IMoviesApiPrors) {

  const getMovies = () => {
    return fetch(baseUrl, {
      method: 'GET',
      headers: { ...headers }
    })
      .then(res => testData<IMovieBit[]>(res));
  }

  return { getMovies };
}

const requestHeaders: HeadersInit = new Headers();
requestHeaders.set('Content-Type', 'application/json');

const moviesApi = MoviesApi({
  baseUrl: `${BASE_URL}/beatfilm-movies`,
  headers: requestHeaders,
});

export default moviesApi;