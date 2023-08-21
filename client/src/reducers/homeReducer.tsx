import React, { createContext, useReducer, useState } from "react";
import { testCards } from "../api/data";
import { Card } from "../types/types";
import { HomeContext, HomeDispatchContext } from "../context/homeContext";

type ProviderProps = {
  children: React.ReactNode;
};

export type CardAction =
  | { type: "ADD_CARD"; payload: Card }
  | { type: "REMOVE_CARD"; payload: string }
  | { type: "UPDATE_CARDS"; payload: Card[] }
  | { type: "UPDATE_CARD"; payload: Card };

export default function HomeProvider({ children }: ProviderProps) {
  const [cards, dispatch] = useReducer(cardsReducer, testCards);

  return (
    <HomeContext.Provider value={cards}>
      <HomeDispatchContext.Provider value={dispatch}>
        {children}
      </HomeDispatchContext.Provider>
    </HomeContext.Provider>
  );
}

export const cardsReducer = (state: Card[], action: CardAction) => {
  switch (action.type) {
    case "ADD_CARD":
      return [...state, action.payload];

    case "REMOVE_CARD":
      return state.filter((card) => card.id !== action.payload);

    case "UPDATE_CARDS":
      return action.payload;

    case "UPDATE_CARD":
      return state.map((card) =>
        card.id === action.payload.id ? action.payload : card
      );
    default:
      return state;
  }
};
