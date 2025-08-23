
import { createContext } from "react";

export type UsersDetail = {
  name: string;
  email: string;
  credits: number;
};

type UserDetailContextType = {
  userDetail: UsersDetail | null;
  setUserDetail: (user: UsersDetail | null) => void;
};

export const UserDetailContext = createContext<UserDetailContextType | undefined>(undefined);
