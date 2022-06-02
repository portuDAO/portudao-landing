/* eslint-disable no-case-declarations */
import { createContext, useEffect, useMemo, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import axiosInstance from 'axios';
import getProvider from 'wallets/utils';

const initialAuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
  publicAddress: '',
  axios: axiosInstance,
  provider: null,
};

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);
  // @ts-ignore
  if (decoded && !decoded.exp) return true;
  const currentTime = Date.now() / 1000;
  // @ts-ignore
  return decoded.exp > currentTime;
};

// @ts-ignore
const setSession = (accessToken) => {
  if (accessToken) {
    global.localStorage.setItem('accessToken', accessToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    global.localStorage.removeItem('accessToken');
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

// @ts-ignore
const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE': {
      const { isAuthenticated, user, publicAddress, axios } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
        publicAddress,
        axios,
      };
    }
    case 'LOGIN': {
      const { user, publicAddress, axios } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
        publicAddress,
        axios,
      };
    }

    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case 'PROVIDER': {
      const { provider } = action.payload;
      return {
        ...state,
        provider,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialAuthState,
  // @ts-ignore
  login: (params) => Promise.resolve(),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
  setProvider: (provider: string) => Promise.resolve(),
});

// @ts-ignore
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const apiPath = process.env.REACT_APP_API_HOSTNAME;

  // @ts-ignore
  const login = async (params) => {
    console.log('Params', params);
    const response = await axiosInstance.post(`${apiPath}/api/user/auth`, { params });

    if (response && response.data) {
      const { token, user, publicAddress } = response.data;

      setSession(token);

      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          publicAddress,
          axios: axiosInstance,
        },
      });
    }
  };

  const logout = () => {
    // @ts-ignore
    setSession('');
    dispatch({ type: 'LOGOUT' });
  };

  const setProvider = (provider: string) => {
    console.log('setProvider', provider);
    const providerInstance = getProvider(provider);
    console.log('providerInstance', providerInstance);
    dispatch({
      type: 'PROVIDER',
      payload: {
        provider: providerInstance,
      },
    });
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const globalProvider = global.window.localStorage.getItem('walletProvider');
        console.log('globalProvider', globalProvider);
        if (globalProvider) {
          setProvider(globalProvider);
        }

        const accessToken = global.window.localStorage.getItem('accessToken');
        console.log('Access Token', accessToken);
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          console.log('api cal');
          const response = await axiosInstance.get(`${apiPath}/api/user/me`);
          const { user, publicAddress } = response.data;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
              publicAddress,
              axios: axiosInstance,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
              publicAddress: '',
              axios: axiosInstance,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
            axios: axiosInstance,
          },
        });
      }
    };

    initialize();
  }, []);

  const value = useMemo(() => {
    // @ts-ignore
    return { ...state, login, logout, setProvider };
  }, [state, login, logout, setProvider]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
