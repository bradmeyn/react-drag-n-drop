import { createContext, useReducer } from "react";
import { Card } from "../types";
import { homeCards } from "../homeCards";

type CardAction =
  | { type: "ADD_CARD"; payload: Card }
  | { type: "REMOVE_CARD"; payload: string }
  | { type: "UPDATE_CARDS"; payload: Card[] }
  | { type: "UPDATE_CARD"; payload: Card };

type ProviderProps = {
  children: React.ReactNode;
};

export const HomeContext = createContext<Card[]>(homeCards);
export const HomeDispatchContext =
  createContext<React.Dispatch<CardAction> | null>(null);

export const HomeProvider = ({ children }: ProviderProps) => {
  const [cards, dispatch] = useReducer(cardsReducer, homeCards);

  return (
    <HomeContext.Provider value={cards}>
      <HomeDispatchContext.Provider value={dispatch}>
        {children}
      </HomeDispatchContext.Provider>
    </HomeContext.Provider>
  );
};

const cardsReducer = (state: Card[], action: CardAction) => {
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
