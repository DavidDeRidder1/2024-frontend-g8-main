import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
  useEffect,
} from "react";
import useSWRMutation from "swr/mutation";
import * as api from "../api";
import { jwtDecode } from "jwt-decode";

const JWT_TOKEN_KEY = "jwtToken";
const USER_ID_KEY = "userId";
import { useSWRConfig } from "swr";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem(USER_ID_KEY))
  );

  const [ready, setReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(Boolean(token));

  const { mutate } = useSWRConfig();
  const clearCache = () => mutate(() => true, undefined, { revalidate: false });

  useEffect(() => {
    setReady(true);
    api.setAuthToken(token);
    setIsAuthed(Boolean(token));
  }, [token]);

  const {
    isMutating: loginLoading,
    error: loginError,
    trigger: doLogin,
  } = useSWRMutation("users/login", api.post);

  const {
    isMutating: logoutLoading,
    error: logoutError,
    trigger: doLogout,
  } = useSWRMutation("users/logout", api.put);

  const setSession = useCallback((token, user) => {
    setToken(token);
    setUser(user);

    localStorage.setItem(JWT_TOKEN_KEY, token);
    localStorage.setItem(USER_ID_KEY, JSON.stringify(user));
  }, []);

  const login = useCallback(
    async (USERNAME, PASSWORD) => {
      try {
        const { token, user } = await doLogin({
          USERNAME,
          PASSWORD,
        });

        setSession(token, user);

        clearCache();

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doLogin, setSession]
  );

  const logout = useCallback(async () => {
    await doLogout();
    setToken(null);
    setUser(null);
    setIsAuthed(false);
    clearCache();
    console.log("we are out of here");
    localStorage.removeItem(JWT_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
  }, []);

  const checkTokenExpiration = () => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      return Number(decodedToken.exp) > Number(currentTime);
    }

    return false;
  };

  const value = useMemo(
    () => ({
      token,
      user,
      error: loginError,
      ready,
      loading: loginLoading,
      isAuthed,
      login,
      logout,
      checkTokenExpiration,
    }),
    [
      token,
      user,
      loginError,
      ready,
      loginLoading,
      isAuthed,
      login,
      logout,
      checkTokenExpiration,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
