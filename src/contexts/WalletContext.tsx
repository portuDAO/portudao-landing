/* eslint-disable no-case-declarations */
import { createContext, useEffect, useMemo, useReducer } from 'react';

const initialWalletState = {
  connected: false,
  publicAddress: '',
};

// @ts-ignore
const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE': {
      const { publicAddress } = action.payload;
      return {
        ...state,
        connected: true,
        publicAddress,
      };
    }
    case 'CONNECT': {
      const { publicAddress } = action.payload;
      return {
        ...state,
        connected: true,
        publicAddress,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        connected: false,
        publicAddress: '',
      };
    }
    default: {
      return { ...state };
    }
  }
};

const WalletContext = createContext({
  ...initialWalletState,
  setWallet: (publicAddress: string) => Promise.resolve(),
  logout: () => Promise.resolve(),
});

// @ts-ignore
// eslint-disable-next-line react/prop-types
export const WalletProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialWalletState);

  useEffect(() => {
    const initialize = () => {
      const publicAddress = global.window.localStorage.getItem('portudao-address');
      console.log('publicAddress context', publicAddress);

      if (publicAddress) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            publicAddress,
          },
        });
      }
    };
    initialize();
  }, []);

  const setWallet = (address: string) => {
    global.localStorage.setItem('portudao-address', address);
    dispatch({
      type: 'CONNECT',
      payload: {
        connected: true,
        publicAddress: address,
      },
    });
  };

  const logout = () => {
    global.localStorage.removeItem('portudao-address');
    dispatch({
      type: 'LOGOUT',
    });
  };

  const value = useMemo(
    () => ({
      ...state,
      setWallet,
      logout,
    }),
    [state, setWallet, logout]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export default WalletContext;
