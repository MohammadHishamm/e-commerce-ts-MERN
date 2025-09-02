import { createContext, useContext } from "react";

interface authContextType {
  username: string | null;
  token: string | null;
  login: (username: string, token: string) => void;
  isAuth: boolean;
}

export const AuthContext = createContext<authContextType>({
  username: null,
  token: null,
  login: () => {},
  isAuth: false,
});

export const useAuth = () => useContext(AuthContext);
