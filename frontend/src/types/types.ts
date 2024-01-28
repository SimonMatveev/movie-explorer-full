export type Data = {
  data: object;
};

export interface IMoviesApiPrors {
  baseUrl: string;
  headers: Headers;
}

interface IMovie {
  nameRU: string;
  nameEN: string;
  country: string;
  director: string;
  duration: number;
  year: string;
  description: string;
  trailerLink: string;
  thumbnail: string;
}

export interface IMovieBit extends IMovie {
  readonly id: string;
  readonly _id: never;
  image: {
    url: string;
    formats: {
      thumbnail: {
        url: string;
      };
    };
  };
}

export interface IMovieSaved extends IMovie {
  readonly id: never;
  readonly _id: string;
  image: string;
  movieId: string;
}

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type TMovieSavedInput = Optional<IMovieSaved, '_id' | 'id'>;

export type TMovieAll = IMovieBit | IMovieSaved;

export interface IPatchMe {
  name: string;
  email: string;
}

export interface ISignup extends IPatchMe {
  password: string;
}
export interface ISignin extends Omit<ISignup, 'name'> {}

export interface IUserData {
  data: IPatchMe;
}

export interface ISavedMoviesData {
  data: IMovieSaved[];
}

export interface ISavedMovieData {
  data: IMovieSaved;
}

export interface ISignupData {
  data: ISignup;
}

export interface ISigninData {
  data: ISignin;
}

export interface ISignoutData {
  data: {
    message: string;
  };
}

export enum EInputType {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
}

export interface IAuthInput {
  name: string;
  nameText: string;
  type: EInputType;
  options?: object;
}
