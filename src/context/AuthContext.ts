import { createContext } from "react";
import UserFrontend from "@/types/UserFrontend";

interface AuthContext {
  user: UserFrontend | null;
}

const AuthContext = createContext<AuthContext>({
  user: null,
});

export default AuthContext;
