import { createContext } from "react";
import { IMovieSaved } from "../types/types";

export const SavedMoviesContext = createContext<IMovieSaved[]>([]);