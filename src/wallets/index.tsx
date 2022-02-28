import { ethers } from 'ethers';
import getProvider from './utils';

// eslint-disable-next-line consistent-return
const connect = async (providerName: string) => {
  try {
    const provider = getProvider(providerName);
    // @ts-ignore
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    console.log('accounts', accounts);

    return { accounts };
  } catch (error) {
    console.log('error adding  user address', error);
    return { error };
  }
};

// eslint-disable-next-line consistent-return
const signMessage = async (nonce: string, providerName: string) => {
  try {
    const chosenProvider = getProvider(providerName);
    console.log('chosenProvider', chosenProvider);

    const provider =
      providerName === 'metamask'
        ? new ethers.providers.Web3Provider(chosenProvider)
        : new ethers.providers.Web3Provider(chosenProvider);

    const signer = provider.getSigner();
    const message = await signer.signMessage(`I am signing my one-time nonce: ${nonce}`);
    console.log('message', message);

    return message;
  } catch (error) {
    console.log('Error signing message', error);
  }
};

export { connect, signMessage };
