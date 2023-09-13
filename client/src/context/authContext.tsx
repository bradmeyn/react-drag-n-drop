import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import { User } from "../types/types";

type AuthState = {
  user: User | null;
};

type AuthAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

export const AuthContext = createContext<AuthState | undefined>(undefined);
export const AuthDispatchContext = createContext<
  React.Dispatch<AuthAction> | undefined
>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  // // Load user from local storage when the component mounts
  // useEffect(() => {
  //   const user = localStorage.getItem("user");

  //   if (user) {
  //     dispatch({ type: "LOGIN", payload: JSON.parse(user) });
  //   }
  // }, []);

  // // Save user to local storage whenever it changes
  // useEffect(() => {
  //   if (state.user) {
  //     localStorage.setItem("user", JSON.stringify(state.user));
  //   } else {
  //     localStorage.removeItem("user");
  //   }
  // }, [state.user]);

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};
