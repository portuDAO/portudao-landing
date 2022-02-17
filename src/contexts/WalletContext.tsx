/* eslint-disable no-case-declarations */
import { createContext, useMemo, useReducer } from 'react';

const initialWalletState = {
  connected: false,
  publicAddress: '',
};

// @ts-ignore
const reducer = (state, action) => {
  switch (action.type) {
    case 'CONNECT': {
      const { publicAddress } = action.payload;
      return {
        ...state,
        connected: true,
        publicAddress,
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
});

// @ts-ignore
// eslint-disable-next-line react/prop-types
export const WalletProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialWalletState);

  const setWallet = (address: string) => {
    dispatch({
      type: 'CONNECT',
      payload: {
        connected: true,
        publicAddress: address,
      },
    });
  };

  const value = useMemo(
    () => ({
      ...state,
      setWallet,
    }),
    [state, setWallet]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export default WalletContext;
