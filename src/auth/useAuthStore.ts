import { create } from "zustand";
interface AuthInfo {
  auth_token: string;
  try_invalid_op: boolean;
  isAdmin: boolean;
  isUser: boolean;
  password: string;
}
interface AuthStoreProp {
  authinfo: AuthInfo;
  setAuth: (authinfo: AuthInfo) => void;
  setInvalidOp: (try_invalid_op: boolean) => void;
  setAdmin: (isAdmin: boolean) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthStoreProp>((set) => ({
  authinfo: {
    auth_token: "",
    try_invalid_op: false,
    password: "",
    isAdmin: false,
    isUser: false,
  },
  setAuth: (authinfo: AuthInfo) => set((state) => ({ ...state, authinfo })),
  clearAuth: () =>
    set((state) => ({
      ...state,
      authinfo: {
        auth_token: "",
        password: "",
        try_invalid_op: false,
        isAdmin: false,
        isUser: false,
      },
    })),
  setInvalidOp: (isInvalid: boolean) =>
    set((state) => ({
      ...state,
      authinfo: { ...state.authinfo, try_invalid_op: isInvalid },
    })),
  setAdmin: (isAdmin: boolean) =>
    set((state) => ({
      ...state,
      authinfo: { ...state.authinfo, isAdmin: isAdmin },
    })),
}));
export default useAuthStore;
