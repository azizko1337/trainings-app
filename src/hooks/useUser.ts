import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useLocalStorage } from "./useLocalStorage";
import UserFrontend from "@/types/UserFrontend";

export const useUser = () => {
  const { user } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  const addUser = (user: UserFrontend) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    setItem("user", "");
  };

  return { user, addUser, removeUser };
};
