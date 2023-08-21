import { createContext } from "react";
import { Card } from "../types/types";
import { testCards } from "./../api/data";
import { CardAction } from "./../reducers/homeReducer";

export const HomeContext = createContext<Card[]>(testCards);
export const HomeDispatchContext =
  createContext<React.Dispatch<CardAction> | null>(null);
