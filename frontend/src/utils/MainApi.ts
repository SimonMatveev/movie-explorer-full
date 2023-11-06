import { IMoviesApiPrors, ISignup, ISignin, IPatchMe, ISavedMoviesData, ISavedMovieData, IUserData, ISignupData, ISigninData, ISignoutData, TMovieSavedInput } from "../types/types";
import { BASE_URL_FRONT } from "./constants";
import { testData } from "./functions";

interface IMainApiPros extends IMoviesApiPrors {
  options: {
    [key: string]: string
  }
}

function MainApi({ baseUrl, headers, options }: IMainApiPros) {

  const getMovies = () => fetch(`${baseUrl}/movies`, {
    method: 'GET',
    headers,
    ...options,
  })
    .then(res => testData<ISavedMoviesData>(res));

  const addMovie = (movie: TMovieSavedInput) => fetch(`${baseUrl}/movies`, {
    method: 'POST',
    headers,
    body: JSON.stringify(movie),
    ...options,
  })
    .then(res => testData<ISavedMovieData>(res));

  const deleteMovie = (movieId: string) => fetch(`${baseUrl}/movies/${movieId}`, {
    method: 'DELETE',
    headers,
    ...options,
  })
    .then(res => testData<ISavedMovieData>(res));

  const getMe = () => fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers,
    ...options,
  })
    .then(res => testData<IUserData>(res));

  const patchMe = ({ name, email }: IPatchMe) => fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: { ...headers },
    body: JSON.stringify({ name, email }),
    ...options,
  })
    .then(res => testData<IUserData>(res));

  const signup = ({ name, email, password }: ISignup) => fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ name, email, password }),
    ...options,
  })
    .then(res => testData<ISignupData>(res));

  const signin = ({ email, password }: ISignin) => fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password }),
    ...options,
  })
    .then(res => testData<ISigninData>(res));

  const signout = () => fetch(`${baseUrl}/signout`, {
    method: 'POST',
    headers,
    ...options,
  })
    .then(res => testData<ISignoutData>(res));

  return { getMovies, addMovie, deleteMovie, getMe, patchMe, signup, signin, signout, }
}

const requestHeaders: HeadersInit = new Headers();
requestHeaders.set('Content-Type', 'application/json');

const mainApi = MainApi({
  baseUrl: BASE_URL_FRONT,
  headers: requestHeaders,
  options: {
    credentials: 'include',
  },
});

export default mainApi;