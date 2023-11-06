import { createContext } from "react";
import { IPatchMe, IUserData } from "../types/types";

export const CurrentUserContext = createContext<IPatchMe | null>(null);