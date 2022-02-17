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

export default connect;
