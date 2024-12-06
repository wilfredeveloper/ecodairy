import { createStore } from "zustand/vanilla";
import Cookies from "js-cookie";

export type UserState = {
  user: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    subscriptionStatus: string;
    streak: number;
  } | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
};

export type UserActions = {
  login: (
    userData: UserState["user"],
    accessToken: string,
    refreshToken: string
  ) => void;
  logout: () => void;
  getAccessToken: () => string | null;
};

export type UserStore = UserState & UserActions;

export const defaultUserState: UserState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
};

export const createUserStore = (initialState: UserState = defaultUserState) => {
  return createStore<UserStore>()((set) => ({
    ...initialState,
    login: (userData, accessToken, refreshToken) => {
      // Set the access token in cookies for middleware
      Cookies.set("accessToken", accessToken, { 
        expires: 7, // expires in 7 days
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      });

      set({ 
        user: userData, 
        isAuthenticated: true, 
        accessToken, 
        refreshToken 
      });
    },
    logout: () => {
      Cookies.remove("accessToken");
      set({
        user: null,
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
      });
    },
    getAccessToken: () => Cookies.get("accessToken") || null,
  }));
};