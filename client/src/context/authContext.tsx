import { createContext, useReducer, ReactNode } from "react";

interface User {
  id: string;
  email: string;
}

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

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};
